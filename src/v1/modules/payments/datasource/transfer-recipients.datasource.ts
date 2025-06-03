import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import Recipients from "../../../../database/entities/recipients.entities";
import { AppDatasource } from "../../../../database";



@injectable()
class TransferRecipientDatasource {
    private recipientDatasource: Repository<Recipients>
    constructor(){
        this.recipientDatasource = AppDatasource.getRepository(Recipients)
    }
    async createRecipient(data: Recipients){
       return await this.recipientDatasource.save(data)
    }
    async findRecipient(accountNumber: string){
        return await this.recipientDatasource.findOne({ where:{accountNumber} })
    }
}

export default TransferRecipientDatasource