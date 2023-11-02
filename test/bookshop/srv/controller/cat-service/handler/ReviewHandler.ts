import {
  BeforeCreate,
  BeforeDelete,
  BeforeRead,
  BeforeUpdate,
  EntityHandler,
  Inject,
  SRV,
  SingleInstanceCapable,
  type TypedRequest,
} from '../../../../../../lib';
import { Request, Service } from '@sap/cds';
import { Review } from '../../../util/types/entities/CatalogService';
import ReviewService from '../../../service/ReviewService';

@EntityHandler(Review)
class ReviewHandler {
  @Inject(SRV) private readonly srv: Service;
  @Inject(ReviewService) private reviewService: ReviewService;

  @BeforeCreate()
  private async validateCurrencyCodes(req: TypedRequest<Review>) {
    this.reviewService.validateComment(req);
  }

  @BeforeRead()
  @SingleInstanceCapable()
  private async addDiscount(req: TypedRequest<Review>, isSingleInstance: boolean) {
    req.notify(400, 'Before read executed');
  }

  @BeforeUpdate()
  private async addDefaultDescription(req: TypedRequest<Review>) {
    this.reviewService.validateComment(req);
  }

  @BeforeDelete()
  private async deleteItem(req: Request) {
    req.notify(204, 'Item deleted');
  }
}

export default ReviewHandler;
