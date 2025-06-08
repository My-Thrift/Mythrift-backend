import axios from "axios";
import { CreateWalletDto } from "../../v1/modules/payments/dto/wallet.dto";
import appConfig from "../../config/app.config";



const createPaystackCustomer = async (data: CreateWalletDto)=>{
    try {
        const response = await axios.post(`${appConfig.paystack.base_url}/customer`, 
            {
                "email": data.email,
                "first_name": data.firstName,
                "last_name": data.lastName,
                "phone": data.phoneNumber
            },
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

export default createPaystackCustomer