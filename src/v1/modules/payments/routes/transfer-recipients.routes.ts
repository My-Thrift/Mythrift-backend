import express from 'express'
import { container } from 'tsyringe'
import TransferRecipientController from '../controllers/transfer-recipients.controllers'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import TransferRecipientsDto from '../dto/transfer-recipients.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
const transferrecipientRouter = express.Router()



const transferRecipientController = container.resolve(TransferRecipientController)


transferrecipientRouter
.post(`/transfer-recipient`, [authMiddleware,requestValidator(TransferRecipientsDto)], transferRecipientController.createRecipient.bind(transferRecipientController))
.get('/resolve-account', authMiddleware, transferRecipientController.resolveAccount.bind(transferRecipientController))
export default transferrecipientRouter