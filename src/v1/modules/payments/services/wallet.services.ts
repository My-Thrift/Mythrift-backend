import { inject, injectable } from "tsyringe";
import { CreateWalletDto } from "../dto/wallet.dto";
import createPaystackCustomer from "../../../../shared/paystack/customer.paystack";
import { ConflictError, DependencyError } from "../../../../shared/middleware/error-handler.middleware";
import WalletDatasource from "../datasource/wallet.datasource";
import createPaystackDva from "../../../../shared/paystack/dva.paystack";
import Customer from "../../../../database/entities/customer.entities";
import Wallet from "../../../../database/entities/wallet.entities";
import { hashWalletPin } from "../../../../shared/utils/hash.utils";

@injectable()
class WalletService {
    constructor(@inject(WalletDatasource) private walletDatasource: WalletDatasource){}
    async createWallet(data: CreateWalletDto){
        try {
            const walletExist = await this.walletDatasource.findWalletByVendorId(data.myThriftId)
            if(walletExist) throw new ConflictError('User already has a wallet')
                
            const customerExist = await this.walletDatasource.customerExist(data.email)
            if(customerExist) throw new ConflictError('Customer with this email already exist')

            const createCustomer = await createPaystackCustomer(data)
            if(!createCustomer) throw new DependencyError("Paystack error: error creating customer")
    
            const customerId = createCustomer.data.id
   
            const createDva = await createPaystackDva({customerId, preferredBank:'titan-paystack'})
            if(!createDva) throw new DependencyError('Paystack error: error creating dva')
        
            const newCustomer = new Customer()
            newCustomer.customerId = customerId
            newCustomer.email = data.email
            newCustomer.firstName = data.firstName
            newCustomer.lastName = data.lastName
            newCustomer.myThriftId = data.myThriftId
            newCustomer.phoneNumber = data.phoneNumber
            newCustomer.customerData = createCustomer
            const customer =  await this.walletDatasource.saveNewCustomer(newCustomer)

            const walletPin = await hashWalletPin(data.walletPin)
            const newWallet =  new Wallet()
            newWallet.customer = customer
            newWallet.myThriftId = data.myThriftId
            newWallet.accountName = createDva.data.account_name
            newWallet.balance = 0
            newWallet.walletId = createDva.data.id
            newWallet.preferredBank = 'titan-paystack'
            newWallet.pendingBalance = 0
            newWallet.accountNumber = createDva.data.account_number
            newWallet.walletPin = walletPin

            return await this.walletDatasource.saveWallet(newWallet)

        } catch (error) {
            throw error
        }
    }
    async getWalletTransactions(myThriftId: string){
        try {
            return await this.walletDatasource.findWalletTransactionByMythriftId(myThriftId)

        } catch (error) {
            throw error
        }
    }
}

export default WalletService