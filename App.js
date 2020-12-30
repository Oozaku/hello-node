const http = require('http');
const fs = require('fs');
const ServerWorker = require('./Routes');

const myServer = http.createServer(ServerWorker);

myServer.listen(3000);