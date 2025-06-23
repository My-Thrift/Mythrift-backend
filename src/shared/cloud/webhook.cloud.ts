import axios from "axios"
import { generateSignature } from "./signature.cloud"



export const cloudWebhook = async (url: string, payload: any)=>{
    try {
        const signature = generateSignature(JSON.stringify(payload))
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

