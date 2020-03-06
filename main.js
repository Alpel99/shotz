let game, user, width, height, cvn, fr, dt, socket;

function preload() {
    width = windowWidth - 20;
    height = windowHeight - 20;
    resizeCanvas();

    user = new User(); // get Serverdata
    game = new Game();

}

function setup() {
    fr = 60;
    frameRate(fr);
    cvn = createCanvas(width, height);
    socket = io.connect('https://alpel.ddns.net/shotz', {path: '/socket.io'});
    //figure out if this works with nodejs backend
    user.activeShip = new Ship1(width/2, height/2);
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

// function windowResized() {
//     let pxRatio = width/height;
//     console.log(pxRatio);
//     console.log(cvn);
//     // resizeCanvas(windowWidth-20, windowHeight-20);
//     resizeCanvas(windowWidth-20, (windowWidth/pxRatio)-20);
//     cvn.scale(1/pxRatio);
// }
