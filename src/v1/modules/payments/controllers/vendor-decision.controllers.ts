import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import VendorDecisionService from "../services/vendor-decision.services";
import { VendorDecisionDto } from "../dto/vendor-decision.dto";
import SuccessResponse from "../../../../shared/utils/response.utils";

@injectable()
class VendorDecisionController {
    constructor(@inject(VendorDecisionService) private vendorDecisionService:VendorDecisionService){}
    async vendorDecision(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = req.body as VendorDecisionDto
            const response = await this.vendorDecisionService.vendorDecision(data)
            return res.status(200).json(SuccessResponse('Vendor decision taken', response))
        } catch (error) {
            next(error)
        }
    }
}

export default VendorDecisionController