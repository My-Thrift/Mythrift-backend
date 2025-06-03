import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import Transactions from "../../../../database/entities/transactions.entities";
import { AppDatasource } from "../../../../database";
import Refunds from "../../../../database/entities/refunds.entities";


@injectable()
class TransactionsDatasource {
    private transactionsRepository: Repository<Transactions>
    private refundsRepository: Repository<Refunds>
    constructor(){
        this.transactionsRepository = AppDatasource.getRepository(Transactions)
        this.refundsRepository = AppDatasource.getRepository(Refunds)
    }
    async initPayment(data: any){
        const create =  this.transactionsRepository.create(data)
        await this.transactionsRepository.save(create)
    }
    async findPaymentByRefrenceAndVendorId(reference: string, vendorId: string){
        return await this.transactionsRepository.findOne({ where: {reference, vendorId, vendorStatus: 'pending'}})
    }
    async saveRefundDetails(data: Refunds){
        return await this.refundsRepository.save(data)
    }
    async updateSuccessfulPaymentStatus(reference: string){
        await this.transactionsRepository.update({reference}, {paymentStatus: "success"})
    }
}

export default TransactionsDatasource