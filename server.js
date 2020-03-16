var express = require('express');
var fs = require('fs');

var app = express();
var server = app.listen(3000, '127.0.0.1');
app.use(express.static(__dirname));

var logindata = JSON.parse(fs.readFileSync('/data/logindata.json', {flags:'a'}));


var io = require('socket.io')(server, {path: '/socket.io'});

io.sockets.on('connection',
	function(socket) {
		console.log('new client ' + socket.id);

	socket.on('login',
      		function(data) {
			console.log(data);
		}),
	socket.on('register',
		function(data) {
			console.log("register");
			console.log(data);
		}
    	);

});


console.log("server is running");

