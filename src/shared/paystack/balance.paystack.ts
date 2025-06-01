import axios from "axios";
import appConfig from "../../config/app.config";


export const checkPaystackBalance = async()=>{
    try {
        const response = await axios.get(`${appConfig.paystack.base_url}/balance`,
            {
                headers: {
                    "Authorization": `Bearer ${appConfig.paystack.api_key}`
                }
            }
        )
        if(response.data.status === "true") return response.data.data[0].balance
    } catch (error) {
        throw error
    }
}

export default checkPaystackBalance