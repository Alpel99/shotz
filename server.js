var express = require('express');

var app = express();

var server = app.listen(3000, '127.0.0.1');


app.use(express.static(__dirname));

app.get('/node', function(req, res){
      res.send("Hello World!");
});


var io = require('socket.io')(server, {path: '/socket.io'});

io.sockets.on('connection',
	function(socket) {
		console.log('new client ' + socket.id);

});
console.log("server is running");

