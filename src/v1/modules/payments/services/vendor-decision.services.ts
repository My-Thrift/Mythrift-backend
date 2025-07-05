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
import Wallet from "../../../../database/entities/wallet.entities";
import emitWalletUpdate from "../../../../shared/socket/emit.socket";
import { cloudWebhook } from "../../../../shared/cloud/webhook.cloud";
import appConfig from "../../../../config/app.config";

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

            const findUserWallet = await this.walletDatasource.findWalletByVendorId(findTransaction.userId) as Wallet
           // if(!findUserWallet) throw new NotFoundError('User does not have an active wallet')

            if(findTransaction.vendorStatus !== 'pending' || findTransaction.paymentStatus !=='success') throw new ForbidenError('You cannot take this action')
            if(vendorStatus === 'declined') {
                const amount = findTransaction.amount //- (findTransaction.serviceFee + findTransaction.deliveryFee)
               // const refund = await refundTransaction(orderReference, findTransaction.amount)
                const newRefund = new Refunds()
                newRefund.orderReference = orderReference
                newRefund.amountRefunded = amount
                newRefund.additionalInfo = findTransaction
                await this.vendorDecisionDatasource.updateVendorStatus(orderReference, VendorDecision.declined)

                findUserWallet.balance += amount

                const newWalletTransaction = new WalletTransaction()
                newWalletTransaction.amount = amount
                newWalletTransaction.amountSlug = `+${amount}`
                newWalletTransaction.myThriftId = findTransaction.userId
                newWalletTransaction.reason = 'Order declined'
                newWalletTransaction.status = TransactionStatus.success
                newWalletTransaction.transactionReference = findTransaction.reference
                newWalletTransaction.wallet = findUserWallet

                const saveWallet = await this.walletDatasource.saveWallet(findUserWallet)
                const {myThriftId, balance, pendingBalance}= saveWallet
                cloudWebhook(appConfig.cloud.wallet_cloud_url, {myThriftId, balance, pendingBalance})
                await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
                return await this.transactionsDatasource.saveRefundDetails(newRefund)
            }

            // accepted logic
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
            newWalletTransaction.myThriftId = vendorId

            const saveWallet = await this.walletDatasource.saveWallet(findVendorWallet)
            const {myThriftId, pendingBalance, balance} = saveWallet
            await this.vendorDecisionDatasource.updateVendorStatus(orderReference, VendorDecision.accepted)
            await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
            cloudWebhook(appConfig.cloud.wallet_cloud_url, {myThriftId, balance, pendingBalance})
            return await this.vendorDecisionDatasource.newPendingPay(newPendingPay)
        } catch (error) {
            throw error
        }
    }
}


export default VendorDecisionService