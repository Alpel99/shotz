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
    rect(width/2 - 148, 32, map(game.screen.ship.PlayerHP, 0, 3 + user.skillup.Ship1.HP, 0, 296), 16, 5);
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
    for(let i = 0; i < user.slots.length; i++) {
        if(keyCode == user.slots[i].keyCode) {
            user.slots[i].activate();
        }
    }/*
        if (keyCode === Digit1) { // 1
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
        }*/
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    }
}
}

class Slot {
constructor(index, id, keyCode, use, at, cdt) {
    //index(numbers), id(key), use(usage), activetime(seconds), cooldown(seconds)
    this.index = index;
    this.id = id;
    this.use = use;
    this.active = false;
    this.activeTime = at*60;
    this.cooldownTime = cdt*60;
    this.counter = 0;
    this.activeCounter = -1;
    this.keyCode = keyCode;
}

draw() {
    this.x = this.index*60 + width/2 - 320; //corner
    this.y = height - 100; //corner
    fill(game.screen.color2);
    rect(this.x, this.y, 50, 50, 2);

    push();
    imageMode(CORNER);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    switch (this.use) {
        case "ammo1":
            user.ammo[0].draw();
            image(img_item, this.x, this.y);
            text(user.ammo[0].amount, this.x + 48, this.y - 2)
            break;
        case "ammo2":
            user.ammo[1].draw();
            image(img_item, this.x, this.y);
            text(user.ammo[1].amount, this.x + 48, this.y - 2)
            break;
        case "ammo3":
            user.ammo[2].draw();
            image(img_item, this.x, this.y);
            text(user.ammo[2].amount, this.x + 48, this.y - 2)
            break;
        case "ammo4":
            user.ammo[3].draw();
            image(img_item, this.x, this.y);
            text(user.ammo[3].amount, this.x + 48, this.y - 2)
            break;
        case "ammoX":
            user.ammo[4].draw();
            image(img_item, this.x, this.y);
            text(user.ammo[4].amount, this.x + 48, this.y - 2)
            break;
        case "ISH":
            user.ISH.draw();
            image(img_item, this.x, this.y);
            text(user.ISH.amount, this.x + 48, this.y - 2)
            break;
        case "MINE":
            user.MINE.draw();
            image(img_item, this.x, this.y);
            text(user.MINE.amount, this.x + 48, this.y - 2)
            break;
        case "EMP":
            user.EMP.draw();
            image(img_item, this.x, this.y);
            text(user.EMP.amount, this.x + 48, this.y - 2)
            break;
        case "SPECIAL":
            push();
            fill(0, 255, 255)
            textSize(40);
            textAlign(CENTER, CENTER);
            text("S", this.x + 25, this.y + 30);
            pop();
            break;
        default:
            break;
    }
    pop();

    if(this.active == true || this.activeCounter > 0) {
        //active
        push();
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
        case "ammo1":
            game.screen.ammo = user.ammo[0]
            for(let i = 0; i < user.slots.length; i++) {
                user.slots[i].active = false;
            }
            this.active = true;
            break;
        case "ammo2":
            game.screen.ammo = user.ammo[1];
            for(let i = 0; i < user.slots.length; i++) {
                user.slots[i].active = false;
            }
            this.active = true;
            break;
        case "ammo3":
            game.screen.ammo = user.ammo[2];
            for(let i = 0; i < user.slots.length; i++) {
                user.slots[i].active = false;
            }
            this.active = true;
            break;
        case "ammo4":
            game.screen.ammo = user.ammo[3];
            for(let i = 0; i < user.slots.length; i++) {
                user.slots[i].active = false;
            }
            this.active = true;
            break;
        case "ammoX":
            game.screen.ammo = user.ammo[4];
            for(let i = 0; i < user.slots.length; i++) {
                user.slots[i].active = false;
            }
            this.active = true;
            break;
        case "ISH":
            //ship für (2) Sekunden unverwundbar, coole anmiation mit kreis rings rum -> wie stern supermario (killt natürlich bosse etc nicht)
            break;
        case "MINE":
            //mine gelegt, wenn wer rein fliegt: damage
            break;
        case "EMP":
            //schubst gegner weg/hebt chase auf etc
            break;
        case "SPECIAL":
            //game.screen.ship.special();
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
