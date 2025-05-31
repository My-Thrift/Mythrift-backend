import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import SuccessResponse from '../../../../shared/utils/response.utils'

@injectable()
class HealthController {
    async appHealth(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            return res.status(200).json(SuccessResponse('My thrift server is online and taking requests.'))
        } catch (error: any) {
            next(error)
        }
    }
}

export default HealthController