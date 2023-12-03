// This example just opens an HTTP server on your computer (at localhost:8080) and gives "Hello World" page to anyone who visits that address

 var http = require('http');

 http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Hello World!');
 }).listen(8080);
