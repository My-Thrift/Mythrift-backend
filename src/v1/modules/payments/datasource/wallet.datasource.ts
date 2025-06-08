import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import Customer from "../../../../database/entities/customer.entities";
import { AppDatasource } from "../../../../database";
import Wallet from "../../../../database/entities/wallet.entities";
import WalletTransaction from "../../../../database/entities/wallet-transactions.entities";

@injectable()
class WalletDatasource {
    private customerRepository: Repository<Customer>
    private walletRepository: Repository<Wallet>
    private walletTransactionRepository: Repository<WalletTransaction>
    constructor(){
        this.customerRepository = AppDatasource.getRepository(Customer)
        this.walletRepository = AppDatasource.getRepository(Wallet)
        this.walletTransactionRepository = AppDatasource.getRepository(WalletTransaction)
    }
    async customerExist(email: string){
        return await this.customerRepository.findOne({ where: {email}})
    }
    async saveWallet(wallet: Wallet){
        return await this.walletRepository.save(wallet)
    }
    async saveNewCustomer(customer: Customer){
        return await this.customerRepository.save(customer)
    }
    async findWalletByAccountNumber(accountNumber: string){
        return await this.walletRepository.findOne({ where: {accountName: accountNumber}})
    }
    async saveWalletTransaction(transaction: WalletTransaction){
        return await this.walletTransactionRepository.save(transaction)
    }
    async findWalletTransactionByReference(reference: string){
        return await this.walletTransactionRepository.findOne({ where: { transactionReference: reference}})
    }
    async findWalletByVendorId(vendorId: string){
        return await this.walletRepository.findOne({ where: {myThriftId: vendorId}})
    }
}

export default WalletDatasource