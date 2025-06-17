import 'reflect-metadata'
import express, { Application, Request, RequestHandler, Response } from 'express'
import appVersion from './config/app-version.config'
import healthRouter from './v1/modules/health/route/health.route'
import { errorHandler } from './shared/middleware/error-handler.middleware'
import initPaymentRouter from './v1/modules/payments/routes/transactions.routes'
import transferrecipientRouter from './v1/modules/payments/routes/transfer-recipients.routes'
import paystackWebhook from './shared/paystack/webhooks.paystack'
import moment from 'moment-timezone'
import vendorDecisionRouter from './v1/modules/payments/routes/vendor-decision.routes'
import cors from 'cors'
import helmet from 'helmet'
import VendorPayHelper from './shared/helpers/vendor-pay.helper'
import deliveryStatusRouter from './v1/modules/payments/routes/delivery-status.routes'
import vendorPayRouter from './v1/modules/payments/routes/vendor-pay.routes'
import walletRouter from './v1/modules/payments/routes/wallet.routes'

const app: Application = express()
moment.tz.setDefault('Africa/Lagos')


app
.use(helmet())
.use(express.json())
.use(cors({
    origin: ['http://localhost:3000', 'https://shopmythrift.store', 'https://www.shopmythrift.store'],
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
}))
.use(`/api/${appVersion.v1}`, healthRouter)
.use(`/api/${appVersion.v1}`, initPaymentRouter)
.use(`/api/${appVersion.v1}`, transferrecipientRouter)
.use(`/api/${appVersion.v1}/webhook/paystack`, paystackWebhook)
.use(`/api/${appVersion.v1}`, vendorDecisionRouter)
.use(`/api/${appVersion.v1}`, deliveryStatusRouter)
.use(`/api/${appVersion.v1}`, vendorPayRouter)
.use(`/api/${appVersion.v1}`, walletRouter)
// .use('*', (req, res)=>{
//     const incorrectRoute = req.originalUrl;
//     const method = req.method;
//     res.status(404).send({ status: false, message: `${method} Route: ${incorrectRoute} cannot be found`})
// })
.use(errorHandler)


export default app