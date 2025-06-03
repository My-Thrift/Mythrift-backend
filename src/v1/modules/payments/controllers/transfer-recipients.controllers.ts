import { NextFunction, Request, Response } from "express";
import TransferRecipientsDto from "../dto/transfer-recipients.dto";
import { inject, injectable } from "tsyringe";
import TransferRecipientsServices from "../services/transfer-recipients.services";

@injectable()
class TransferRecipientController {
    constructor(@inject(TransferRecipientsServices) private transferRecipientsServices: TransferRecipientsServices){}
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