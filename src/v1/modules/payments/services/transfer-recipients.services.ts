import axios from "axios";
import TransferRecipientsDto from "../dto/transfer-recipients.dto";
import appConfig from "../../../../config/app.config";
import { ConflictError, DependencyError } from "../../../../shared/middleware/error-handler.middleware";
import TransferRecipients from "../controllers/transfer-recipients.controllers";
import Recipients from "../../../../database/entities/recipients.entities";
import { inject, injectable } from "tsyringe";
import TransferRecipientDatasource from "../datasource/transfer-recipients.datasource";

@injectable()
class TransferRecipientsServices {
    constructor(@inject(TransferRecipientDatasource) private transferRecipientDatasource: TransferRecipientDatasource){}
    async resolveAccount(data: {accountNumber: string, bankCode: string}){
        try {
            const {accountNumber, bankCode} = data
            const response = await axios.get(`${appConfig.paystack.base_url}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
                { 
                    headers: {
                        'Authorization': `Bearer ${appConfig.paystack.api_key}`
                    }
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    async createRecipient(data: TransferRecipientsDto){
        try {
            const recipientExist = await this.transferRecipientDatasource.findRecipientByAccountNumber(data.accountNumber)
            if(recipientExist) throw new ConflictError('Recipient already exist')

            const reqData = {
                type: 'nuban',
                name: data.name,
                account_number: data.accountNumber,
                bank_code: data.bankCode,
                currency: 'NGN'
            }
            const response = await axios.post(`${appConfig.paystack.base_url}/transferrecipient`, 
                reqData,
                {
                    headers: {
                        'Authorization': `Bearer ${appConfig.paystack.api_key}`,
                        'Accept': 'application/json'
                    }
                }
            )
            if(!response) throw new DependencyError('Paystack error: error creating transfer recipient')
            
            const newRecipient = new Recipients()
            newRecipient.accountNumber = data.accountNumber
            newRecipient.name = data.name
            newRecipient.recipientCode = response.data.data.recipient_code
            newRecipient.additionalInfo = response.data
            newRecipient.vendorId = data.vendorId
            return await this.transferRecipientDatasource.createRecipient(newRecipient)
        } catch (error) {
            throw error
        }
    }
}

export default TransferRecipientsServices