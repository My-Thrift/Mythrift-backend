import { container, inject, injectable } from "tsyringe";
import { VendorDecisionDto } from "../dto/vendor-decision.dto";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { ForbidenError, NotFoundError } from "../../../../shared/middleware/error-handler.middleware";
import refundTransaction from "../../../../shared/paystack/refunds.paystack";
import Refunds from "../../../../database/entities/refunds.entities";
import moment from 'moment-timezone'
import PendingPayments from "../../../../database/entities/pending-payments.entities";
import VendorPayDateHelper from "../../../../shared/helpers/vendor-pay-date.helper";
import VendorDecisionDatasource from "../datasource/vendor-decision.datasource";

@injectable()
class VendorDecisionService {
    constructor(
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource,
        @inject(VendorPayDateHelper) private vendorPayDateHelper:VendorPayDateHelper
    ){}
    async vendorDecision(data: VendorDecisionDto){
        try {
            const {orderReference, vendorStatus, vendorId, recipientCode } = data
            const findTransaction = await this.transactionsDatasource.findPendingPaymentByRefrenceAndVendorId(orderReference, vendorId)
            console.log(findTransaction)
            if(!findTransaction) throw new NotFoundError('Transaction does not exist or action has already been taken')

            if(findTransaction.vendorStatus !== 'pending' || findTransaction.paymentStatus !=='success') throw new ForbidenError('You cannot take this action')
            if(vendorStatus === 'declined') {
                const refund = await refundTransaction(orderReference, findTransaction.amount)
                const newRefund = new Refunds()
                newRefund.orderReference = orderReference
                newRefund.amountRefunded = findTransaction.amount
                newRefund.additionalInfo = refund

                await this.vendorDecisionDatasource.updateVendorStatus(orderReference, vendorStatus)
                return await this.transactionsDatasource.saveRefundDetails(newRefund)
            }

            const acceptedDate = moment().toDate()
            const vendorPayDate = await this.vendorPayDateHelper.calculateVendorPayDate(acceptedDate) as Date

            const newPendingPay = new PendingPayments()
            newPendingPay.isStockpile = findTransaction.isStockpile
            newPendingPay.orderDelivered = false
            newPendingPay.paymentCompleted = false
            newPendingPay.percentagePaid = '0'
            newPendingPay.vendorAccepted = acceptedDate
            newPendingPay.vendorPayDate = vendorPayDate
            newPendingPay.orderReference = orderReference
            newPendingPay.vendorId = vendorId

            await this.vendorDecisionDatasource.updateVendorStatus(orderReference, vendorStatus)
            return await this.vendorDecisionDatasource.newPendingPay(newPendingPay)
        } catch (error) {
            throw error
        }
    }
}


export default VendorDecisionService