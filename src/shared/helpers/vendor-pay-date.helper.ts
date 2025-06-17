import moment from "moment-timezone"
import { injectable, inject } from "tsyringe"
import VendorDecisionDatasource from "../../v1/modules/payments/datasource/vendor-decision.datasource"
import { NotFoundError } from "../middleware/error-handler.middleware"

@injectable()
class VendorPayDateHelper {
    constructor(@inject(VendorDecisionDatasource) private vendorDecisionDatasource:VendorDecisionDatasource ){}
    async calculateVendorPayDate (transactionDate: Date){
        try {
            const day = transactionDate.getDay()
    
            if([5, 6, 0].includes(day)){
                const daysToAdd = (8 - day) % 7
                const addDay = addDayToVendor(transactionDate, daysToAdd)
                return addDay
            }
            else if([1, 2].includes(day)){
                const daysToAdd = (3 - day) 
                const addDay = addDayToVendor(transactionDate, daysToAdd)
                return addDay
            }
            else if([3, 4].includes(day)){
                const daysToAdd = (5 - day) 
                const addDay = addDayToVendor(transactionDate, daysToAdd)
                return addDay
            }
        } catch (error) {
            throw error
        }
    }
    async getVendorPayDate(vendorId: string, reference: string){
        try {
            const pendingPayData = await this.vendorDecisionDatasource.getPendingPayByReference(vendorId, reference)
            if(!pendingPayData) throw new NotFoundError('Transaction does not exist')
            const payDate = moment(pendingPayData.vendorPayDate).format('YY-MM-DD')
            return { "pay-date": payDate }
        } catch (error) {
            throw error
        }
    }
}

export default VendorPayDateHelper



const addDayToVendor = (date: Date, days: number)=>{
    try {
        return moment(date).add(days, 'days').toDate()
    } catch (error) {
        throw error
    }
}