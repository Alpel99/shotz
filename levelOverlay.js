class LevelOverlay {
constructor() {
}

draw() {


//HP Bar
push();
rectMode(CENTER);
fill(0);
rect(width/2, 40, 300, 20, 5);
rectMode(CORNER);
fill(230,40,40);
rect(width/2 - 148, 32, map(game.screen.ship.PlayerHP, 0, 3 + game.screen.skillPointsHP, 0, 296), 16, 5);
pop();

//Text top left
push();
textSize(32);
fill(game.screen.color2);
textAlign(LEFT);
text("Score: " + game.screen.score, 20, 40);
text("Wave: " + game.screen.wave, 20, 80);
pop();

//Quickslot Bar4

push();
for(let i = 0; i < user.slots.length; i++) {
    user.slots[i].draw();
}

pop();
/*
push();
for(let i = 1; i < 9; i++) {
    fill(game.screen.color2);
    rect(i*60 + width/2 - 280, height - 100, 50, 50, 2);
    fill(game.screen.color1);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text(i, i*60 + width/2 - 280 + 48, height - 50);
}
pop();
*/
}

}

class Slot {
constructor(index, id, use) {
    this.index = index;
    this.id = id;
    this.use = use;
    this.active = false;
    this.counter = 0;
}

draw() {
    fill(game.screen.color2);
    rect(this.index*60 + width/2 - 320, height - 100, 50, 50, 2);

    if(this.active == true) {
        push();
        //stroke(255 - game.screen.color2.maxes.rgb[0], 255 - game.screen.color2.maxes.rgb[1], 255 - game.screen.color2.maxes.rgb[2]);
        stroke(game.screen.color1);
        strokeWeight(3);
        rect(this.index*60 + width/2 - 320, height - 100, 50, 50, 2);
        pop();
    }
    fill(game.screen.color1);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text(this.id, this.index*60 + width/2 - 320 + 48, height - 50);
}

activate() {

}

update() {
    this.counter--;
}

}