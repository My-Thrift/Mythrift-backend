import express from 'express'
import { container } from 'tsyringe'
import VendorPayController from '../controllers/vendor-pay.controllers'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
const vendorPayRouter = express.Router()

const vendorPayController = container.resolve(VendorPayController)
vendorPayRouter
.get('/pay-date', authMiddleware,vendorPayController.getPayDate.bind(vendorPayController))
.get('/transaction-percentages', authMiddleware, vendorPayController.getPayPercentages.bind(vendorPayController))
.get('/transaction-history',authMiddleware, vendorPayController.vendorTransactionHistory.bind(vendorPayController))
export default vendorPayRouter