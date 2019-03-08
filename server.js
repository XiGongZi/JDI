// file: index.js
let express = require('express');
let app = express();
let qs = require('querystring'); 
let $ = require('jquery');
app.use(express.static(__dirname + ''));
let server = require('http').createServer(app);
server.listen(80, function () {
  console.log('Server listening at port %d', 80);
});
