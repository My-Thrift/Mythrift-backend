import express from 'express'
import InitPaymentController from '../controllers/init-payment.controllers'
import { container } from 'tsyringe'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { InitPaymentDto } from '../dto/init-payment.dto'


const initPaymentRouter = express.Router()
const initPaymentController = container.resolve(InitPaymentController)

initPaymentRouter
.post('/initialize-payment', requestValidator(InitPaymentDto), initPaymentController.initPayment.bind(initPaymentController))


export default initPaymentRouter