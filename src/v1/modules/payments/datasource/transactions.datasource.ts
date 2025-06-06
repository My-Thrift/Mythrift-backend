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
    async findPendingPaymentByRefrenceAndVendorId(reference: string, vendorId: string){
        return await this.transactionsRepository.findOne({ where: {reference, vendorId, vendorStatus: 'pending'}})
    }
    async findPaymentByRefrenceAndVendor(reference: string, vendorId: string){
        return await this.transactionsRepository.findOne({ where: {reference, vendorId}})
    }
    async findPaymentByReference(reference: string){
        return await this.transactionsRepository.findOne({where: {reference}})
    }
    async saveRefundDetails(data: Refunds){
        return await this.refundsRepository.save(data)
    }
    async updateRefundStatus(data: any, reference: string){
        await this.refundsRepository.update({orderReference: reference}, {additionalInfo: data})
    }
    async updateSuccessfulPaymentStatus(reference: string){
        await this.transactionsRepository.update({reference}, {paymentStatus: "success"})
        return await this.transactionsRepository.findOne({ where : {reference}})
    }
}

export default TransactionsDatasource