import { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "./error-handler.middleware"
import appConfig from "../../config/app.config"


export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    try {
    const token:string | null = (req?.headers?.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null)
    if(!token) throw new UnauthorizedError('Access denied. No token provided.')
    
    const apiKey = appConfig.app.apiKey
    if(token !== apiKey){
    throw new UnauthorizedError('Invalid token provided') 
    }
    next()
    } catch (error) {
     throw error
    }
 }