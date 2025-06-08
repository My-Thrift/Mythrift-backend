import { NextFunction, Request, Response } from "express";
import { TransactionsDto } from "../dto/transactions.dto";
import { inject, injectable } from "tsyringe";
import TransactionsService from "../services/transactions.services";
import SuccessResponse from "../../../../shared/utils/response.utils";


@injectable()
class TransactionsRouterController {
    constructor(@inject(TransactionsService) private transactionsService: TransactionsService){}
    async initPayment(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as TransactionsDto
            const response = await this.transactionsService.initPayment(data)
            return res.status(200).json(SuccessResponse('Payment link created', response))
        } catch (error) {
            next(error)
        }
    }
}

export default TransactionsRouterController