import {
  EntityHandler,
  Inject,
  OnBoundAction,
  OnBoundFunction,
  OnCreate,
  OnDelete,
  OnRead,
  OnUpdate,
  SRV,
  SingleInstanceCapable,
  type ActionRequest,
  type ActionReturn,
  type TypedRequest,
} from '../../../../../../lib';
import { Request, Service } from '@sap/cds';
import BookStatsService from '../../../service/BookStatsService';
import { BookStat } from '../../../util/types/entities/CatalogService';
import AuthorService from '../../../service/AuthorService';

@EntityHandler(BookStat)
class BookStatsHandler {
  @Inject(SRV) private readonly srv: Service;
  @Inject(BookStatsService) private bookStatsService: BookStatsService;
  @Inject(AuthorService) private authorService: AuthorService;

  @OnCreate()
  public async onCreateMethod(req: TypedRequest<BookStat>, next: Function) {
    req.notify(201, 'On Create executed');
    return next();
  }

  @OnRead()
  @SingleInstanceCapable()
  public async onReadMethod(req: TypedRequest<BookStat>, next: Function, isSingleInstance: boolean) {
    if (isSingleInstance) {
      return await this.bookStatsService.updatedViews(req);
    }

    return next();
  }

  @OnUpdate()
  public async onUpdateMethod(req: TypedRequest<BookStat>, next: Function) {
    req.notify(201, 'On update executed');
    return next();
  }

  @OnDelete()
  public async onDeleteMethod(req: Request, _: Function) {
    req.notify('Item deleted');
  }

  // This action will be triggered on the 'BookStat' entity
  @OnBoundAction(BookStat.actions.GenerateReport)
  public async onBoundActionMethod(
    req: ActionRequest<typeof BookStat.actions.GenerateReport>,
    _: Function,
  ): ActionReturn<typeof BookStat.actions.GenerateReport> {
    return this.bookStatsService.handleReport(req);
  }

  // This function will be triggered on the 'BookStat' entity
  @OnBoundFunction(BookStat.actions.NotifyAuthor)
  public async onBoundFunctionMethod(
    req: ActionRequest<typeof BookStat.actions.NotifyAuthor>,
    _: Function,
  ): ActionReturn<typeof BookStat.actions.NotifyAuthor> {
    return this.authorService.notifyAuthor(req);
  }
}

export default BookStatsHandler;
