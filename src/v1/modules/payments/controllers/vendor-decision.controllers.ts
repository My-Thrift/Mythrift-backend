import { NextFunction, Request, Response } from "express";


class ClassName {
    async acc(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default ClassName