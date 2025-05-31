import http from 'http'
import app from './app'
import appConfig from './config /app.config'


const port = appConfig.server.port
const server = http.createServer(app)


server.listen(port, '0.0.0.0', ()=>{
    console.info(`server is running on port ${port}`)
})