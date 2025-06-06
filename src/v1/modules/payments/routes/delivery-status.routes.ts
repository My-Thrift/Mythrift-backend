import express from 'express'
import { container } from 'tsyringe'
import DeliveryStatusController from '../controllers/delivery-status.controllers'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { DeliveryStatusDto } from '../dto/delivery-status.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'



const deliveryStatusRouter = express.Router()
const deliveryStatusController = container.resolve(DeliveryStatusController)

deliveryStatusRouter
.post('/delivery-status', [authMiddleware,requestValidator(DeliveryStatusDto)],deliveryStatusController.deliveryStatus.bind(deliveryStatusController))

export default deliveryStatusRouter