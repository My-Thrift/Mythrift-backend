import express from 'express'
import requestValidator from '../../../../shared/middleware/req-validator.middleware'
import { CreateWalletDto } from '../dto/wallet.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import { container } from 'tsyringe'
import WalletController from '../controllers/wallet.controllers'


const walletRouter = express.Router()
const walletController = container.resolve(WalletController)

walletRouter
.post('/create-wallet', [authMiddleware,requestValidator(CreateWalletDto)], walletController.createWallet.bind(walletController))
.get('/wallet-transactions/:myThriftId', [authMiddleware], walletController.getWalletTransactions.bind(walletController))

export default walletRouter