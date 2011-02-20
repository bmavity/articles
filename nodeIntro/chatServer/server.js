var connect = require('connect'),
    io = require('socket.io');

var server = connect.createServer(
  connect.staticProvider(__dirname + '/public')
);

var socketServer = io.listen(server);

socketServer.on('connection', function(client) {
  client.on('message', function(msg) {
    client.broadcast({
      nick: client.sessionId,
      text: msg
    });
  });

  client.on('disconnect', function() {
    socketServer.broadcast({
      nick: client.sessionId,
      text: 'was disconnected.'
    });
  });
});

server.listen(8000);
