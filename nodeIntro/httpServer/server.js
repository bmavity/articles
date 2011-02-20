var http = require('http'),
    fs = require('fs');

var respondToHttpRequest = function(req, res) {
  var fileName = __dirname + '/flyingMonkeys.html';
  fs.readFile(fileName, function(err, file) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('The error has occurred.');
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(file);
      res.end();
    }
  });
};

var server = http.createServer(respondToHttpRequest);
server.listen(8000);
