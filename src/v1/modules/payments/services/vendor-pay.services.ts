import { inject, injectable } from "tsyringe";
import { RequestPayoutDto } from "../dto/vendor-pay.dto";
import WalletDatasource from "../datasource/wallet.datasource";
import { ForbidenError, UnauthorizedError } from "../../../../shared/middleware/error-handler.middleware";
import moment from "moment-timezone";
import { payoutDays } from "../../../../config/days.config";
import { compareWalletPin } from "../../../../shared/utils/hash.utils";
import TransferRecipientDatasource from "../datasource/transfer-recipients.datasource";
import paystackTransfer from "../../../../shared/paystack/transfer.paystack";
import getPaystackBalance from "../../../../shared/paystack/balance.paystack";
import WalletTransaction from "../../../../database/entities/wallet-transactions.entities";
import uuidGenerator from "../../../../shared/utils/uuid.utils";
import { TransactionStatus } from "../../../../database/enums/enums.database";
import Recipients from "../../../../database/entities/recipients.entities";
import Wallet from "../../../../database/entities/wallet.entities";


@injectable()
class VendorPayService {
    constructor(
        @inject(WalletDatasource) private walletDatasource: WalletDatasource,
        @inject(TransferRecipientDatasource) private transferRecipientDatasource: TransferRecipientDatasource
    ){}

    async requestPayout(data: RequestPayoutDto){
        try {
            const {walletPin, vendorId, payoutAmount} = data
            const today = moment().toDate().getDay()
            if(!payoutDays.includes(today)) throw new ForbidenError('Today is not a payout day')
        
            const findWallet: Wallet | null = await this.walletDatasource.findWalletByVendorId(vendorId)
            if(!findWallet) throw new ForbidenError('Please create a wallet before requesting payout')

            if(findWallet.balance < payoutAmount) throw new ForbidenError('Insufficient wallet balance')
            const getBalance: number = await getPaystackBalance()

            if(getBalance < payoutAmount) throw new ForbidenError('Please contact support to make withdrawals')

            const findRecipient: Recipients | null = await this.transferRecipientDatasource.findRecipientByVendorId(vendorId)
            if(!findRecipient) throw new ForbidenError('You must create a recipient code first')

            const comparePin: Boolean = await compareWalletPin(walletPin, findWallet.walletPin)
            if(!comparePin) throw new UnauthorizedError('Wallet pin is incorrect')
            
            const reference: string = uuidGenerator()
            await paystackTransfer(payoutAmount, findRecipient.recipientCode, reference)

            findWallet.balance -= payoutAmount
            const newWalletTransaction = new WalletTransaction()
            newWalletTransaction.amount = payoutAmount
            newWalletTransaction.amountSlug = `-${payoutAmount}`
            newWalletTransaction.reason = 'Wallet withdrawal'
            newWalletTransaction.transactionReference = reference
            newWalletTransaction.wallet = findWallet
            newWalletTransaction.status = TransactionStatus.success
            newWalletTransaction.myThriftId = vendorId
            
            await this.walletDatasource.saveWallet(findWallet)
            return await this.walletDatasource.saveWalletTransaction(newWalletTransaction)
        } catch (error) {
            throw error
        }
    }
}
export default VendorPayService