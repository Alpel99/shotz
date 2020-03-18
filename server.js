var express = require('express');
var fs = require('fs');
var bcrypt = require('bcrypt');

var app = express();
var server = app.listen(3000, '127.0.0.1');
app.use(express.static(__dirname));

var logindata = JSON.parse(fs.readFileSync('/data/logindata.json', {flags:'r'}));
var connections = {};

var io = require('socket.io')(server, {path: '/socket.io'});

io.sockets.on('connection',
	function(socket) {
//		console.log('new client ' + socket.id);
		connections[socket.id] = {socket: socket.id};

	socket.on('login',
      		function(data) {
			var fail = true;
			for(let i = 0; i < logindata.length; i++) {
				if(logindata[i].username == data.username) {
					if(bcrypt.compareSync(data.password, logindata[i].password) == true) {
						//authentication succeeded
						connections[socket.id].id = logindata[i].id;
						//find & send user data
						userdata = JSON.parse(fs.readFileSync('/data/userdata/' + logindata[i].id + '.json', {flags:'r'}));
						userdata.id = logindata[i].id;
						userdata.name = logindata[i].username;
						io.to(socket.id).emit('userdata', userdata);
                                                io.to(socket.id).emit('loginsucceed', true);
						fail = false;
					}
				}
			}
			if(fail == true) {
				io.to(socket.id).emit('loginsucceed', false);
			}
		}),

	socket.on('register',
		function(data) {
			var error = false;
			for(let i = 0; i < logindata.length; i++) {
				if(logindata[i].username == data.username) {
					error = true;
					io.to(socket.id).emit('registrationsucceed', false);
				}
			}
			if(error == false) {
				data.id = 10000 + logindata.length;
				data.password = bcrypt.hashSync(data.password, 3 )
				console.log(data);
				logindata.push(data);
				fs.writeFileSync('/data/logindata.json', JSON.stringify(logindata), {flags: 'a'});
				fs.copyFileSync('/data/userdata/00000.json', '/data/userdata/'+ data.id +'.json');
				io.to(socket.id).emit('registrationsucceed', true);
			}
		}
    	);

	socket.on('disconnect', function() {
		delete connections[socket.id];
	});

});


console.log("server is running");

