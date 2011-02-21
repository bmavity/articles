var http = require('http'),
    fs = require('fs');

var respondToHttpRequest = function(req, res) {
  var fileName = __dirname + req.url;
  fs.readFile(fileName, function(err, file) {
    if(err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('File not found.');
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
