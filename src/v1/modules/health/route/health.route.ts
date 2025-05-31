import express from 'express'
import { container } from 'tsyringe'
import HealthController from '../controllers/health.controllers'
const healthRouter = express.Router()
const healthController = container.resolve(HealthController)

healthRouter
.get('/health', healthController.appHealth.bind(healthController))


export default healthRouter