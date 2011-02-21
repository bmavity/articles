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
    var processedMessage = room.processMessage(sessionId, message);
    client.broadcast(processedMessage);
  });

  client.on('disconnect', function() {
    var removedUserMessage = room.removeUser(sessionId);
    socketServer.broadcast(removedUserMessage);
  });

  room.addUser(sessionId);
});

server.listen(8000);
