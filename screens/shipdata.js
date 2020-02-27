class Shipdata {
constructor(ship) {
    this.color1 = color(0);
    this.ship = ship;
    this.ship.x = width/6;
    this.ship.y = height/4;

    this.menuOverlay = new MenuOverlay();
}

draw() {
    push();
    background(200);
    imageMode(CENTER);

    pop();
    push();
    translate(-this.ship.x, -this.ship.y);
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

    this.data();
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
    pop();

    /*
    this.baseHP = 3;
    this.maxHP = Math.round(this.baseHP + this.getSkillIncrease(user.skillup[this.constructor.name].HP)/2);
    this.crashDamage = 300;
    this.shotDelay = 20 - this.getSkillIncrease(user.skillup[this.constructor.name].FR)*5;
    this.bulletspeed = 0.8 + this.getSkillIncrease(user.skillup[this.constructor.name].BSPD)*0.1;
    this.PlayerHP = this.maxHP;
    this.PlayerDMG = 2 + this.getSkillIncrease(user.skillup[this.constructor.name].DMG);
    this.PlayerSPD = 8 + this.getSkillIncrease(user.skillup[this.constructor.name].SPD)/1.5;
    this.PlayerRNG = 400 + this.getSkillIncrease(user.skillup[this.constructor.name].RNG)*75;
    this.PlayerDASH = 20 + this.getSkillIncrease(user.skillup[this.constructor.name].DASH)*5;
    this.specialTime = 5;

    this.color = c;


    */
}

back() {
    game.screen = new Ship_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
        if(mouseX > width*0.7 - 100 && mouseX < width*0.7 + 100 && mouseY > height/2 - 88 && mouseY < height/2 - 12) {
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