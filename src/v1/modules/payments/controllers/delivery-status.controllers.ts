import { NextFunction, Request, Response } from "express";
import { injectable } from 'tsyringe'

@injectable()
class DeliveryStatusController {
    constructor(){}
    async deliveryStatus(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default DeliveryStatusController