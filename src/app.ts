import 'reflect-metadata'
import express, { Application } from 'express'
import appVersion from './config/app-version.config'
import healthRouter from './v1/modules/health/route/health.route'
import { errorHandler } from './shared/middleware/error-handler'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()


app.use(express.json())

    

app.use(`/api/${appVersion.v1}`, healthRouter)






app.use(errorHandler)
export default app