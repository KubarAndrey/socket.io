const express = require('express')
const app = express();
const http = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( http, {
  cors: {
    //TODO: Поменять url
    origin: '*'
  }
} );
app.use(express.json());
const PORT = 3000;

const clients = {}
io.on('connection', onConnection)

function onConnection (socket) {
  const token = socket.handshake.auth.token
  console.log('token', token);
  clients[token] = socket.id

  socket.on('message:created', (message) => {
    console.log('new message: ', message);
  })
  console.log('clients', clients);

  app.post('/:id', function(req, res) {
    const id = req.params.id
    if(!clients[id]) {
      res.send('client not found')
    }
    console.log('clients.id', clients[id]);
        io.to(clients[id]).emit('message:created', req.body)
        res.send(req.body)
  })
  socket.on('disconnect', () => {
    console.log('disconnect');
    delete clients[token]
  })
}

http.listen( PORT, function() {
  console.log( 'listening on *:' + PORT );
  });

  