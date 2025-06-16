import { io, walletNsp } from "../../server"



export const emitWalletUpdate = (myThriftId: string, wallet: any)=>{
    try {
        console.log('event sent to ', myThriftId)
        walletNsp.to(myThriftId).emit("walletUpdate", {myThriftId, wallet})
    } catch (error) {
        throw error
    }
}

export default emitWalletUpdate