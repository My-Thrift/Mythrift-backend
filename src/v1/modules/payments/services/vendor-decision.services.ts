import { inject, injectable } from "tsyringe";
import { VendorDecisionDto } from "../dto/vendor-decision.dto";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { ForbidenError, NotFoundError } from "../../../../shared/middleware/error-handler.middleware";
import refundTransaction from "../../../../shared/paystack/refunds.paystack";
import Refunds from "../../../../database/entities/refunds.entities";


@injectable()
class VendorDecisionService {
    constructor(@inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource){}
    async vendorDecision(data: VendorDecisionDto){
        try {
            const {orderReference, vendorStatus, vendorId, recipientCode } = data
            const findTransaction = await this.transactionsDatasource.findPaymentByRefrenceAndVendorId(orderReference, vendorId)
            if(!findTransaction) throw new NotFoundError('Transaction does not exist or action has already been taken')

            if(findTransaction.vendorStatus !== 'pending' || findTransaction.paymentStatus !=='success') throw new ForbidenError('You cannot take this action')
            if(vendorStatus === 'declined') {
                const refund = await refundTransaction(orderReference, findTransaction.amount)

                const newRefund = new Refunds()
                newRefund.orderReference = orderReference
                newRefund.amountRefunded = findTransaction.amount
                newRefund.additionalInfo = refund
                return await this.transactionsDatasource.saveRefundDetails(newRefund)
            }
            
        } catch (error) {
            throw error
        }
    }
}


export default VendorDecisionService