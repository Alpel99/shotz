let game;
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
let ship1_vectors = [];

function preload() {
//oder in prep
ammo1 = new Ammo(1, 100, color(255));
ammo2 = new Ammo(2, 300, color(120, 20 ,20));
ammo3 = new Ammo(3, 10, color(0,255,0));
ammo4 = new Ammo(4, 1000, color(0));
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
