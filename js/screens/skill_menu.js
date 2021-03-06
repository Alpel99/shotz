class Skill_menu {
constructor(ship) {
    this.color1 = color(0);
    this.ship = ship;
    this.ship.pos.x = width/6;
    this.ship.pos.y = height/4;

    this.hp = createGraphics(100, 100);
    this.speed = createGraphics(100, 100);
    this.range = createGraphics(100, 100);
    this.damage = createGraphics(100, 100);
    this.special = createGraphics(100, 100);
    this.dash = createGraphics(100, 100);
    this.loot = createGraphics(100, 100);
    this.exp = createGraphics(100, 100);
    this.bulletspeed = createGraphics(100, 100);
    this.firerate = createGraphics(100, 100);
    this.drawSkillups();

    this.skillButton = new Button(width*0.7, height/2, 200, "Skillup");
    this.data = new Button(width-150, height-70, 200, "Shipdata");

    this.skillItems = [
    new SkillItem(this.hp, "HP"),
    new SkillItem(this.damage, "DMG"),
    new SkillItem(this.speed, "SPD"),
    new SkillItem(this.range, "RNG"),
    new SkillItem(this.bulletspeed, "BSPD"),
    new SkillItem(this.firerate, "FR"),
    new SkillItem(this.special, "SPC"),
    new SkillItem(this.dash, "DASH"),
    new SkillItem(this.loot, "LT"),
    new SkillItem(this.exp, "EXP")
    ];

    this.skillItems[user.skillup.active].active = true;

    this.menuOverlay = new MenuOverlay();
}

draw() {
    push();
    background(200);
    imageMode(CENTER);
    for(let i = 0; i < this.skillItems.length; i++) {
        image(this.skillItems[i].image, (width/(this.skillItems.length+1))*(i+1), height*0.7);
        push();
        fill(0);
        textStyle(BOLD);
        textSize(25);
        textAlign(CENTER, BOTTOM);
        text(user.skillup[this.ship.constructor.name][this.skillItems[i].use], (width/(this.skillItems.length+1))*(i+1), height*0.7 - 55)
        pop();
        if(this.skillItems[i].active == true) {
            push();
            stroke(255,0,0);
            strokeWeight(4);
            noFill();
            rectMode(CENTER);
            rect((width/(this.skillItems.length+1))*(i+1), height*0.7, 102, 102);
            pop();
            this.skillButton.draw();
            this.skillItems[i].showText();
        }
    }

    push();
    textSize(40);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Skillpoints: " + user.skillpoints, width*0.7, height/8);
    pop();

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

    this.data.draw();
    this.menuOverlay.draw();
}

back() {
    game.screen = new Ship_menu();
}

skillup() {
  if(game.local == true) {
    for(let i = 0; i < this.skillItems.length; i++) {
        if(this.skillItems[i].active == true) {
            user.skillup[this.ship.constructor.name][this.skillItems[i].use]++;
            user.skillpoints--;
            game.sendData();
        }
    }
  } else {
    for(let i = 0; i < this.skillItems.length; i++) {
        if(this.skillItems[i].active == true) {
          var skilled = this.skillItems[i];
        }
    }
    var data = {
      id: user.id,
      skillup: skilled
    }
    socket.emit('skillup', data);
    }
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
      if(this.skillButton.hover() == true) {
        if(user.skillpoints > 0) {
          this.skillup();
        }
      }
      if(this.data.hover() == true) {
        game.screen = new Shipdata(this.ship);
      }
    } else if (mode === 'mouseClick') {
        for(let i = 0; i < this.skillItems.length; i++) {
            if(this.mouseHover((width/(this.skillItems.length+1))*(i+1), height*0.7, 100) == true) {
                for(let j = 0; j < this.skillItems.length; j++) {
                    this.skillItems[j].active = false;
                }
                this.skillItems[i].active = true;
                user.skillup.active = i;
            }
        }
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

drawSkillups() {
    this.hp.background(0);
    this.hp.noStroke();
    this.hp.fill(25, 133, 54);
    this.hp.translate(50,50);
    this.hp.rect(-10, -40, 20, 80, 5);
    this.hp.rect(-40, -10, 80, 20, 5);

    this.firerate.background(0);
    this.firerate.stroke(255);
    this.firerate.strokeWeight(2);
    for(let i = 0; i < 50; i++) {
        var a = random(0,100);
        var b = random(0,100);
        this.firerate.line(a, b, a + 10, b);
    }


    this.speed.background(0);
    this.speed.fill(128);
    this.speed.arc(50,60,80,80,PI,0);
    this.speed.fill(0);
    this.speed.ellipse(50,60,60,60);
    this.speed.fill(255,0,0);
    this.speed.triangle(45,60,55,60,75,30);


    this.range.background(0);
    this.range.stroke(240,0,0);
    this.range.noFill();
    this.range.strokeWeight(3);
    this.range.translate(50,50);
    this.range.ellipse(0,0,80);
    this.range.line(-40,0,-35,0);
    this.range.line(40,0,35,0);
    this.range.line(0,-40,0,-35);
    this.range.line(0,40,0,35);
    this.range.strokeWeight(2);
    this.range.ellipse(0,0,40);
    this.range.noStroke();
    this.range.fill(255,0,0);
    this.range.ellipse(0,0,5);


    this.damage.background(0);
    this.damage.fill(255,100,0);
    this.damage.noStroke();
    this.damage.triangle(40,80,40,20,60,80);
    this.damage.triangle(40,80,10,40,60,80);
    this.damage.triangle(45,80,17,32,60,80);
    this.damage.triangle(40,80,79,36,60,80);
    this.damage.triangle(50,80,60,27,60,80);
    this.damage.triangle(50,80,85,42,65,80);


    this.special.background(0);
    this.special.fill(0, 255, 255)
    this.special.textSize(80);
    this.special.textAlign(CENTER, CENTER);
    this.special.text("S", 50, 60);


    this.dash.push();
    this.dash.background(0);
    this.dash.scale(2);
    this.dash.translate(0, 0);
    this.dash.stroke(255);
    this.dash.strokeWeight(5);
    this.dash.line(13,8,13,42);
    this.dash.line(19,15,19,35);
    this.dash.strokeWeight(4);
    this.dash.line(24,18,24,32);
    this.dash.line(29,22,29,28);
    this.dash.strokeWeight(3);
    this.dash.line(33,24,33,26);
    this.dash.noStroke();
    this.dash.fill(255,0,0);
    this.dash.triangle(36,18,36,32,43,25);
    this.dash.pop();


    this.loot.background(0);
    this.loot.push();
    this.loot.stroke(125, 71, 9);
    this.loot.strokeWeight(3);
    this.loot.fill(130, 80, 15);
    this.loot.rect(8,15,84,35);
    this.loot.pop();
    this.loot.fill(255, 255, 0);
    for(let i = 0; i < 50; i++) {
        this.loot.ellipse(random(15,85), random(45,50), random(5,8));
    }
    this.loot.fill(100, 50, 9);
    this.loot.rect(10, 50, 80, 45);
    this.loot.fill(60);
    this.loot.rect(40,55,20,10);
    this.loot.rect(42,14,16,6);


    this.bulletspeed.background(0);
    this.bulletspeed.fill(255);
    this.bulletspeed.rect(40,40,40,20,10)
    this.bulletspeed.fill(0);
    this.bulletspeed.rect(40,40,15,20);
    this.bulletspeed.stroke(255);
    this.bulletspeed.strokeWeight(2);
    this.bulletspeed.line(35,47,55,47);
    this.bulletspeed.line(15,57,40,57);
    this.bulletspeed.line(32,42,50,42);
    this.bulletspeed.line(10,47,25,47);
    this.bulletspeed.line(30,53,52,53);


    this.exp.background(0);
    this.exp.push();
    this.exp.rotate(PI*0.15);
    this.exp.rect(50,20,20,40);
    this.exp.fill(0);
    this.exp.triangle(50,60,70,60,60,50);
    this.exp.pop();
    this.exp.push();
    this.exp.rotate(-PI*0.1);
    this.exp.rect(30,65,20,30);
    this.exp.fill(0);
    this.exp.triangle(30,95,50,95,40,85);
    this.exp.pop();
    this.exp.fill(180);
    this.exp.ellipse(50,40,50);
    this.exp.fill(255);
    this.exp.ellipse(50,40,35);
}

}

class SkillItem {
constructor(img, use) {
    this.image = img;
    this.use = use;
    this.active = false;
}

showText() {
    textSize(30);
    fill(0);
    textAlign(CENTER);
    if(this.active == true) {
        switch (this.use) {
        case "HP":
            text("The Hitpoints of the ship will be increased.", width*0.7, height/4);
            break;
        case "DMG":
            text("The Damage of the ship will be increased.", width*0.7, height/4);
            break;
        case "SPD":
            text("The Speed of the ship will be increased.", width*0.7, height/4);
            break;
        case "RNG":
            text("The Range of the ship will be increased.", width*0.7, height/4);
            break;
        case "BSPD":
            text("The speed of the bullets of the ship will be increased.", width*0.7, height/4);
            break;
        case "DASH":
            text("The dash of the ship will be increased.\nFor more Information please look on the stats site.", width*0.7, height/4);
            break;
        case "FR":
            text("The amount of bullets per seconds of the ship will be increased.", width*0.7, height/4);
            break;
        case "SPC":
            text("The special ability of the ship will be upgraded/made accessable.\nFor more Information please look on the stats site.", width*0.7, height/4);
            break;
        case "LT":
            text("The Loot from the ship will be increased in every Level.", width*0.7, height/4);
            break;
        case "EXP":
            text("The EXP from every level with this ship will be increased.", width*0.7, height/4);
            break;
        }
    }
}
}
