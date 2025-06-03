import axios from "axios";
import appConfig from "../../config/app.config";


export const getPaystackBalance = async()=>{
    try {
        const response = await axios.get(`${appConfig.paystack.base_url}/balance`,
            {
                headers: {
                    "Authorization": `Bearer ${appConfig.paystack.api_key}`
                }
            }
        )
       return response.data.data[0].balance/100
    } catch (error) {
        throw error
    }
}
export default getPaystackBalance