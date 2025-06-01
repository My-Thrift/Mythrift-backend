import http from 'http'
import app from './app'
import appConfig from './config/app.config'
import bootstrap from './bootstrap'

const port = appConfig.server.port
const server = http.createServer(app)

const startServer = async()=>{
    await bootstrap()
    server.listen(port, '0.0.0.0', ()=>{
        console.info(`server is running on port ${port}`)
    })
}

startServer()