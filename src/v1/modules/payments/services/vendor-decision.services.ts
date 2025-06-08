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
import { TransactionStatus, VendorDecision } from "../../../../database/enums/enums.database";
import WalletDatasource from "../datasource/wallet.datasource";
import { payoutDays } from "../../../../config/days.config";
import WalletTransaction from "../../../../database/entities/wallet-transactions.entities";

@injectable()
class VendorDecisionService {
    constructor(
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource,
        @inject(VendorPayDateHelper) private vendorPayDateHelper:VendorPayDateHelper,
        @inject(WalletDatasource) private walletDatasource: WalletDatasource
    ){}
    async vendorDecision(data: VendorDecisionDto){
        try {
            const today = moment().toDate()
            const {orderReference, vendorStatus, vendorId, recipientCode } = data
            const findTransaction = await this.transactionsDatasource.findPendingPaymentByRefrenceAndVendorId(orderReference, vendorId)
            if(!findTransaction) throw new NotFoundError('Transaction does not exist or action has already been taken')

            const findVendorWallet = await this.walletDatasource.findWalletByVendorId(vendorId)
            if(!findVendorWallet) throw new ForbidenError('Please create a wallet to start accepting orders')

            if(findTransaction.vendorStatus !== 'pending' || findTransaction.paymentStatus !=='success') throw new ForbidenError('You cannot take this action')
            if(vendorStatus === 'declined') {
                const refund = await refundTransaction(orderReference, findTransaction.amount)
                const newRefund = new Refunds()
                newRefund.orderReference = orderReference
                newRefund.amountRefunded = findTransaction.amount
                newRefund.additionalInfo = refund

                await this.vendorDecisionDatasource.updateVendorStatus(orderReference, VendorDecision.declined)
                return await this.transactionsDatasource.saveRefundDetails(newRefund)
            }
            const vendorPayDate = await this.vendorPayDateHelper.calculateVendorPayDate(today) as Date

            const { amount, serviceFee, deliveryFee, isStockpile, reference} = findTransaction

            const pay = amount - (serviceFee + deliveryFee)
            const multiplier = isStockpile ? 1 : 0.6
            
            const field = payoutDays.includes(today.getDay()) ? 'pendingBalance' : 'balance'
            findVendorWallet[field] += (pay*multiplier)

            const newPendingPay = new PendingPayments()
            newPendingPay.isStockpile = findTransaction.isStockpile
            newPendingPay.orderDelivered = false
            newPendingPay.paymentCompleted = false
            newPendingPay.percentagePaid = '0'
            newPendingPay.vendorAccepted = today
            newPendingPay.vendorPayDate = vendorPayDate
            newPendingPay.orderReference = orderReference
            newPendingPay.vendorId = vendorId

            const newWalletTransaction = new WalletTransaction()
            newWalletTransaction.amount = pay*multiplier
            newWalletTransaction.amountSlug = `+${pay*multiplier}`
            newWalletTransaction.reason = `New order on your My Thrift store`
            newWalletTransaction.status = TransactionStatus.success
            newWalletTransaction.transactionReference = reference
            newWalletTransaction.wallet = findVendorWallet

            await this.walletDatasource.saveWallet(findVendorWallet)
            await this.vendorDecisionDatasource.updateVendorStatus(orderReference, VendorDecision.accepted)
            await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
            return await this.vendorDecisionDatasource.newPendingPay(newPendingPay)
        } catch (error) {
            throw error
        }
    }
}


export default VendorDecisionService