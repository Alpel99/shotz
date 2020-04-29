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
						var userdata = JSON.parse(fs.readFileSync('/data/userdata/' + logindata[i].id + '.json', {flags:'r'}));
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

	socket.on('userdatain',
		function(data) {
			fs.writeFileSync('/data/userdata/'+connections[socket.id].id+'.json', JSON.stringify(data), {flags: 'w'});
			console.log(data);
		}
	);

	socket.on('startLevel',
		function(data) {
			if(data.id = connections[socket.id].id) {
				connections[socket.id].level.active = true;
				connections[socket.id].level.score = 0;
				connections[socket.id].level.wave = 0;
				connections[socket.id].level.speed = 1;
				connections[socket.id].level.hp = data.hp;
				connections[socket.id].level.ammo = data.ammo;
			}
		}
	);

	socket.on('enemyKill',
		function(data) {
			if(data.id = connections[socket.id].id) {
				if(connections[socket.id].level.active == true) {
					if(data.ammo == connections[socket.id].level.ammo) {
						connections[socket.id].level.hackalert++;
					}
					if(connections[socket.id].level.hackalert > 5) {
						//simple kick -> no logout yet
						connections[socket.id].id = 0;
					}
					if(connections[socket.id].level.score > 50) {
						connections[socket.id].level.wave++;
						connections[socket.id].level.score = 0;
						connections[socket.id].level.speed++;
					}
					var score = {
						wave: connections[socket.id].level.wave,
						score: connections[socket.id].level.score,
						speed: connections[socket.id].level.speed
					}
					io.to(socket.id).emit('score', score);
				}
			} else {
				//error
				//io.to(socket.id).emit('error', error);
			}
		}
	);

	socket.on('damage',
		function(data) {
			if(data.id = connections[socket.id].id) {
				if(connections[socket.id].level.active == true) {
					if(connections[socket.id].level.hp - data.damage > 0) {
						connections[socket.id].level.hp -= data.damage;
					} else {
						connections[socket.id].level.active = false;
						var userdata = JSON.parse(fs.readFileSync('/data/userdata/' + data.id + '.json', {flags:'r'}));

						if(data.level == 'level1') {
							var exp = connections[socket.id].level.wave*75 + connections[socket.id].level.score*5;
							var coinz = Math.floor(connections[socket.id].level.wave/2);
							var ammo2 = Math.floor(connections[socket.id].level.wave);
							userdata.money += coinz;
							userdata.items.ammo2.amount += ammo2;
							var str1 = "Experience: " + exp;
					    var str2 = "Coinz: " + coinz;
					    var str3 = "x2 Ammo: " + ammo2;
					    var str4 = "";
						}
						userdata.experience.Level1.exp += exp;
						while(userdata.experience.Level1.exp > user.experience.Level1.lvl*1000) {
				        userdata.experience.Level1.exp -= user.experience.Level1.lvl*1000;
				        userdata.experience.Level1.lvl++;
				        userdata.skillpoints++;
				    }

						fs.writeFileSync('/data/userdata/' + data.id + '.json', JSON.stringify(userdata), {flags: 'w'});

						var loot = {
							l1: str1,
							l2: str2,
							l3: str3,
							l4: str4,
							lvl: data.level
						}
						io.to(socket.id).emit('gameover', loot);
						io.to(socket.id).emit('userdata', userdata);
					}
				}
			}
		}
	);

	socket.on('getScore',
		function(data) {
			if(data.id = connections[socket.id].id) {
				if(connections[socket.id].level.active == true) {
					var score = {
						wave: connections[socket.id].level.wave,
						score: connections[socket.id].level.score,
						speed: connections[socket.id].level.speed
					}
					io.to(socket.id).emit('score', score);
				}
			} else {
				//error
				//io.to(socket.id).emit('error', error);
			}
		}
	);

	socket.on('skillup',
		function(data) {
			//wasauchimmer
			console.log("skillup" + data);
			if(data.id == connections[socket.id].id) {
				var userdata = JSON.parse(fs.readFileSync('/data/userdata/' + data.id + '.json', {flags:'r'}));
				if(userdata.skillpoints > 1) {
					userdata.skillpoints -= 1;
					userdata[data.skillup] += 1;
				}
				fs.writeFileSync('/data/userdata/' + data.id + '.json', JSON.stringify(userdata), {flags: 'w'});
				io.to(socket.id).emit('userdata', userdata);
			} else {
				//error
				//io.to(socket.id).emit('error', error);
			}

		}
	);

	socket.on('disconnect', function() {
		delete connections[socket.id];
	});

});


console.log("server is running");
