let game,   // game-Objekt
    user,   // Nutzer-Objekt
    width,  // Breite des Canvas
    height, // Höhe des Canvas
    cvn,    // Referenz zum Canvas
    fr,     // festgelegte Framerate
    dt,     // delta time -
    img_item, //image for items
    data;   //userdata for local development
    //font;   // text font für das gesamte Spiel (es ist auch möglich mehrere zu laden, um spezifsche Texte hervorzuheben)

let socket;

function preload() {
    width = windowWidth - 20;
    height = windowHeight - 20;
    resizeCanvas();

    img_item = createGraphics(50, 50);
    user = new User();
    game = new Game();

    //setFont('assets/fonts/Oxanium/Oxanium-Medium.ttf');
}

function setup() {
    fr = 60;
    frameRate(fr);

    cvn = createCanvas(width, height);

    //user.activeShip = new Ship1(width/2, height/2);

    //sets up all basic socket interactions
    //uncomment for server usage || comment for local usage
    //sockets();
    //uncomment for local usage
    localSockets();
}

function draw() {
    cvn.clear();
    dt = deltaTime / (1000/fr);
    /*
    * >1 if framerate slower than fr (60 per sec)
    * <1 if framerate faster than fr
    * =1 if framerate = fr
    */
    game.draw();
    if (keyIsDown) game.controls('keyDown');

}

// Event Listeners
function keyPressed()   {game.controls('keyPress')};
function mousePressed() {game.controls('mousePress')};
function mouseClicked() {game.controls('mouseClick')};


function resizeCanvas() {
    if(width > 1901) {
        width = 1900;
    }
    if(height > 1061) {
        height = 1060;
    }
}

//Socketserver
function sockets() {
  socket = io.connect('http://141.5.110.254', {path: '/socket.io'});
        socket.on('loginsucceed',
                function(data) {
			game.screen.handleLogin(data);
        });

        socket.on('registrationsucceed',
                function(data) {
			game.screen.handleRegister(data);
        });

	socket.on('userdata',
		function(data) {
			user.loadData(data);
	});

  Game.prototype.sendData = function() {
  	var data = user.sendData();
  	socket.emit('userdatain', data);
    //save userdata to file with Ü
    //reload userdata with Ä (doesnt make any sense local)
  }
}

function localSockets() {
    game.screen.handleLogin(true);

    //load userdata in beginning
    //uglified userdata (download with ü and paste here to use different one)
    var data = {"skillpoints":10,"money":0,"id":0,"name":"test","items":{"ammo1":{"amount":10000,"keyCode":49},"ammo2":{"amount":0,"keyCode":50},"ammo3":{"amount":0,"keyCode":51},"ammo4":{"amount":0,"keyCode":52},"ammo5":{"amount":0,"keyCode":53},"ISH":{"amount":10,"keyCode":69},"EMP":{"amount":10,"keyCode":82},"MINE":{"amount":10,"keyCode":84},"SPC":{"keyCode":70},"DASH":{"keyCode":81}},"ships":{"Ship1":{"color":[255,255,255,255],"owned":true},"Ship2":{"color":[255,255,255,255],"owned":false},"Ship3":{"color":[255,255,255,255],"owned":false}},"experience":{"Level1":{"exp":0,"lvl":0},"Level2":{"exp":0,"lvl":0},"Level3":{"exp":0,"lvl":0},"Level4":{"exp":0,"lvl":0},"Level5":{"exp":0,"lvl":0}},"skillup":{"active":0,"Ship1":{"HP":0,"DMG":0,"SPD":0,"RNG":0,"BSPD":0,"FR":0,"SPC":0,"DASH":0,"LT":0,"EXP":0},"Ship2":{"HP":0,"DMG":0,"SPD":0,"RNG":0,"BSPD":0,"FR":0,"SPC":0,"DASH":0,"LT":0,"EXP":0}}}

  user.loadData(data);

  Game.prototype.sendData = function() {
  	var data = user.sendData();
    user.loadData(data);
    //save userdata to file with Ü
    //reload userdata with Ä (doesnt make any sense local)
  }
}

function setFont(str) {
  var font = loadFont(str);
  textFont(font);
}

// function windowResized() {
//     let pxRatio = width/height;
//     console.log(pxRatio);
//     console.log(cvn);
//     // resizeCanvas(windowWidth-20, windowHeight-20);
//     resizeCanvas(windowWidth-20, (windowWidth/pxRatio)-20);
//     cvn.scale(1/pxRatio);
// }
