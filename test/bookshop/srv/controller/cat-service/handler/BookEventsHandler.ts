import {
  AfterRead,
  AfterReadDraft,
  EntityHandler,
  Inject,
  OnCancelDraft,
  OnEditDraft,
  OnNewDraft,
  OnSaveDraft,
  SRV,
  SingleInstanceCapable,
} from '../../../../../../lib';
import { Request, Service } from '@sap/cds';
import { BookEvent } from '../../../util/types/entities/CatalogService';

@EntityHandler(BookEvent)
class BookEventsHandler {
  @Inject(SRV) private readonly srv: Service;

  @OnNewDraft()
  public async onNewDraftMethod(req: Request, next: Function) {
    req.notify('On new draft');
    return next();
  }

  @OnCancelDraft()
  public async onCancelDraftMethod(req: Request, next: Function) {
    req.notify('On cancel draft');
    return next();
  }

  @OnEditDraft()
  public async onEditDraftMethod(req: Request, next: Function) {
    req.notify('On edit draft');
    return next();
  }

  @OnSaveDraft()
  public async onSaveDraftMethod(req: Request, next: Function) {
    req.notify('On save draft');
    return next();
  }

  @AfterRead()
  @AfterReadDraft()
  @SingleInstanceCapable()
  public async afterReadDraftMethod(results: BookEvent[], req: Request, isSingleInstance: boolean) {
    // handle single instance
    if (results.length === 0) {
      return;
    }

    if (isSingleInstance) {
      req.notify('Single instance');
    }

    // handle entity set
  }
}

export default BookEventsHandler;
