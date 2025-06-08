import { inject, injectable } from "tsyringe";
import TransferDatasource from "../datasource/transfer.datasource";
import Transactions from "../../../../database/entities/transactions.entities";
import { ForbidenError } from "../../../../shared/middleware/error-handler.middleware";
import getPaystackBalance from "../../../../shared/paystack/balance.paystack";
import axios from "axios";
import appConfig from "../../../../config/app.config";
import Transfers from "../../../../database/entities/transfers.entities";
import VendorDecisionDatasource from "../datasource/vendor-decision.datasource";

@injectable()
class TransferService {
    constructor(
        @inject(TransferDatasource) private transferDatasource:TransferDatasource,
        @inject(VendorDecisionDatasource) private vendorDecisionDatasource: VendorDecisionDatasource
    ){}
    // async transferToVendor(transaction: Transactions, recipientCode: string, percentage: number){
    //     try {
    //         if(!transaction) return
    //         const {amount, deliveryFee, serviceFee, reference, vendorId} = transaction
    //         const checkTransfer = await this.transferDatasource.findTransferByReferenceAndVendorId(reference, vendorId)
    //         if(checkTransfer) throw new ForbidenError('Initial transfer has already been made')
    //         const amountToTransfer  = (amount - ( serviceFee + deliveryFee ))
    //         const balance = await getPaystackBalance()
    //         if(balance<amount){ 
    //             console.log('Insufficient Balance to make transfers')
    //         }
    //         const amountLeft = amountToTransfer - (amountToTransfer*(percentage/100))
    //         const response = await axios.post(`${appConfig.paystack.base_url}/transfer`, 
    //             {
    //                 "source": "balance",
    //                 "amount": amountToTransfer*percentage,
    //                 "reference": reference,
    //                 "recipient": recipientCode,
    //                 "reason": "My thrift Vendor Payment",
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${appConfig.paystack.api_key}`
    //                 }
    //             }
    //         )
    //         const newTransfer = new Transfers()
    //         newTransfer.orderReference = reference
    //         newTransfer.percentagePaid = `${percentage.toString()}`
    //         newTransfer.recipientCode = recipientCode
    //         newTransfer.transactionCompleted = percentage === 100 
    //         newTransfer.vendorId = vendorId
    //         newTransfer.amountLeft = amountLeft
    //         newTransfer.additionalInfo = response.data
    //         await this.transferDatasource.saveTransferDetails(newTransfer)
    //         await this.vendorDecisionDatasource.updatePaymentStatusInPends(reference, percentage.toString(), percentage===100)
    //     } catch (error) {
    //         throw error
    //     }
    // }
    // async transferFortyPercent(transaction: Transactions, recipientCode: string){
    //         if(!transaction) return
    //         const {reference, vendorId, amount} = transaction
    //         const findInitialTransfer = await this.transferDatasource.checkInitialTransfer(reference, vendorId)
    //         if(!findInitialTransfer) throw new ForbidenError('Initial transfer has not been made')

    //         const {amountLeft} = findInitialTransfer
    //         const response = await axios.post(`${appConfig.paystack.base_url}/transfer`, 
    //             {
    //                 "source": "balance",
    //                 "amount": amountLeft*100,
    //                 "reference": reference,
    //                 "recipient": recipientCode,
    //                 "reason": "My thrift Vendor Payment",
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${appConfig.paystack.api_key}`
    //                 }
    //             }
    //         )
    //         const newTransfer = new Transfers()
    //         newTransfer.orderReference = reference
    //         newTransfer.recipientCode = recipientCode
    //         newTransfer.vendorId = vendorId
    //         newTransfer.additionalInfo = response.data
    //         await this.transferDatasource.saveTransferDetails(newTransfer)
    //         await this.vendorDecisionDatasource.updatePaymentStatusInPends(reference, '40', true)
    // }
    async updateTransferStatus(data: any){
        try {
            await this.transferDatasource.updateTransferStatus(data, data.reference)
        } catch (error) {
            throw error
        }
    }

}

export default TransferService