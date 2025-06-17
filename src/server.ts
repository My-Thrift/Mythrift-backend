import http from 'http'
import app from './app'
import appConfig from './config/app.config'
import bootstrap from './bootstrap'
import { Server, Socket } from 'socket.io'
import socketMiddleware from './shared/middleware/socket.middlewre'

const port = appConfig.server.port
const server = http.createServer(app)

export const io = new Server(server, {
  path: '/wallet',               
  transports: ['websocket'],
  cors: {
    origin: [
      'http://localhost:3000',
      'https://www.shopmythrift.store',
      'https://shopmythrift.store',
      'https://staging.mythriftpayments.site'
    ],
    credentials: true,
  },
})


export const walletNsp = io.of('/wallet')
.use(socketMiddleware)
.on('connection', async (socket: Socket) => {
  const user = socket.data.myThriftId as string 
  if (!user) {
  console.warn(`Socket ${socket.id} connected without myThriftId`)
  socket.disconnect(true)
  return
}

  socket.join(user)  

  walletNsp.to(user).emit('hello', user)
  console.log(`New user in room ${user} (socket ${socket.id})`)

  socket.on('disconnect', () => {
    console.log(`User ${user} disconnected`)
  })
})

const startServer = async () => {
  await bootstrap()
  server.listen(port, '0.0.0.0', () => {
    console.info(`server is running on port ${port}`)
  })
}

startServer()
