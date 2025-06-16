import { io } from "../../server"



export const emitWalletUpdate = (myThriftId: string, wallet: any, walletTransaction: any)=>{
    try {
        io.to(myThriftId).emit("walletUpdate", {myThriftId, wallet})
    } catch (error) {
        throw error
    }
}

export default emitWalletUpdate