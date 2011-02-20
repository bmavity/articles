var connect = require('connect'),
    io = require('socket.io'),
    room = require('./chatRoom');

var server = connect.createServer(
  connect.staticProvider(__dirname + '/public')
);

var socketServer = io.listen(server);

socketServer.on('connection', function(client) {
  var sessionId = client.sessionId;

  client.on('message', function(message) {
    client.broadcast(room.processMessage(sessionId, message));
  });

  client.on('disconnect', function() {
    socketServer.broadcast(room.removeUser(sessionId));
  });

  room.addUser(sessionId);
});

server.listen(8000);
