import 'reflect-metadata'
import express, { Application } from 'express'
import appVersion from './config/app-version.config'
import healthRouter from './v1/modules/health/route/health.route'
import { errorHandler } from './shared/middleware/error-handler.middleware'
import initPaymentRouter from './v1/modules/payments/routes/transactions.routes'
import transferrecipientRouter from './v1/modules/payments/routes/transfer-recipients.routes'
import paystackWebhook from './shared/paystack/webhooks.paystack'
import moment from 'moment-timezone'
import vendorDecisionRouter from './v1/modules/payments/routes/vendor-decision.routes'
import { container } from 'tsyringe'
import VendorPay from './shared/helpers/vendor-pay.helper'
const app: Application = express()


app.use(express.json())



app.use(`/api/${appVersion.v1}`, healthRouter)
app.use(`/api/${appVersion.v1}`, initPaymentRouter)
app.use(`/api/${appVersion.v1}`, transferrecipientRouter)
app.use(`/api/${appVersion.v1}/webhook/paystack`, paystackWebhook)
app.use(`/api/${appVersion.v1}`, vendorDecisionRouter)


moment.tz.setDefault('Africa/Lagos')



app.use(errorHandler)
export default app