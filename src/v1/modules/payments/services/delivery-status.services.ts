import { inject, injectable } from "tsyringe";
import { DeliveryStatusDto } from "../dto/delivery-status.dto";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { ForbidenError, NotFoundError } from "../../../../shared/middleware/error-handler.middleware";
import VendorDecisionDatasource from "../datasource/vendor-decision.datasource";


@injectable()
class DeliveryStatusService {
    constructor(
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource,
    ){}
    async deliveryStatus(data: DeliveryStatusDto){
        try {
            const reference = data.orderReference
            const status = data.status
            const vendorId = data.vendorId

            const transaction = await this.transactionsDatasource.findPaymentByRefrenceAndVendor(reference, vendorId)
            if(!transaction) throw new NotFoundError('Transaction not found')
            
            if(transaction.orderDelivered) throw new ForbidenError('This action has already been taking')
            await this.vendorDecisionDatasource.updateDeliveryStatus(reference, status)
            return await this.transactionsDatasource.updateDeliveryStatus(reference, status)
        } catch (error) {
            throw error
        }
    }
}

export default DeliveryStatusService