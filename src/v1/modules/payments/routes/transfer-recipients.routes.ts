import express from 'express'
import { container } from 'tsyringe'
import TransferRecipientController from '../controllers/transfer-recipients.controllers'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import TransferRecipientsDto from '../dto/transfer-recipients.dto'
const transferrecipientRouter = express.Router()



const transferRecipientController = container.resolve(TransferRecipientController)


transferrecipientRouter
.post(`/transfer-recipient`, requestValidator(TransferRecipientsDto), transferRecipientController.createRecipient.bind(transferRecipientController))
.get('/resolve-account', transferRecipientController.resolveAccount.bind(transferRecipientController))
export default transferrecipientRouter