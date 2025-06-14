import { NextFunction, Request, Response } from "express";
import { inject, injectable } from 'tsyringe'
import WalletService from "../services/wallet.services";
import { CreateWalletDto } from "../dto/wallet.dto";
import SuccessResponse from "../../../../shared/utils/response.utils";

@injectable()
class WalletController {
    constructor(@inject(WalletService) private walletService: WalletService){}
    async createWallet(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as CreateWalletDto
            const response = await this.walletService.createWallet(data)
            return res.status(200).json(SuccessResponse('Wallet created', response))
        } catch (error) {
            next(error)
        }
    }
}

export default WalletController