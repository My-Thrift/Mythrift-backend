import { io, walletNsp } from "../../server"



export const emitWalletUpdate = (myThriftId: string, wallet: any, walletTransaction: any)=>{
    try {
        console.log('event sent to ', myThriftId)
        walletNsp.to(myThriftId).emit("walletUpdate", {myThriftId, wallet, walletTransaction})
    } catch (error) {
        throw error
    }
}

export default emitWalletUpdate