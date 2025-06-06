import { inject } from "tsyringe";
import { DeliveryStatusDto } from "../dto/delivery-status.dto";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { NotFoundError } from "../../../../shared/middleware/error-handler.middleware";



class DeliveryStatusService {
    constructor(@inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource){}
    async deliveryStatus(data: DeliveryStatusDto){
        try {
            const reference = data.orderId
            const status = data.delivered

            const transaction = await this.transactionsDatasource.findPaymentByReference(reference)
            if(!transaction) throw new NotFoundError('Transaction not found')
            
        } catch (error) {
            throw error
        }
    }
}

export default DeliveryStatusService