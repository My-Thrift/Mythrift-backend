import axios from "axios"
import appConfig from "../../config/app.config"
import getPaystackBalance from "./balance.paystack"



const refundTransaction = async (reference: string, amount: number)=>{
    try {
        const getBalance = await getPaystackBalance() 
        console.log(amount)
        if(!getBalance || getBalance < amount) throw new Error('Paystack error: Insuffcient balance')
        const response = await axios.post(`${appConfig.paystack.base_url}/refund`,
            {
                "transaction": reference,
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


export default refundTransaction