import { inject, injectable } from "tsyringe";
import { TransactionsDto } from "../dto/transactions.dto";
import uuidGenerator from "../../../../shared/utils/uuid.utils";
import axios from 'axios'
import appConfig from "../../../../config/app.config";
import { DependencyError } from "../../../../shared/middleware/error-handler.middleware";
import TransactionsDatasource from "../datasource/transactions.datasource";

@injectable()
class TransactionsService {
    constructor(@inject(TransactionsDatasource) private transactionsDatasource: TransactionsDatasource){}
    async initPayment(data: TransactionsDto) {
        try {
            const { amount, email, firstName, lastName} = data
            const reference = uuidGenerator()
            const reqBody = { amount: amount*100 , email, firstName, lastName, reference}
            const response = await axios.post(`${appConfig.paystack.base_url}/transaction/initialize`,
                reqBody,
                {
                headers: {
                    'Authorization': `Bearer ${appConfig.paystack.api_key}`
                }
            }
            )
            if(!response) throw new DependencyError('Paystack Error: Error initializing payment')
            await this.transactionsDatasource.initPayment({...data, reference: reference, paymentStatus: 'pending', vendorStatus: 'pending', orderDelivered: false})
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default TransactionsService