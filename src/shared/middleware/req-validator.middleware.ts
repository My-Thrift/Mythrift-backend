import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from './error-handler.middleware'

const requestValidator = (dtoClass: any)=>{
    try {
       return async(req: Request, res: Response, next: NextFunction)=>{
            if(!req.body || typeof req.body === 'undefined') throw new BadRequestError('No data in request')
            const dto = plainToInstance(dtoClass, req.body)
            const error = await validate(dto)
            if(error.length > 0) return res.status(400).json(error) 
            next()
       }
    } catch (error) {
        throw error
    }
}

export default requestValidator