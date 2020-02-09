class LevelOverlay {
constructor() {
}

draw() {
    // HP Bar
    push();
    rectMode(CENTER);
    fill(0);
    rect(width/2, 40, 300, 20, 5);
    rectMode(CORNER);
    fill(230,40,40);
    rect(width/2 - 148, 32, map(game.screen.ship.PlayerHP, 0, 3 + game.screen.skillPointsHP, 0, 296), 16, 5);
    pop();

    // Text top left
    push();
    textSize(32);
    fill(game.screen.color2);
    textAlign(LEFT);
    text("Score: " + game.screen.score, 20, 40);
    text("Wave: " + game.screen.wave, 20, 80);
    pop();

    // Quickslot Bar
    push();
    for(let i = 0; i < user.slots.length; i++) {
        user.slots[i].draw();
    }
    pop();
}

controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode === 49) { // 1
            for(let i = 0; i < 6; i++) {
                user.slots[i].active = false;
                if(user.slots[i].use === "ammo1") {
                    user.slots[i].active = true;
                }
            }
            game.screen.ammo = user.ammo[0];
        }
        if (keyCode == 50) { // 2
            for(let i = 0; i < 6; i++) {
                user.slots[i].active = false;
                if(user.slots[i].use === "ammo2") {
                    user.slots[i].active = true;
                }
            }
            game.screen.ammo = user.ammo[1];
        }
        if(keyCode === 51) { // 3
            for(let i = 0; i < 6; i++) {
                user.slots[i].active = false;
                if(user.slots[i].use === "ammo3") {
                    user.slots[i].active = true;
                }
            }
            game.screen.ammo = user.ammo[2];
        }
        if (keyCode === 52) { // 4
            for(let i = 0; i < 6; i++) {
                user.slots[i].active = false;
                if(user.slots[i].use === "ammo4") {
                    user.slots[i].active = true;
                }
            }
            game.screen.ammo = user.ammo[3];
        }
        if (keyCode === 53) { // 5
            for(let i = 0; i < 6; i++) {
                user.slots[i].active = false;
                if(user.slots[i].use === "ammoX") {
                    user.slots[i].active = true;
                }
            }
            game.screen.ammo = user.ammo[4];
        }
        if (keyCode === 69) { // E
            if(user.slots[5].counter == 0 && user.slots[5].activeCounter == -1) {
                user.slots[5].activate();
            }
        }
        if (keyCode === 82) { // R
            if(user.slots[6].counter == 0 && user.slots[6].activeCounter == -1) {
                user.slots[6].activate();
            }
        }
        if (keyCode === 84) { // T
            if(user.slots[7].counter == 0 && user.slots[7].activeCounter == -1) {
                user.slots[7].activate();
            }
        }
        if(keyCode === 70) { // F
            if(user.slots[8].counter == 0 && user.slots[8].activeCounter == -1) {
                user.slots[8].activate();
            }
        }
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    }
}
}

class Slot {
constructor(index, id, use, at, cdt) {
    //index(numbers), id(key), use(usage), activetime(seconds), cooldown(seconds)
    this.index = index;
    this.id = id;
    this.use = use;
    this.active = false;
    this.activeTime = at*60;
    this.cooldownTime = cdt*60;
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
        var a = map(this.counter, 0, this.cooldownTime, -PI/2, PI*1.5);
        push();
            fill(game.screen.color3);
            arc(this.x + 25, this.y + 25, 45, 45, -PI/2, a);
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

        break;
      case "MINE":

        break;
      case "SMB":

        break;
      case "SPECIAL":

        break;
      default:
        break;
    }
    this.activeCounter = this.activeTime;
}

update() {
    if(this.counter > 0) {
        this.counter--;
    }
    if(this.activeCounter > 0) {
        this.activeCounter--;
    } else {
        if(this.activeCounter == 0) {
            this.counter = this.cooldownTime;
            this.activeCounter = -1;
        }
    }
}
}