import { NextFunction, Request, Response } from "express";
import { inject, injectable } from 'tsyringe'
import VendorPayDateHelper from "../../../../shared/helpers/vendor-pay-date.helper";
import { BadRequestError } from "../../../../shared/middleware/error-handler.middleware";
import VendorPayHelper from "../../../../shared/helpers/vendor-pay.helper";
import moment from "moment-timezone";

@injectable()
class VendorPayController {
    constructor(
        @inject(VendorPayDateHelper) private vendorPayDateHelper: VendorPayDateHelper,
        @inject(VendorPayHelper) private vendorPay: VendorPayHelper
    ){}
    async getPayDate(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.query as {vendorId: string, orderReference: string}
            if(!data.orderReference || !data.vendorId) throw new BadRequestError('Missing query values')
            const response = await this.vendorPayDateHelper.getVendorPayDate(data.vendorId, data.orderReference)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getPayPercentages(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.query as {vendorId: string, orderReference: string}
            if(!data.orderReference || !data.vendorId) throw new BadRequestError('Missing query values') 
            const response = await this.vendorPay.getPayPercentages(data.vendorId, data.orderReference)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async vendorTransactionHistory(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.query as { vendorId: string, startDate: string, endDate: string }
            if(!data.vendorId || !data.startDate || !data.endDate) throw new BadRequestError('Missing query values')
            const startDate = moment(data.startDate).toDate()
            const endDate = moment(data.endDate).toDate()
            const response = await this.vendorPay.getTransactionHistory(data.vendorId, startDate, endDate)
            return res.status(200).json(response)
        } catch (error) {
            
        }
    }
    
}

export default VendorPayController