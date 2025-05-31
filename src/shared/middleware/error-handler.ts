import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string, statusCode: number = 400){
        super(message, statusCode)
    }
}
export class ValidationError extends CustomError {
    constructor(message: string, statusCode: number = 400){
        super(message, statusCode)
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string, statusCode: number = 401){
        super(message, statusCode)
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string, statusCode: number = 404){
        super(message, statusCode)
    }
}

export class ForbidenError extends CustomError {
    constructor(message: string, statusCode: number = 403){
        super(message, statusCode)
    }
}

export class ConflictError extends CustomError {
    constructor(message: string, statusCode: number = 409){
        super(message, statusCode)
    }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({status: false, message: err.message})
    }
    console.error(err)
    return res.status(500).json({ message: 'server error' })
} 
