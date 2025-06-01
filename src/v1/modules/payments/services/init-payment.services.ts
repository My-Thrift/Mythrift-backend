import { inject, injectable } from "tsyringe";
import { InitPaymentDto } from "../dto/init-payment.dto";
import uuidGenerator from "../../../../shared/utils/uuid.utils";
import axios from 'axios'
import appConfig from "../../../../config/app.config";
import { DependencyError } from "../../../../shared/middleware/error-handler.middleware";
import InitPaymentDatasource from "../datasource/init-payment.datasource";

@injectable()
class InitPaymentService {
    constructor(@inject(InitPaymentDatasource) private initPaymentDatasource: InitPaymentDatasource){}
    async initPayment(data: InitPaymentDto) {
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
            await this.initPaymentDatasource.initPayment({...data, reference: reference, paymentStatus: 'pending', vendorStatus: 'pending', orderDelivered: false})
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default InitPaymentService