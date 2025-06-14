import axios from "axios"
import appConfig from "../../config/app.config"



const paystackTransfer = async (amount: number, recipientCode: string, reference: string): Promise<any> =>{
    try {
        const response = await axios.post(`${appConfig.paystack.base_url}/transfer`, 
            {
                "source": "balance",
                "amount": amount*100,
                "recipient": recipientCode,
                "reference": reference,
                "reason": "My thrift Vendor Payment",
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

export default paystackTransfer