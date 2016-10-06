const http = require('http');

http.createServer((req, res) => {
    res.end('coucou')
}).listen(8080);

