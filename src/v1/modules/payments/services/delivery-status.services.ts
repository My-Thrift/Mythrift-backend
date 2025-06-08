import { inject, injectable } from "tsyringe";
import { DeliveryStatusDto } from "../dto/delivery-status.dto";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { ForbidenError, NotFoundError } from "../../../../shared/middleware/error-handler.middleware";
import VendorDecisionDatasource from "../datasource/vendor-decision.datasource";
import WalletDatasource from "../datasource/wallet.datasource";
import { payoutDays } from "../../../../config/days.config";
import moment from "moment-timezone";


@injectable()
class DeliveryStatusService {
    constructor(
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource,
        @inject(WalletDatasource) private walletDatasource: WalletDatasource
    ){}
    async deliveryStatus(data: DeliveryStatusDto){
        try {
            const reference = data.orderReference
            const status = data.status
            const vendorId = data.vendorId
            const today = moment().format('YY:MM:DD')
            const getDay = moment().toDate().getDay()
            const transaction = await this.transactionsDatasource.findPaymentByRefrenceAndVendor(reference, vendorId)
            if(!transaction) throw new NotFoundError('Transaction not found')
            
            const { createdAt, amount, deliveryFee, serviceFee }  = transaction
            const transactionDate = moment(createdAt).format('YY:MM:DD')
            
            const findWallet = await this.walletDatasource.findWalletByVendorId(vendorId)
            if(!findWallet) throw new ForbidenError('You need to create a wallet first')
       
            if(transaction.vendorStatus !== 'accepted') throw new ForbidenError('You cannot perform this action')
            if(transaction.orderDelivered) throw new ForbidenError('This action has already been taking')
            console.log(today)
            console.log(transactionDate)
            if(!transaction.isStockpile){
                const fortyPercentPay = (amount - (serviceFee + deliveryFee))*0.4
                let field: 'balance' | 'pendingBalance';
                if(today === transactionDate && payoutDays.includes(getDay)){ // vendor marking delivered on a payout day the same day he got the order
                    field = 'pendingBalance';
                } else {
                    field = 'balance';
                }
                findWallet[field] += fortyPercentPay;
            }
            await this.walletDatasource.saveWallet(findWallet)
            await this.vendorDecisionDatasource.updateDeliveryStatus(reference, status)
            return await this.transactionsDatasource.updateDeliveryStatus(reference, status)
        } catch (error) {
            throw error
        }
    }
}

export default DeliveryStatusService