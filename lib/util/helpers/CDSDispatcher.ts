import { Container } from 'inversify';
import { MetadataDispatcher } from './MetadataDispatcher';
import Util from './Util';

import { type Constructable } from '@sap/cds/apis/internal/inference';
import {
  HandlerType,
  type Handler,
  type ServiceCallback,
  type HandlerBuilder,
  type ReturnRequestAndNext,
  type ReturnResultsAndRequest,
  type ReturnRequest,
} from '../types/types';
import { SRV } from '../constants/Constants';

import cds, { type Request, type Service, type ServiceImpl } from '@sap/cds';

/**
 * Use this class to manage the registration of the event handlers for the entities.
 */

class CDSDispatcher {
  private srv: Service;
  private container: Container;

  /**
   * Creates an instance of CDSDispatcher.
   * @param {Constructable[]} entities - An array of entity classes to manage event handlers for.
   */
  constructor(private readonly entities: Constructable[]) {
    if (Util.isEmptyArray(entities)) {
      throw new Error('The new CDSDispatcher constructor cannot be empty!');
    }

    this.initializeContainer();
  }

  private initializeContainer(): void {
    this.container = new Container({
      skipBaseClassChecks: true,
      autoBindInjectable: true,
    });
  }

  private storeService(srv: Service): void {
    this.srv = srv;
  }

  private async executeBeforeCallback(handlerAndEntity: [Handler, Constructable], req: Request): Promise<unknown> {
    const [handler, entity] = handlerAndEntity;
    const callback = handler.callback as ReturnRequest;
    const isSingleInstance = Util.isRequestSingleInstance(handler, req);

    return await callback.call(entity, req, isSingleInstance);
  }

  private async executeOnCallback(
    handlerAndEntity: [Handler, Constructable],
    req: Request,
    next: Function,
  ): Promise<unknown> {
    const [handler, entity] = handlerAndEntity;
    const callback = handler.callback as ReturnRequestAndNext;
    const isSingleInstance = Util.isRequestSingleInstance(handler, req);

    return await callback.call(entity, req, next, isSingleInstance);
  }

  private async executeAfterCallback(
    handlerAndEntity: [Handler, Constructable],
    req: Request,
    results: unknown | unknown[] | number,
  ): Promise<unknown> {
    const [handler, entity] = handlerAndEntity;
    const callback = handler.callback as ReturnResultsAndRequest;
    const isSingleInstance = Util.isRequestSingleInstance(handler, req);

    if (!Array.isArray(results)) {
      if (Util.isNumber(results)) {
        // private routine for this func
        const _isDeleted = (data: unknown): boolean => data === 1;
        const deleted = _isDeleted(results);

        // DELETE single request
        return await callback.call(entity, deleted, req, isSingleInstance);
      }

      // READ, UPDATE single request
      return await callback.call(entity, results, req, isSingleInstance);
    }

    if (Array.isArray(results)) {
      // READ entity set
      return await callback.call(entity, results, req, isSingleInstance);
    }
  }

  private getActiveEntityOrDraft(handler: Handler, entityInstance: Constructable): Constructable {
    const { isDraft } = handler;
    const entityConstructable = MetadataDispatcher.getEntity(entityInstance);
    const entity = isDraft === true ? entityConstructable.drafts : entityConstructable;
    return entity;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private getHandlerProps(handler: Handler, entityInstance: Constructable) {
    const { event, actionName } = handler;
    const entity = this.getActiveEntityOrDraft(handler, entityInstance);

    return {
      entity,
      event,
      actionName,
    };
  }

  private registerAfterHandler(handlerAndEntity: [Handler, Constructable]): void {
    const { event, entity } = this.getHandlerProps(...handlerAndEntity);

    this.srv.after(event, entity, async (data, req) => {
      return await this.executeAfterCallback(handlerAndEntity, req, data);
    });
  }

  private registerBeforeHandler(handlerAndEntity: [Handler, Constructable]): void {
    const { event, entity } = this.getHandlerProps(...handlerAndEntity);

    this.srv.before(event, entity, async (req) => {
      return await this.executeBeforeCallback(handlerAndEntity, req);
    });
  }

  private registerOnHandler(handlerAndEntity: [Handler, Constructable]): void {
    const { event, actionName, entity } = this.getHandlerProps(...handlerAndEntity);

    // CRUD_EVENTS.[ACTION, FUNC]
    if (event === 'ACTION' || event === 'FUNC') {
      this.srv.on(actionName!, async (req, next) => {
        return await this.executeOnCallback(handlerAndEntity, req, next);
      });

      return;
    }

    // CRUD_EVENTS.[BOUND_ACTION, BOUND_FUNC]
    if (event === 'BOUND_ACTION' || event === 'BOUND_FUNC') {
      this.srv.on(actionName!, entity.name, async (req, next) => {
        return await this.executeOnCallback(handlerAndEntity, req, next);
      });

      return;
    }

    // CRUD_EVENTS.[NEW, CANCEL, CREATE, READ, UPDATE, DELETE, EDIT, SAVE]
    this.srv.on(event, entity, async (req, next) => {
      return await this.executeOnCallback(handlerAndEntity, req, next);
    });
  }

  private registerHandlerBy(handlerAndEntity: [Handler, Constructable]): void {
    const [handler] = handlerAndEntity;

    switch (handler.handlerType) {
      case HandlerType.Before:
        this.registerBeforeHandler(handlerAndEntity);
        break;

      case HandlerType.After:
        this.registerAfterHandler(handlerAndEntity);
        break;

      case HandlerType.On:
        this.registerOnHandler(handlerAndEntity);
        break;

      default:
        throw new Error('No Handler found !');
    }
  }

  private getHandlersBy(entityInstance: Constructable): HandlerBuilder | undefined {
    const handlers = MetadataDispatcher.getMetadataHandlers(entityInstance);

    if (handlers?.length > 0) {
      return {
        buildHandlers: (): void => {
          handlers.forEach((handler) => {
            this.registerHandlerBy([handler, entityInstance]);
          });
        },
      };
    }

    return undefined;
  }

  private readonly registerSrvConstant = (): void => {
    if (!this.container.isBound(SRV)) {
      this.container.bind<Service>(SRV).toConstantValue(this.srv);
    }
  };

  private resolveDependencies(entity: Constructable): Constructable {
    return this.container.resolve<typeof entity>(entity);
  }

  private registerHandlers(): void {
    this.entities.forEach((entity: Constructable) => {
      const createdEntity = this.resolveDependencies(entity);
      const entityHandlers = this.getHandlersBy(createdEntity);
      const handlersFound = entityHandlers != null;

      if (handlersFound) {
        entityHandlers.buildHandlers();
      }
    });
  }

  private buildEntityHandlers(): void {
    this.registerSrvConstant();
    this.registerHandlers();
  }

  private buildServiceImplementation(): ServiceCallback {
    return (srv: Service) => {
      this.storeService(srv);
      this.buildEntityHandlers();
    };
  }

  // PUBLIC ROUTINES
  /**
   * Initialize the entities into the CDSDispatcher to register the handlers.
   */
  public initialize(): ServiceImpl {
    return cds.service.impl(this.buildServiceImplementation());
  }
}

export { CDSDispatcher };
