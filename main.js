let game;
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
let ship1_vectors = [];

function preload() {
//oder in prep
user = new User(); //get Serverdata
menuOverlay = new MenuOverlay();
//pictures();

//tryouts
img_ship1 = createGraphics(150, 150);

vectorsShip1();
}

function setup() {
frameRate(60);
createCanvas(width, height);
game = new Game();

}

function draw() {
game.draw();
if(game.screen.name.search("Level") == -1) {
    menuOverlay.draw();
}
}
