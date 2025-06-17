import { inject, injectable } from "tsyringe";
import PendingPayments from "../../../../database/entities/pending-payments.entities";
import { Between, LessThanOrEqual, Repository } from "typeorm";
import { AppDatasource } from "../../../../database";
import Transactions from "../../../../database/entities/transactions.entities";
import moment from "moment-timezone";
import { VendorDecision } from "../../../../database/enums/enums.database";


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
    async updateVendorStatus(reference: string, status: VendorDecision){
        await this.transactionsRepository.update({reference}, { vendorStatus: status})
    }
    async getPendingPays(vendorId: string){
        const endOfToday   = moment().endOf('day').toDate(); 
        return await this.pendingPayRepository.find({where:{ vendorId ,vendorPayDate: LessThanOrEqual(endOfToday), paymentCompleted: false}})
    }
    async updatePaymentStatusInPends(reference: string, percentagePaid: string, paymentCompleted: Boolean){
        await this.pendingPayRepository.update({orderReference: reference}, {percentagePaid, paymentCompleted})
    }
    async updateDeliveryStatus(reference: string, orderDelivered: Boolean){
        await this.pendingPayRepository.update({orderReference: reference}, {orderDelivered})
    }
    async getPendingPayByReference(vendorId: string, reference: string){
        return await this.pendingPayRepository.findOne({ where:{vendorId, orderReference:reference}})
    }
}

export default VendorDecisionDatasource