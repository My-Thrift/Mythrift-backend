import { inject, injectable } from "tsyringe";
import PendingPayments from "../../../../database/entities/pending-payments.entities";
import { Between, Repository } from "typeorm";
import { AppDatasource } from "../../../../database";
import Transactions from "../../../../database/entities/transactions.entities";
import moment from "moment-timezone";


@injectable()
class VendorDecisionDatasource {
    private pendingPayRepository: Repository<PendingPayments>
    private transactionsRepository: Repository<Transactions>
    constructor(){
        this.pendingPayRepository = AppDatasource.getRepository(PendingPayments)
        this.transactionsRepository = AppDatasource.getRepository(Transactions)
    }
    async newPendingPay(data: PendingPayments){
       return await this.pendingPayRepository.save(data)
    }
    async updateVendorStatus(reference: string, vendorDecision: string){
        await this.transactionsRepository.update({reference}, {vendorStatus: vendorDecision})
    }
    async getPendingPays(){
        const startOfToday = moment('2025-06-06').startOf('day').toDate();  
        const endOfToday   = moment('2025-06-06').endOf('day').toDate(); 
        return await this.pendingPayRepository.find({where:{ vendorPayDate: Between(startOfToday, endOfToday), paymentCompleted: false}})
    }
    async updatePaymentStatusInPends(reference: string, percentagePaid: string, paymentCompleted: Boolean){
        await this.pendingPayRepository.update({orderReference: reference}, {percentagePaid, paymentCompleted})
    }
    async updateDeliveryStatus(reference: string, orderDelivered: Boolean){
        await this.pendingPayRepository.update({orderReference: reference}, {orderDelivered})
    }
}

export default VendorDecisionDatasource