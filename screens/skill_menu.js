class Skill_menu {
constructor(ship) {
    this.ship = ship;
    this.ship.x = width/6;
    this.ship.y = height/4;
    this.hp = createGraphics(100, 100);
    this.hp.active = true;
    this.speed = createGraphics(100, 100);
    this.range = createGraphics(100, 100);
    this.damage = createGraphics(100, 100);
    this.special = createGraphics(100, 100);
    this.loot = createGraphics(100, 100);
    this.exp = createGraphics(100, 100);
    this.bulletspeed = createGraphics(100, 100);
    this.skillups = 9;
    this.drawSkillups();
}

draw() {
    push();
    background(200);
    imageMode(CENTER);
    image(this.hp, width/this.skillups, height*0.7);
    image(this.damage, (width/this.skillups)*2, height*0.7);
    image(this.speed, (width/this.skillups)*3, height*0.7);
    image(this.range, (width/this.skillups)*4, height*0.7);
    image(this.bulletspeed, (width/this.skillups)*5, height*0.7);
    image(this.special, (width/this.skillups)*6, height*0.7);
    image(this.loot, (width/this.skillups)*7, height*0.7);
    image(this.exp, (width/this.skillups)*8, height*0.7);
    //console.log(user.skillup[this.ship.constructor.name].HP);
    pop();
    push();
    translate(-this.ship.x, -this.ship.y);
    scale(2);
    this.ship.draw();
}

back() {
    game.screen = new Ship_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
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

drawSkillups() {
    this.hp.background(0);
    this.hp.noStroke();
    this.hp.fill(25, 133, 54);
    this.hp.translate(50,50);
    this.hp.rect(-10, -40, 20, 80, 5);
    this.hp.rect(-40, -10, 80, 20, 5);


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
    this.damage.triangle(40,90,40,20,60,90);
    this.damage.triangle(40,90,10,40,60,90);
    this.damage.triangle(45,90,17,32,60,90);
    this.damage.triangle(40,90,79,36,60,90);
    this.damage.triangle(50,90,60,27,60,90);
    this.damage.triangle(50,90,85,42,65,90);


    this.special.background(0);
    this.special.fill(0, 255, 255)
    this.special.textSize(80);
    this.special.textAlign(CENTER, CENTER);
    this.special.text("S", 50, 60);


    this.loot.background(0);
    this.loot.push();
    this.loot.stroke(125, 71, 9);
    this.loot.strokeWeight(3);
    this.loot.fill(130, 80, 15);
    this.loot.rect(10,15,80,35);
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