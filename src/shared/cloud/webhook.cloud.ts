import axios from "axios"
import { generateSignature } from "./signature.cloud"
import appConfig from "../../config/app.config"



export const cloudWebhook = async (url: string, payload: any)=>{
    try {
        const signature = generateSignature(JSON.stringify(payload), appConfig.cloud.cloud_secret)
        await axios.post(url, 
            payload,
            {
                headers:{
                    "x-mythrift": signature,
                    'Content-Type': 'application/json',
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}


export const qpayWebhook = async (url: string, payload: any)=>{
    try {
        const signature = generateSignature(JSON.stringify(payload), appConfig.qpay.qpay_secret)
        await axios.post(url, 
            payload,
            {
                headers:{
                    "x-mythrift": signature,
                    "Authorization": `Bearer ${appConfig.qpay.qpay_api_key}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log("sent qpay")
    } catch (error) {
        console.error(error)
    }
}