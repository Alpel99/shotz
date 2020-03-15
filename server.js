var express = require('express');

var app = express();

var server = app.listen(433, '127.0.0.1');


app.use(express.static(__dirname));

app.get('/node', function(req, res){
      res.send("Hello World!");
});


//var io = require('socket.io')(server, {path: '/socket.io'});
//var io = require('socket.io')(server, {origins: '*:*'}, {path: '/shotz'});
var io = require('socket.io')(server, {origins: '*:*'}, {path: '/socket.io'});

io.sockets.on('connection',
	function(socket) {
		console.log('new client ' + socket.id);

	socket.on('test',
      		function(data) {
			console.log(data);
		}
    	);
});

console.log("server is running");

