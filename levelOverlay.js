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
}

}

class Slot {
constructor(index, id, use) {
    this.index = index;
    this.id = id;
    this.use = use;
    this.active = false;
    this.counter = 0;
    this.activeCounter = -1;
}

draw() {
    this.x = this.index*60 + width/2 - 320; //corner
    this.y = height - 100; //corner
    fill(game.screen.color2);
    rect(this.x, this.y, 50, 50, 2);



    push();
    imageMode(CORNER);
    switch (this.use) {
      case "ammo1":
        user.ammo[0].draw();
        image(img_ammo, this.x, this.y);
        break;
      case "ammo2":
        user.ammo[1].draw();
        image(img_ammo, this.x, this.y);
        break;
      case "ammo3":
        user.ammo[2].draw();
        image(img_ammo, this.x, this.y);
        break;
      case "ammo4":
        user.ammo[3].draw();
        image(img_ammo, this.x, this.y);
        break;
      case "ammoX":
        user.ammo[4].draw();
        image(img_ammo, this.x, this.y);
        break;
      case "ISH":
        break;
      case "MINE":
        break;
      case "SMB":
        break;
      case "SPECIAL":
        break;
      default:
        //
        break;
    }
    pop();

    if(this.active == true || this.activeCounter > 0) {
        //active
        push();
        //stroke(255 - game.screen.color2.maxes.rgb[0], 255 - game.screen.color2.maxes.rgb[1], 255 - game.screen.color2.maxes.rgb[2]);
        stroke(game.screen.color1);
        strokeWeight(3);
        noFill();
        rect(this.x, this.y, 50, 50, 2);
        pop();
    }

    if(this.counter > 0) {
        //cooldown
        var a = map(this.counter, 0, this.cd*60, -PI/2, PI*1.5);
        push();
            fill(game.screen.color3);
            arc(this.x + 25, this.y + 25, 40, 40, -PI/2, a);
        pop();
    }

    fill(game.screen.color1);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text(this.id, this.x + 48, this.y + 50);
}

activate() {
switch (this.use) {
  case "ISH":
    this.activeCounter = 120;
    break;
  case "MINE":
    this.activeCounter = 15;
    break;
  case "SMB":
    this.activeCounter = 150;
    break;
  case "SPECIAL":
    this.activeCounter = 180;
    break;
  default:
    //
    break;
}
}

update() {
if(this.counter > 0) {
    this.counter--;
}
if(this.activeCounter > 0) {
    this.activeCounter--;
} else {
    if(this.activeCounter == 0) {
        switch (this.use) {
          case "ISH":
            this.cd = 30;
            this.counter = this.cd*60;
            break;
          case "MINE":
            this.cd = 15;
            this.counter = this.cd*60;
            break;
          case "SMB":
            this.cd = 30;
            this.counter = this.cd*60;
            break;
          case "SPECIAL":
            this.cd = 60;
            this.counter = this.cd*60;
            break;
          default:
            //
            break;
        }
        this.activeCounter = -1;
    }
}
}

}