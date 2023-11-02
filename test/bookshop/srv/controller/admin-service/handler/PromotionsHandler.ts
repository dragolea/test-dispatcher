import {
  AfterDeleteDraft,
  AfterEditDraft,
  AfterNewDraft,
  AfterSaveDraft,
  EntityHandler,
  Inject,
  SRV,
  type TypedRequest,
} from '../../../../../../lib';
import { Service } from '@sap/cds';
import { Promotion } from '../../../util/types/entities/AdminService';

@EntityHandler(Promotion)
class PromotionHandler {
  @Inject(SRV) private readonly srv: Service;

  @AfterNewDraft()
  public async afterNewDraftCreated(results: Promotion, req: TypedRequest<Promotion>) {
    req.notify(201, 'After new draft executed');
  }

  @AfterSaveDraft()
  public async afterSaveDraft(results: Promotion, req: TypedRequest<Promotion>) {
    req.notify(201, 'After save draft executed');
  }

  @AfterEditDraft()
  public async afterEditDraft(results: Promotion, req: TypedRequest<Promotion>) {
    req.notify(201, 'After edit draft executed');
  }

  @AfterDeleteDraft()
  public async afterDeleteDraft(deleted: boolean, req: TypedRequest<Promotion>) {
    debugger;
  }
}

export default PromotionHandler;
