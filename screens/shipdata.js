class Shipdata {
constructor(ship) {
    this.color1 = color(0);
    this.ship = ship;
    this.ship.x = width/6;
    this.ship.y = height/4;

    this.menuOverlay = new MenuOverlay();
    this.selectButton = createGraphics(200,75);
    this.selectButtonRed = createGraphics(200,75);
    this.drawButton()
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

    if(user.activeShip.constructor.name != this.ship.constructor.name) {
        push();
        imageMode(CENTER);
        if(mouseX > width/6 - 100 && mouseX < width/6 + 100 && mouseY > height/2 - 38 && mouseY < height/2 + 38) {
            image(this.selectButtonRed, width/6, height/2);
        } else {
            image(this.selectButton, width/6, height/2);
        }
        pop();
    }


    this.data();


    push();
    textSize(20);
    fill(0);
    textAlign(CENTER, TOP);
    text(this.ship.specialText, width/6, height/1.5);
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
        if(mouseX > width/6 - 100 && mouseX < width/6 + 100 && mouseY > height/2 - 38 && mouseY < height/2 + 38) {
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

drawButton() {
  this.selectButton.background(0);
  this.selectButton.fill(128);
  this.selectButton.rect(10, 10, this.selectButton.width - 20, this.selectButton.height - 20);
  this.selectButton.fill(0);
  this.selectButton.textSize(40);
  this.selectButton.textAlign(CENTER, CENTER);
  this.selectButton.text("SELECT", this.selectButton.width/2, this.selectButton.height/2);


  this.selectButtonRed.background(255);
  this.selectButtonRed.fill(255,0,0);
  this.selectButtonRed.rect(10, 10, this.selectButtonRed.width - 20, this.selectButtonRed.height - 20);
  this.selectButtonRed.fill(0);
  this.selectButtonRed.textSize(40);
  this.selectButtonRed.textAlign(CENTER, CENTER);
  this.selectButtonRed.text("SELECT", this.selectButtonRed.width/2, this.selectButtonRed.height/2);
}

}
