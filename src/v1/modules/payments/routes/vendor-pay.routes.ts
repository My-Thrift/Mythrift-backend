import express from 'express'
import { container } from 'tsyringe'
import VendorPayController from '../controllers/vendor-pay.controllers'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { RequestPayoutDto } from '../dto/vendor-pay.dto'
const vendorPayRouter = express.Router()

const vendorPayController = container.resolve(VendorPayController)
vendorPayRouter
.get('/pay-date', authMiddleware,vendorPayController.getPayDate.bind(vendorPayController))
.post('/request-payout', [authMiddleware, requestValidator(RequestPayoutDto)], vendorPayController.requestPayout.bind(vendorPayController))
.get('/transaction-percentages', authMiddleware, vendorPayController.getPayPercentages.bind(vendorPayController))
export default vendorPayRouter