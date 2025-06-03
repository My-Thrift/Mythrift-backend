import { NextFunction, Request, Response } from "express";
import TransferRecipientsDto from "../dto/transfer-recipients.dto";
import { inject, injectable } from "tsyringe";
import TransferRecipientsServices from "../services/transfer-recipients.services";
import { BadRequestError } from "../../../../shared/middleware/error-handler.middleware";

@injectable()
class TransferRecipientController {
    constructor(@inject(TransferRecipientsServices) private transferRecipientsServices: TransferRecipientsServices){}
    async resolveAccount(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { accountNumber, bankCode } = req.query
            if(!accountNumber || !bankCode) throw new BadRequestError('Request is missing bankcode or account number')
            const accountNumberToString = String(accountNumber)
            const bankCodeToString = String(bankCode)
            const response = await this.transferRecipientsServices.resolveAccount({accountNumber: accountNumberToString, bankCode: bankCodeToString})
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    
    async createRecipient(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as TransferRecipientsDto
            const response = await this.transferRecipientsServices.createRecipient(data)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export default TransferRecipientController