var express = require('express');
var fs = require('fs');
var bcrypt = require('bcrypt');

var app = express();
var server = app.listen(3000, '127.0.0.1');
app.use(express.static(__dirname));

var logindata = JSON.parse(fs.readFileSync('/data/logindata.json', {flags:'a'}));

var io = require('socket.io')(server, {path: '/socket.io'});

io.sockets.on('connection',
	function(socket) {
//		console.log('new client ' + socket.id);

	socket.on('login',
      		function(data) {
			for(let i = 0; i < logindata.length; i++) {
				if(logindata[i].username == data.username) {
					if(bcrypt.compareSync(data.password, logindata[i].password) == true) {
						//authentication succeeded
                                                io.sockets.emit('loginsucceed', true);
					} else {
						io.sockets.emit('loginsucceed', false);
					}
				}
			}
		}),

	socket.on('register',
		function(data) {
			var error = false;
			for(let i = 0; i < logindata.length; i++) {
				if(logindata[i].username == data.username) {
					error = true;
				}
			}
			if(error == false) {
				data.id = 10000 + logindata.length;
				data.password = bcrypt.hashSync(data.password, 3 )
				console.log(data);
				logindata.push(data);
				fs.writeFileSync('/data/logindata.json', JSON.stringify(logindata));
			}
		}
    	);

});


console.log("server is running");

