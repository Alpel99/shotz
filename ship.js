/*IMPORTANT:
 *der 0te Vektor im vectors array muss die Spitze sein (dort wo die Kugeln herausschießen)
 *Lösung für 2 Vektoren (Doppelschuss) mit 0 & 1?
*/
class Ship {
constructor() {
    this.x = width/2;
    this.y = height/2;

    //get the vectors from the ship
    this.prevangle = 0;
    this.angle = 0;

    this.img = createGraphics(150,150);

    // bullets
    this.dir = createVector(10, 0);             // ship facing direction
    this.pos = createVector(this.x, this.y);    // ship position
    this.timestamps = [millis(), millis(), millis()];  // for evaluating shot delay
    this.bullets = [];

    this.mods = [];

    //emp
    this.empMaxRange = 300; // orig: 240
    this.empRange = 0;
    this.empTimeStamp = 0;
    this.empActive = false;

    // special
    this.specialTime = 5;
    this.specialTimestamp = 0;
    this.specialActive = false;
}

update() {
    // update the vectors from the ship
    this.angle = atan2(mouseY - this.y, mouseX - this.x) + PI*0.5;
    this.vectors.forEach(v => v.rotate(this.angle - this.prevangle));
    this.prevangle = this.angle;
    this.move();

    // bullets
    this.bullets.forEach(b => b.update());
    this.pos.set(this.x, this.y);
    var toMouse = createVector(mouseX-this.x, mouseY-this.y);
    this.dir.rotate(toMouse.heading()-this.dir.heading());


    // mods
    this.mods.forEach((mod) => {
        // console.log("in ship.mods.forEach");
        // console.log(this.mods);
        // console.log(mod);
        if (mod.type === 'pickup') mod.draw();
    });

    // emp
    if (this.empActive) this.emp();

    // special
    if (this.specialActive) this.special();
    }

move() {
    let xmin = width;
    let ymin = height;
    let xmax = 0;
    let ymax = 0;

    for (let i = 0; i < this.vectors.length; i++) {
        if (this.vectors[i].x + this.x < xmin) xmin = this.vectors[i].x + this.x;
        if (this.vectors[i].y + this.y < ymin) ymin = this.vectors[i].y + this.y;
        if (this.vectors[i].x + this.x > xmax) xmax = this.vectors[i].x + this.x;
        if (this.vectors[i].y + this.y > ymax) ymax = this.vectors[i].y + this.y;
    }

    if (xmin < 0)      this.x = this.x + this.PlayerSPD * dt;
    if (ymin < 0)      this.y = this.y + this.PlayerSPD * dt;
    if (xmax > width)  this.x = this.x - this.PlayerSPD * dt;
    if (ymax > height) this.y = this.y - this.PlayerSPD * dt;
}

shoot(bullet_obj, delay, timestamp_index) {
    // timestamp_index controls which timestamp in this.timestamps-array is used
    if (millis() - this.timestamps[timestamp_index] > delay && game.screen.ammo.amount > 0) {
        this.bullets.push(bullet_obj);
        this.timestamps[timestamp_index] = millis();
        game.screen.ammo.amount--;
    }

   }

loadColor() {
    this.color = user.ships[this.constructor.name].color;
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    } else if (mode === 'keyDown') {
        if (keyIsDown(32)) {
            this.shoot(new Bullet(this, 'yellow', this.dir, p5.Vector.add(this.pos, this.vectors[0])),
                       this.shotDelay, 0);
            // this.shoot(new Bullet(this, 'yellow', this.vectors[1], (p5.Vector.add(this.pos, this.vectors[1]))),
            //            this.shotDelay+300, 1);
            // this.shoot(new Bullet(this, 'yellow', this.vectors[10], (p5.Vector.add(this.pos, this.vectors[10]))),
            //            this.shotDelay+300, 2);
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.PlayerSPD * dt;
        if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) this.x += this.PlayerSPD * dt;
        if (keyIsDown(UP_ARROW)   || keyIsDown(87)) this.y -= this.PlayerSPD * dt;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.PlayerSPD * dt;
    }
}

getSkillIncrease(x) {
    // x = 3*ln(x+1,5)-1
    // Math.log == ln
    return 3 * Math.log(x + 1.5) - 1;
}

collides(obj) { // currently enemy or pickup
    let collision = false;
    let checkVector;

    this.vectors.forEach((v) => {
        checkVector = createVector(v.x + this.x, v.y + this.y);
        if (obj.isHit(checkVector)) collision = true
    });

    return collision;
}

emp() {
    // Zeichnen des Effektes
    push();
        noFill();
        let transparency = map(this.empRange, 0, this.empMaxRange, 0, 255);
        stroke(255, 255, 255, 255-transparency);
        circle(this.pos.x, this.pos.y, this.empRange);
        strokeWeight(2);
        circle(this.pos.x, this.pos.y, this.empRange-5);
        strokeWeight(4);
        circle(this.pos.x, this.pos.y, this.empRange-15);
    pop();
    this.empRange += 5;

    // Deaktivieren des EMP (und Variablen zurücksetzen), wenn komplett gezeichnet
    if (this.empRange > this.empMaxRange) {
        this.empActive = false;
        game.screen.enemies.forEach(e => e.empActive = false);
        this.empRange = 0;
    }

    // Auf Gegner checken (in EMP-range?) und ggf. wegdrücken
    game.screen.enemies.forEach((e) => {
        let toEnemy = createVector(e.pos.x-this.pos.x, e.pos.y-this.pos.y);

        if (toEnemy.mag() <= this.empRange) {
            if (!e.empActive) {
                // Parameter vorbereiten
                toEnemy.mult(this.empMaxRange/toEnemy.mag()); // Stärke des Effektes abhängig von Entfernung zum Gegner

                let ts = millis();

                // Funktionsreferenz speichern
                let fn = e.push.bind(e, toEnemy.mult(1/60), 1500, ts);

                // Funktion Enemy.pushes-Array hinzufügen
                e.pushes.push(fn);
                e.empActive = true;
            }
        }
    });
}

special() {
    // DMG-Boost Aktivieren
    if (this.specialTimestamp === 0) {
        this.specialTimestamp = millis();
        this.PlayerDMG += 5 + this.getSkillIncrease(user.skillup.Ship1.SPC);
        this.shotDelay /= 2;
    }

    // DMG-Boost Deaktivieren und Variablen zurücksetzen
    if (this.specialTimestamp < (millis() - (this.specialTime * 1000))) {
        this.specialActive = false;
        this.specialTimestamp = 0;
        this.PlayerDMG -= 5 + this.getSkillIncrease(user.skillup.Ship1.SPC);
        this.shotDelay *= 2;
    }
}


dash() {
    this.x += this.dir.x*this.PlayerDASH;
    this.y += this.dir.y*this.PlayerDASH;
}

}

class Ship1 extends Ship {
constructor(x, y) {
    super();
    this.name = "Sharion"
    this.x = x;
    this.y = y;
    //get the vectors from the ship
    this.vectors = [];

    //GAMEPLAY VARIABLES
    this.baseHP      = 3;
    this.maxHP       = Math.round(this.baseHP + this.getSkillIncrease(user.skillup[this.constructor.name].HP));
    this.crashDamage = 150;
    this.shotDelay   = 250 - this.getSkillIncrease(user.skillup[this.constructor.name].FR);
    this.bulletspeed = 0.8 + this.getSkillIncrease(user.skillup[this.constructor.name].BSPD)*0.1;
    this.PlayerHP    = this.maxHP;
    this.DMG         = 10 + this.getSkillIncrease(user.skillup[this.constructor.name].DMG)*2;
    this.PlayerDMG   = this.DMG;
    this.PlayerSPD   = 5 + this.getSkillIncrease(user.skillup[this.constructor.name].SPD)/2;
    this.PlayerRNG   = 500 + this.getSkillIncrease(user.skillup[this.constructor.name].RNG)*100;
    this.PlayerDASH  = 10 + this.getSkillIncrease(user.skillup[this.constructor.name].DASH)*2;


    this.loadColor();
    this.createVectors();
    this.specialText = "The special of this ship drastically increases bullet damage and rate of fire over 5 seconds";
}

createVectors() {
    push();
    translate(75,75);
    //Flügel
    this.vectors[3] = createVector(-30, 20);
    this.vectors[1] = createVector(-40, -20);
    this.vectors[2] = createVector(0, 20);
    this.vectors[9] = createVector(-this.vectors[3].x, 20);
    this.vectors[10] = createVector(-this.vectors[1].x, -20);

    //Main
    this.vectors[0] = createVector(0, -50);
    this.vectors[4] = createVector(-30, 20);
    this.vectors[5] = createVector(30, 20);

    //White
    this.vectors[6] = createVector(-20, 20);
    this.vectors[11] = createVector(-this.vectors[6].x, 20);

    //Bridge
    this.vectors[7] = createVector(0, -5);
    this.vectors[8] = createVector(5, 10);
    this.vectors[12] = createVector(-this.vectors[8].x, 10);
    pop();
}

draw() {
    push();
        this.img.push();
        this.img.clear();
        this.img.translate(75,75);
        this.img.stroke(128);
        this.img.strokeWeight(2);
        this.img.fill(0);

        //Wings
        this.img.triangle(this.vectors[3].x,this.vectors[3].y,this.vectors[1].x,this.vectors[1].y,this.vectors[2].x,this.vectors[2].y);
        this.img.triangle(this.vectors[9].x,this.vectors[9].y,this.vectors[10].x,this.vectors[10].y,this.vectors[2].x,this.vectors[2].y);

        //Main
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[4].x,this.vectors[4].y,this.vectors[5].x,this.vectors[5].y);

        //Color
        this.img.fill(this.color);
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[4].x,this.vectors[4].y,this.vectors[6].x,this.vectors[6].y);
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[5].x,this.vectors[5].y,this.vectors[11].x,this.vectors[11].y);

        //Bridge
        this.img.fill(230);
        this.img.triangle(this.vectors[7].x,this.vectors[7].y,this.vectors[8].x,this.vectors[8].y,this.vectors[12].x,this.vectors[12].y);
        this.img.pop();
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
}
}


//SHIP2
class Ship2 extends Ship {
constructor(x, y) {
    super();
    this.name = "Corinat"
    this.x = x;
    this.y = y;
    //get the vectors from the ship
    this.vectors = [];

    //GAMEPLAY VARIABLES
    this.baseHP      = 3;
    this.maxHP       = Math.round(this.baseHP + this.getSkillIncrease(user.skillup[this.constructor.name].HP)/2);
    this.crashDamage = 300;
    this.shotDelay   = 30 - this.getSkillIncrease(user.skillup[this.constructor.name].FR);
    this.bulletspeed = 0.8 + this.getSkillIncrease(user.skillup[this.constructor.name].BSPD)*0.1;
    this.PlayerHP    = this.maxHP;
    this.DMG         = 5 + this.getSkillIncrease(user.skillup[this.constructor.name].DMG);
    this.PlayerDMG   = this.DMG;
    this.PlayerSPD   = 8 + this.getSkillIncrease(user.skillup[this.constructor.name].SPD)/1.5;
    this.PlayerRNG   = 400 + this.getSkillIncrease(user.skillup[this.constructor.name].RNG)*75;
    this.PlayerDASH  = 20 + this.getSkillIncrease(user.skillup[this.constructor.name].DASH)*5;

    this.loadColor();
    this.createVectors();

    this.specialText = "The special of this Ship increases the rate of fire a little bit" +
                        "\nBanane mit Sosse";
}

createVectors() {
    push();
    translate(75,75);

    //Main
    this.vectors[0] = createVector(0, -60);
    this.vectors[1] = createVector(-30, 20);
    this.vectors[2] = createVector(-this.vectors[1].x, this.vectors[1].y);

    //Flügel
    this.vectors[3] = createVector(-30, -10);
    this.vectors[4] = createVector(-this.vectors[3].x, this.vectors[3].y);

    this.vectors[5] = createVector(-35, 20);
    this.vectors[6] = createVector(-this.vectors[5].x, this.vectors[5].y);

    this.vectors[7] = createVector(-20, 35);
    this.vectors[8] = createVector(-this.vectors[7].x, this.vectors[7].y);

    //Color
    this.vectors[9] = createVector(-10, this.vectors[1].y);
    this.vectors[10] = createVector(-this.vectors[9].x, this.vectors[1].y);

    //Bridge
    this.vectors[11] = createVector(0, -5);
    this.vectors[12] = createVector(5, 10);
    this.vectors[13] = createVector(-this.vectors[12].x, 10);
    pop();
}

draw() {
    push();
        this.img.push();
        this.img.clear();
        this.img.translate(75,75);
        this.img.stroke(0);
        this.img.strokeWeight(2);
        this.img.fill(0);

        //Wings
        this.img.triangle(this.vectors[3].x,this.vectors[3].y,this.vectors[5].x,this.vectors[5].y,this.vectors[7].x,this.vectors[7].y);
        this.img.triangle(this.vectors[4].x,this.vectors[4].y,this.vectors[6].x,this.vectors[6].y,this.vectors[8].x,this.vectors[8].y);

        //Main
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[1].x,this.vectors[1].y,this.vectors[2].x,this.vectors[2].y);

        //Color
        this.img.noStroke();
        this.img.fill(this.color);
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[9].x,this.vectors[9].y,this.vectors[10].x,this.vectors[10].y);

        //Bridge
        this.img.stroke(0);
        this.img.fill(230);
        this.img.triangle(this.vectors[11].x,this.vectors[11].y,this.vectors[12].x,this.vectors[12].y,this.vectors[13].x,this.vectors[13].y);
        this.img.pop();
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
}

// Override for Laser instead of bullet
controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    } else if (mode === 'keyDown') {
        if (keyIsDown(32)) {
            this.shoot(new Laser(this, 'yellow', this.dir, p5.Vector.add(this.pos, this.vectors[0])),
                       this.shotDelay, 0);
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= this.PlayerSPD * dt;
        if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) this.x += this.PlayerSPD * dt;
        if (keyIsDown(UP_ARROW)   || keyIsDown(87)) this.y -= this.PlayerSPD * dt;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += this.PlayerSPD * dt;
    }
}
}
