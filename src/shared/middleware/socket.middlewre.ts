import { Socket } from "socket.io"
import { UnauthorizedError } from "./error-handler.middleware"
import appConfig from "../../config/app.config"


const socketMiddleware = (socket: Socket, next: any)=>{
    try {
        const  token = socket.handshake.headers.authorization //as { token: string, myThriftId: string}
        const myThriftId = socket.handshake.query.myThriftId as string
        if(!token) throw new UnauthorizedError('Token is not in handshake')
        if(token !== appConfig.app.apiKey) throw new UnauthorizedError('Invalid api key')
        if(!myThriftId) throw new UnauthorizedError('My thrift Id is missing')
        socket.data.myThriftId = myThriftId

        next()
    } catch (error) {
         next(error)
    }
}
export default socketMiddleware