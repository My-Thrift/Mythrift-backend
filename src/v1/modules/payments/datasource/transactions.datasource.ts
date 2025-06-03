import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import Transactions from "../../../../database/entities/transactions.entities";
import { AppDatasource } from "../../../../database";


@injectable()
class TransactionsDatasource {
    private transactionsRepository: Repository<Transactions>
    constructor(){
        this.transactionsRepository = AppDatasource.getRepository(Transactions)
    }
    async initPayment(data: any){
        const create =  this.transactionsRepository.create(data)
        await this.transactionsRepository.save(create)
    }
    async findPaymentByRefrenceAndVendorId(reference: string, vendorId: string){
        return await this.transactionsRepository.findOne({ where: {reference, vendorId, vendorStatus: 'pending'}})
    }
}

export default TransactionsDatasource