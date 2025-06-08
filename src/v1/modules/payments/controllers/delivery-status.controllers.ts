import { NextFunction, Request, Response } from "express";
import { inject, injectable } from 'tsyringe'
import { DeliveryStatusDto } from "../dto/delivery-status.dto";
import DeliveryStatusService from "../services/delivery-status.services";
import SuccessResponse from "../../../../shared/utils/response.utils";

@injectable()
class DeliveryStatusController {
    constructor(@inject(DeliveryStatusService) private deliveryStatusService: DeliveryStatusService){}
    async deliveryStatus(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as DeliveryStatusDto
            const response = await this.deliveryStatusService.deliveryStatus(data)
            return res.status(200).json(SuccessResponse('Delivery status Updated', response))
        } catch (error) {
            next(error)
        }
    }
}

export default DeliveryStatusController