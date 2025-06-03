import { NextFunction, Request, Response } from "express";
import appConfig from "../../config/app.config";
import crypto from 'crypto'
import TransactionsService from "../../v1/modules/payments/services/transactions.services";
import { container, inject, injectable } from "tsyringe";

@injectable()
class PaystackWebhooks {
    constructor(@inject(TransactionsService) private transactionsService:TransactionsService){}
    async webhooks(req: Request, res: Response, next: NextFunction):Promise<any>{
        try {
            const event = req.body

        const secretKey = appConfig.paystack.api_key
        const hash = req.headers['x-paystack-signature'];

        const computedHash = crypto
        .createHmac('sha512', secretKey)
        .update(JSON.stringify(event))
        .digest('hex');

        switch(event.event){
            case 'charge.success':
            await this.transactionsService.updateSuccessfulPaymentStatus(event.data)
                break;
              case 'transfer.failure':
                break;
              case 'transfer.success':
                break;
              case 'refund.processing':
                break;
              case 'refund.processed':
                break;
              case 'refund.failed':
                break;
        }

        res.sendStatus(200)
        } catch (error) {
            throw error
        }
    }
}

const resolvedContainer = container.resolve(PaystackWebhooks)
const paystackWebhook = resolvedContainer.webhooks.bind(resolvedContainer)

export default paystackWebhook
