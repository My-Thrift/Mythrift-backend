import axios from "axios"
import appConfig from "../../config/app.config"



const createPaystackDva = async (data: {customerId: number, preferredBank: string})=>{
    try {
        const response = await axios.post(`${appConfig.paystack.base_url}/dedicated_account`, 
            {
                "customer": data.customerId,
                "preferred_bank": data.preferredBank
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

export default createPaystackDva