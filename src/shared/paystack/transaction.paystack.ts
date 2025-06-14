import axios from "axios"
import appConfig from "../../config/app.config"


const initializeTransaction = async (data: {amount:number , email: string, firstName: string, lastName: string, reference: string}): Promise<any>=>{
    try {
            return await axios.post(`${appConfig.paystack.base_url}/transaction/initialize`,
            data,
            {
            headers: {
                'Authorization': `Bearer ${appConfig.paystack.api_key}`
            }
        }
        )
    } catch (error) {
        throw error
    }
}

export default initializeTransaction