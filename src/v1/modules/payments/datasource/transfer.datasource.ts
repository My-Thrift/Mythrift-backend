import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import Transfers from "../../../../database/entities/transfers.entities";
import { AppDatasource } from "../../../../database";
import { ref } from "process";

@injectable()
class TransferDatasource {
    private transferRepository: Repository<Transfers>
    constructor(){
        this.transferRepository = AppDatasource.getRepository(Transfers)
    }
    async findTransferByReferenceAndVendorId(reference: string, vendorId: string){
        return await this.transferRepository.findOne({where:{orderReference: reference, vendorId}})
    }
    async saveTransferDetails(transfer: Transfers){
        await this.transferRepository.save(transfer)
    }
    async checkInitialTransfer(orderReference: string, vendorId: string){
        return await this.transferRepository.findOne({ where: {orderReference, vendorId, percentagePaid: '60'}})
    }
    async updateTransferStatus(data: any, reference: string){
        await this.transferRepository.update({orderReference: reference}, {additionalInfo: data})
    }
}

export default TransferDatasource