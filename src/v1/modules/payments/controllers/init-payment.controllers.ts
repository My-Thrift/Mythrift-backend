import { NextFunction, Request, Response } from "express";
import { InitPaymentDto } from "../dto/init-payment.dto";
import { inject, injectable } from "tsyringe";
import InitPaymentService from "../services/init-payment.services";


@injectable()
class InitPaymentController {
    constructor(@inject(InitPaymentService) private initPaymentService: InitPaymentService){}
    async initPayment(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as InitPaymentDto
            const response = await this.initPaymentService.initPayment(data)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export default InitPaymentController