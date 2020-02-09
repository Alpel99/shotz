let game, user, width, height, cvn;

function preload() {
    width = windowWidth - 20;
    height = windowHeight - 20;
    resizeCanvas();

    user = new User(); // get Serverdata
    game = new Game();
}

function setup() {
    frameRate(60);
    cvn = createCanvas(width, height);
}

function draw() {
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
