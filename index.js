const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a new user is connected')

  socket.on('send nickname', nickname => {
    socket.nickname = nickname
    socket.emit('welcome message', 'Bienvenue ' + socket.nickname + ' !')
  })

  socket.on('chat message', msg => {
    io.emit('chat message', msg, socket.nickname)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'disconnect message',
      socket.nickname + ' disconnected'
    )
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
