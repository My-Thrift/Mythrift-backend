import { injectable } from "tsyringe";
import { Between, Repository } from "typeorm";
import Transactions from "../../../../database/entities/transactions.entities";
import { AppDatasource } from "../../../../database";
import Refunds from "../../../../database/entities/refunds.entities";
import Transfers from "../../../../database/entities/transfers.entities";
import { TransactionStatus, VendorDecision } from "../../../../database/enums/enums.database";


@injectable()
class TransactionsDatasource {
    private transactionsRepository: Repository<Transactions>
    private refundsRepository: Repository<Refunds>
    private transfersRepository: Repository<Transfers>

    constructor(){
        this.transactionsRepository = AppDatasource.getRepository(Transactions)
        this.refundsRepository = AppDatasource.getRepository(Refunds)
        this.transfersRepository = AppDatasource.getRepository(Transfers)
    }
    async initPayment(data: any){
        const create =  this.transactionsRepository.create(data)
        await this.transactionsRepository.save(create)
    }
    async findPendingPaymentByRefrenceAndVendorId(reference: string, vendorId: string, ){
        return await this.transactionsRepository.findOne({ where: {reference, vendorId, vendorStatus: VendorDecision.pending}})
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
        await this.transactionsRepository.update({reference}, {paymentStatus: TransactionStatus.success})
        return await this.transactionsRepository.findOne({ where : {reference}})
    }
    async updateDeliveryStatus(reference: string, orderDelivered: Boolean){
        await this.transactionsRepository.update({reference}, {orderDelivered})
        return await this.transactionsRepository.findOne({where:{reference}})
    }
    async getTransactionHistory(vendorId: string, startDate: Date, endDate: Date) {
        return await this.transfersRepository
          .createQueryBuilder("transfers")
          .where("transfers.vendorId = :vendorId", { vendorId })
          .andWhere(
            `transfers."additionalInfo"->>'transferred_at' BETWEEN :start AND :end`,
            {
              start: startDate.toISOString(),
              end:   endDate.toISOString(),
            }
          )
          .getMany();
      }
      
}

export default TransactionsDatasource