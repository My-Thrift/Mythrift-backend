import express from 'express'
import VendorDecisionController from '../controllers/vendor-decision.controllers'
import { container } from 'tsyringe'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { VendorDecisionDto } from '../dto/vendor-decision.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'

const vendorDecisionController = container.resolve(VendorDecisionController)
const vendorDecisionRouter  = express.Router()

vendorDecisionRouter
.post('/vendor-decision', [authMiddleware ,requestValidator(VendorDecisionDto)], vendorDecisionController.vendorDecision.bind(vendorDecisionController))

export default vendorDecisionRouter