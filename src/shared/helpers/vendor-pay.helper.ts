import { inject, injectable } from "tsyringe";
import VendorDecisionDatasource from "../../v1/modules/payments/datasource/vendor-decision.datasource";
import TransactionsDatasource from "../../v1/modules/payments/datasource/transactions.datasource";
import TransferRecipientController from "../../v1/modules/payments/controllers/transfer-recipients.controllers";
import TransferRecipientDatasource from "../../v1/modules/payments/datasource/transfer-recipients.datasource";
import TransferService from "../../v1/modules/payments/services/transfer.services";
import { NotFoundError } from "../middleware/error-handler.middleware";

@injectable()
class VendorPay {
    constructor(
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource,
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(TransferRecipientDatasource) private transferRecipientDatasource: TransferRecipientDatasource,
        @inject(TransferService) private transferService: TransferService
    ){}
    async payVendor(){
        try {
            const getAllPendingPayments = await this.vendorDecisionDatasource.getPendingPays()
            console.log(getAllPendingPayments)
            for(let i = 0; i<getAllPendingPayments.length; i++){
                const pendingData = getAllPendingPayments[i]
                //console.log(pendingData)
                const reference = pendingData.orderReference
                const vendorId = pendingData.vendorId
                const transaction = await this.transactionsDatasource.findPaymentByRefrenceAndVendor(reference, vendorId)
                if(!transaction){
                    continue }
                const getVendorTransferRecipient = await this.transferRecipientDatasource.findRecipientByVendorId(vendorId)
                if(!getVendorTransferRecipient){
                    continue }
                console.log(transaction)
                console.log(getVendorTransferRecipient)
                if(!pendingData.orderDelivered && pendingData.percentagePaid === '0' && !pendingData.isStockpile){
                    console.log('i ran 60')
                    await this.transferService.transferToVendor(transaction, getVendorTransferRecipient.recipientCode, 60)
                }
                else if(pendingData.orderDelivered && pendingData.percentagePaid === '60'){
                    console.log('i ran 40')
                    await this.transferService.transferFortyPercent(transaction, getVendorTransferRecipient.recipientCode)
                }
                else if(pendingData.isStockpile || (pendingData.orderDelivered && pendingData.percentagePaid === '0')){
                    console.log('i ran 100')
                    await this.transferService.transferToVendor(transaction, getVendorTransferRecipient.recipientCode, 100)
                }
            }
        } catch (error) {
            //console.log(error)
            throw error
        }
    }
    async getPayPercentages(vendorId: string, reference: string){
        try {
            const transaction = await this.transactionsDatasource.findPaymentByRefrenceAndVendor(reference, vendorId)
            if(!transaction) throw new NotFoundError('Transactions does not exist')
            const { amount }= transaction
            const sixtyPercent = amount*0.6
            const fortyPercent = amount - sixtyPercent
            return {"sixty-percent": sixtyPercent, "forty-percent": fortyPercent}
        } catch (error) {
            throw error
        }
    }
    async getTransactionHistory(vendorId: string, startDate: Date, endDate: Date){
        try {
            let paymentData = []
            const payments =  await this.transactionsDatasource.getTransactionHistory(vendorId, startDate, endDate)
            for(let i = 0; i<payments.length; i++){
                const data = {
                    amount: payments[i].additionalInfo.amount,
                    reference: payments[i].additionalInfo.reference,
                    transferredAt: payments[i].additionalInfo.transferred_at
                }
                paymentData.push(data)
            }
            return paymentData
        } catch (error) {
            throw error
        }
    }
}

export default VendorPay

