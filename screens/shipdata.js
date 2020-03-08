class Shipdata {
constructor(ship) {
    this.color1 = color(0);
    this.ship = ship;
    this.ship.pos.x = width/6;
    this.ship.pos.y = height/4;

    this.menuOverlay = new MenuOverlay();
    this.select = new Button(width/6, height/2, 200, "SELECT");
}

draw() {
    push();
    background(200);
    imageMode(CENTER);

    pop();
    push();
    translate(-this.ship.pos.x, -this.ship.pos.y);
    scale(2);
    this.ship.draw();
    pop();

    push();
    fill(0);
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(this.ship.name, width/6, height/4 + 100);
    pop();

    if(user.activeShip.constructor.name != this.ship.constructor.name) {
        this.select.draw();
    }

    this.data();


    push();
    textSize(20);
    fill(0);
    textAlign(CENTER, TOP);
    rectMode(CENTER);
    text(this.ship.specialText, width/6, height/1.5, width/6, height/8);
    pop();

    this.menuOverlay.draw();
}

data() {
    push();
    textAlign(LEFT, CENTER);
    textSize(35);
    fill(0);
    var i = 0;
    var d = 60;
    var b = 150;
    text("Maximum Hitpoints: " + Math.round(this.ship.PlayerHP), width/2, b + i*d);
    i++;
    text("Damage: " + Math.round(this.ship.PlayerDMG*10)/10, width/2, b + i*d);
    i++;
    text("Shot Delay: " + Math.round(this.ship.shotDelay*10)/10 + "ms", width/2, b + i*d);
    i++;
    text("Bulletspeed: " + Math.round(this.ship.bulletspeed*10)/10, width/2, b + i*d);
    i++;
    text("Range: " + Math.round(this.ship.PlayerRNG*10)/10, width/2, b + i*d);
    i++;
    text("Speed: " + Math.round(this.ship.PlayerSPD*10)/10, width/2, b + i*d);
    i++;
    text("Crash Damage: " + Math.round(this.ship.crashDamage), width/2, b + i*d);
    i++;
    text("Dash Range: " + Math.round(this.ship.PlayerDASH*10)/10, width/2, b + i*d);
    i++;
    text("Special Duration: " + Math.round(this.ship.specialTime*10)/10 + "s", width/2, b + i*d);
    i++;
    //BONUS LOOT
    //BONUS EXP
    pop();
}

back() {
    game.screen = new Ship_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
        if(this.select.hover() == true) {
            user.activeShip = this.ship;
        }
    } else if (mode === 'mouseClick') {
    }
}

mouseHover(x, y, size) {
    //Center from rectagnle that mouse hovers
    var hover = false;
    if(mouseX > x-size/2 && mouseX < x+size/2 && mouseY > y-size/2 && mouseY < y+size/2) {
        hover = true;
    }
    return hover;
}
}
