var http = require('http'),
    io = require('socket.io');

var server = http.createServer();
var socketListener = io.listen(server);

socketListener.on('connection', function(client) {
  console.log('a client connected');
});

server.listen(8000);