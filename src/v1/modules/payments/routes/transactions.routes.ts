import express from 'express'
import TransactionsRouterController from '../controllers/transactions.controllers'
import { container } from 'tsyringe'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { TransactionsDto } from '../dto/transactions.dto'


const transactionsRouter = express.Router()
const transactionsRouterController = container.resolve(TransactionsRouterController)

transactionsRouter
.post('/initialize-payment', requestValidator(TransactionsDto), transactionsRouterController.initPayment.bind(transactionsRouterController))


export default transactionsRouter