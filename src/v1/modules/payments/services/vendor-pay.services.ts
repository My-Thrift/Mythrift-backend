import { inject, injectable } from "tsyringe";
import { RequestPayoutDto } from "../dto/vendor-pay.dto";
import WalletDatasource from "../datasource/wallet.datasource";
import { ForbidenError } from "../../../../shared/middleware/error-handler.middleware";


@injectable()
class VendorPayServices {
    constructor(@inject(WalletDatasource) private walletDatasource: WalletDatasource){}

    async requestPayout(data: RequestPayoutDto){
        try {
            const findWallet = await this.walletDatasource.findWalletByVendorId(data.vendorId)
            if(!findWallet) throw new ForbidenError('Please create a wallet before requesting payout')
                
           // const getPendingPays = 
        } catch (error) {
            throw error
        }
    }
}
export default VendorPayServices