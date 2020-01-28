let game;
let ship1_vectors = [];
let width
let height

function preload() {
user = new User(); //get Serverdata

width = window.innerWidth - 20;
height = window.innerHeight - 20;
if(width > 1901) {
    width = 1900;
}
if(height > 1061) {
    height = 1060;
}
//pictures();

//tryouts
img_ship1 = createGraphics(150, 150);

vectorsShip1();
}

function setup() {
frameRate(60);
createCanvas(width, height);
game = new Game();
menuOverlay = new MenuOverlay();
levelOverlay = new LevelOverlay();
}

function draw() {
game.draw();
try {
if(game.screen.name.search("Level") == -1) {
    menuOverlay.draw();
}
if(game.screen.name.search("Level") > -1 && (game.screen.mode == "run" || game.screen.mode == "pause")) {
    levelOverlay.draw();
}
} catch(error){}
}
