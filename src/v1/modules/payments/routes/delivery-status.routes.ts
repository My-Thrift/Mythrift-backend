import express from 'express'
import { container } from 'tsyringe'
import DeliveryStatusController from '../controllers/delivery-status.controllers'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { DeliveryStatusDto } from '../dto/delivery-status.dto'



const deliveryStatusRouter = express.Router()
const deliveryStatusController = container.resolve(DeliveryStatusController)

deliveryStatusRouter
.post('/delivery-status', requestValidator(DeliveryStatusDto),deliveryStatusController.deliveryStatus.bind(deliveryStatusController))

export default deliveryStatusRouter