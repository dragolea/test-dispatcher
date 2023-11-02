import {
  AfterCreate,
  AfterDelete,
  AfterRead,
  AfterUpdate,
  EntityHandler,
  Inject,
  SRV,
  SingleInstanceCapable,
  type TypedRequest,
} from '../../../../../../lib';
import BookService from '../../../service/BookService';
import { Request, Service } from '@sap/cds';
import { Book } from '../../../util/types/entities/CatalogService';

@EntityHandler(Book)
class BookHandler {
  @Inject(SRV) private readonly srv: Service;
  @Inject(BookService) private bookService: BookService;

  @AfterCreate()
  private async validateCurrencyCodes(result: Book, req: Request) {
    this.bookService.validateData(result, req);
  }

  @AfterRead()
  @SingleInstanceCapable()
  private async addDiscount(results: Book[], req: Request, isSingleInstance: boolean) {
    if (isSingleInstance) {
      req.notify('Single instance');
    } else {
      req.notify('Entity set');
    }

    this.bookService.enrichTitle(results);
  }

  @AfterUpdate()
  private async addDefaultDescription(result: Book, req: TypedRequest<Book>) {
    this.bookService.addDefaultTitleText(result, req);
  }

  @AfterDelete()
  private async deleteItem(deleted: boolean, req: Request) {
    req.notify(`Item deleted : ${deleted}`);
  }
}

export default BookHandler;
