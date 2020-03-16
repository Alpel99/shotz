let game,   // game-Objekt
    user,   // Nutzer-Objekt
    width,  // Breite des Canvas
    height, // Höhe des Canvas
    cvn,    // Referenz zum Canvas
    fr,     // festgelegte Framerate
    dt,     // delta time -
    font;   // text font für das gesamte Spiel (es ist auch möglich mehrere zu laden, um spezifsche Texte hervorzuheben)

let socket;

function preload() {
    width = windowWidth - 20;
    height = windowHeight - 20;
    resizeCanvas();

    user = new User(); // get Serverdata
    game = new Game();

    font = loadFont('assets/fonts/Oxanium/Oxanium-Medium.ttf');
}

function setup() {
    fr = 60;
    frameRate(fr);
    textFont(font);
    cvn = createCanvas(width, height);
    socket = io.connect('http://141.5.110.254', {path: '/socket.io'});
    //figure out if this works with nodejs backend
    user.activeShip = new Ship1(width/2, height/2);
	sockets();
}

function draw() {
//    socket.emit('test',dt);
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

function sockets() {
        socket.on('loginsucceed',
                function(data) {
			console.log("login");
                        console.log(data);
        });

        socket.on('registrationfail',
                function(data) {
			console.log("registration")
                        console.log(data);
        });

}
// function windowResized() {
//     let pxRatio = width/height;
//     console.log(pxRatio);
//     console.log(cvn);
//     // resizeCanvas(windowWidth-20, windowHeight-20);
//     resizeCanvas(windowWidth-20, (windowWidth/pxRatio)-20);
//     cvn.scale(1/pxRatio);
// }
