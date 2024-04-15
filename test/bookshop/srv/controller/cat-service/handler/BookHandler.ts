import {
  AfterCreate,
  AfterDelete,
  AfterRead,
  AfterUpdate,
  BeforeRead,
  EntityHandler,
  GetQuery,
  GetQueryType,
  GetRequest,
  Inject,
  IsColumnSupplied,
  IsPresent,
  IsRole,
  Jwt,
  Req,
  Request,
  Result,
  Results,
  Service,
  SingleInstanceSwitch,
  SRV,
  TypedRequest,
  Use,
} from '../../../../../../lib';
import { Book } from '../../../../@cds-models/CatalogService';
import { MiddlewareMethodAfterRead1 } from '../../../middleware/MiddlewareAfterRead1';
import { MiddlewareMethodAfterRead2 } from '../../../middleware/MiddlewareAfterRead2';
import { MiddlewareMethodBeforeRead } from '../../../middleware/MiddlewareBeforeRead';
import { MiddlewareEntity1 } from '../../../middleware/MiddlewareEntity1';
import { MiddlewareEntity2 } from '../../../middleware/MiddlewareEntity2';
import BookService from '../../../service/BookService';

@EntityHandler(Book)
@Use(MiddlewareEntity1, MiddlewareEntity2)
class BookHandler {
  @Inject(SRV) private readonly srv: Service;
  @Inject(BookService) private readonly bookService: BookService;

  @AfterCreate()
  private async afterCreate(@Result() result: Book, @Req() req: Request) {
    this.bookService.validateData(result, req);
  }

  @BeforeRead()
  @Use(MiddlewareMethodBeforeRead)
  private async beforeRead(@Req() req: TypedRequest<Book>) {
    console.log('****************** Before read event');
  }

  // *******************************************************

  // @ScopedUserLogic('role', handleClass)

  // *******************************************************

  @AfterRead()
  @Use(MiddlewareMethodAfterRead1, MiddlewareMethodAfterRead2)
  private async afterRead(
    @Req() req: Request,
    @Results() results: Book[],
    @SingleInstanceSwitch() singleInstance: boolean,
    @IsColumnSupplied<Book>('price') hasPrice: boolean,
    @IsPresent('SELECT', 'columns') hasColumns: boolean,
    @IsRole('role', 'anotherRole') role: boolean,
    @GetRequest('locale') locale: Request['locale'],
    @Jwt() token: string | undefined,
  ) {
    await this.srv.emit('OrderedBook', { book: 'dada', quantity: 3, buyer: req.user.id });

    if (singleInstance) {
      req.notify('Single instance');
      return;
    } else {
      req.notify('Entity set');
    }

    this.bookService.enrichTitle(results);
  }

  @AfterUpdate()
  private async afterUpdate(@Result() result: Book, @Req() req: TypedRequest<Book>) {
    void this.bookService.addDefaultTitleText(result, req);
  }

  @AfterDelete()
  private async afterDelete(@Result() deleted: boolean, @Req() req: Request) {
    req.notify(`Item deleted : ${deleted}`);
  }
}

export default BookHandler;
