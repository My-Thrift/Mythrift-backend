import { inject, injectable } from "tsyringe";
import { TransactionsDto } from "../dto/transactions.dto";
import uuidGenerator from "../../../../shared/utils/uuid.utils";
import axios from 'axios'
import appConfig from "../../../../config/app.config";
import { DependencyError, ForbidenError } from "../../../../shared/middleware/error-handler.middleware";
import TransactionsDatasource from "../datasource/transactions.datasource";
import { generateSignature } from "../../../../shared/cloud/signature.cloud";
import WalletDatasource from "../datasource/wallet.datasource";
import WalletTransaction from "../../../../database/entities/wallet-transactions.entities";
import { TransactionStatus } from "../../../../database/enums/enums.database";
import initializeTransaction from "../../../../shared/paystack/transaction.paystack";
import Wallet from "../../../../database/entities/wallet.entities";
import Transactions from "../../../../database/entities/transactions.entities";

@injectable()
class TransactionsService {
    constructor(
        @inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource,
        @inject(WalletDatasource) private walletDatasource: WalletDatasource
    ){}
    async initPayment(data: TransactionsDto):Promise<Transactions | any> {
        try {
            const { amount, email, firstName, lastName, walletId, userId} = data
            const reference = uuidGenerator()
            const reqBody = { amount: amount*100 , email, firstName, lastName, reference}

            if(walletId){ 
                const findWallet: Wallet | null = await this.walletDatasource.findWalletByWalletId(walletId)
                if(!findWallet) throw new ForbidenError('You cannot use this payment option')
             
                if(findWallet.balance < amount) throw new ForbidenError('Insufficient Wallet Balance')
                findWallet.balance -= amount

                const newWalletTransaction = new WalletTransaction()
                newWalletTransaction.amount = amount
                newWalletTransaction.amountSlug = `-${amount}`
                newWalletTransaction.myThriftId = userId
                newWalletTransaction.reason = 'Purchase on My Thrift'
                newWalletTransaction.status = TransactionStatus.success
                newWalletTransaction.transactionReference = reference
                newWalletTransaction.wallet = findWallet

                await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
                await this.walletDatasource.saveWallet(findWallet)
                return await this.transactionsDatasource.initPayment({...data, reference: reference, paymentStatus: TransactionStatus.success, vendorStatus: 'pending', orderDelivered: false})
            }

            const response = await initializeTransaction(reqBody)
            if(!response) throw new DependencyError('Paystack Error: Error initializing payment')

            await this.transactionsDatasource.initPayment({...data, reference: reference, paymentStatus: TransactionStatus.pending, vendorStatus: 'pending', orderDelivered: false})
            return response.data
        } catch (error) {
            throw error
        }
    }
    async updateSuccessfulPaymentStatus(data: any){
        try {
            console.log(data)
            if(data.metadata.receiver_account_number){
                const amount = data.amount/100
                const accountNumber = data.metadata.receiver_account_number
                const reference = data.reference
                const findTransaction = await this.walletDatasource.findWalletTransactionByReference(reference)
                if(findTransaction) return

                const findWallet =  await this.walletDatasource.findWalletByAccountNumber(accountNumber)
                if(!findWallet) return
                findWallet.balance += amount
                const newWalletTransaction = new WalletTransaction()
                newWalletTransaction.amount = amount
                newWalletTransaction.status = TransactionStatus.success
                newWalletTransaction.transactionReference = reference
                newWalletTransaction.wallet = findWallet
                newWalletTransaction.amountSlug = `+${amount}`
                newWalletTransaction.reason = `Wallet Topup`
                newWalletTransaction.myThriftId = findWallet.myThriftId

               await this.walletDatasource.saveWallet(findWallet)
               return await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
            }

            const findTransaction = await this.transactionsDatasource.findPaymentByReference(data.reference)
            if(!findTransaction || findTransaction.paymentStatus === 'success') return
            
            const update: Transactions | null = await this.transactionsDatasource.updateSuccessfulPaymentStatus(data.reference)
            const payload = {
                event: 'charge.success',
                data: update
            }
            const signature = generateSignature(JSON.stringify(payload))
            await axios.post(appConfig.cloud.cloud_url, 
                payload,
                {
                    headers:{
                        "x-mythrift": signature,
                        'Content-Type': 'application/json',
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updateRefundStatus(data: any){
        try {
            await this.transactionsDatasource.updateRefundStatus(data, data.transaction_reference)
        } catch (error) {
            
        }
    }
}

export default TransactionsService