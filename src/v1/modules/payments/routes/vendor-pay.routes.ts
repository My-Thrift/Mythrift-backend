import express from 'express'
import { container } from 'tsyringe'
import VendorPayController from '../controllers/vendor-pay.controllers'
const vendorPayRouter = express.Router()

const vendorPayController = container.resolve(VendorPayController)
vendorPayRouter
.get('/pay-date', vendorPayController.getPayDate.bind(vendorPayController))
.get('/pay-percentages', vendorPayController.getPayPercentages.bind(vendorPayController))
export default vendorPayRouter