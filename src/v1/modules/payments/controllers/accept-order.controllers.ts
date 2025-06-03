import { NextFunction, Request, Response } from "express";


class ClassName {
    async Name(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default ClassName