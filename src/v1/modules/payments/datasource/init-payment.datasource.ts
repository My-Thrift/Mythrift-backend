import { injectable } from "tsyringe";
import { InitPaymentDto } from "../dto/init-payment.dto";
import { Repository } from "typeorm";
import Transactions from "../../../../database/entities/transactions.entities";
import { AppDatasource } from "../../../../database";


@injectable()
class InitPaymentDatasource {
    private transactionsRepository: Repository<Transactions>
    constructor(){
        this.transactionsRepository = AppDatasource.getRepository(Transactions)
    }
    async initPayment(data: any){
        const create =  this.transactionsRepository.create(data)
        await this.transactionsRepository.save(create)
    }
}

export default InitPaymentDatasource