/*IMPORTANT:
 *der 0te Vektor im vectors array muss die Spitze sein (dort wo die Kugeln herausschießen)
 *Lösung für 2 Vektoren (Doppelschuss) mit 0 & 1?
*/
class Ship {
constructor() {
    this.pos = createVector(width/2, height/2); // ship position
    this.vel = createVector(0, 0);              // ship velocity
    this.dir = createVector(10, 0);             // ship facing direction

    //get the vectors from the ship
    this.prevangle = 0;
    this.angle = 0;
    this.img = createGraphics(150,150);

    // bullets
    this.timestamps = [millis(), millis(), millis()];  // for evaluating shot delay
    this.bullets = [];

    // powerups
    this.mods = [];

    // emp
    this.empMaxRange = 300;
    this.empRange = 0;
    this.empTimeStamp = 0;
    this.empActive = false;

    // special
    this.specialTime = 5;
    this.specialTimestamp = 0;
    this.specialActive = false;

    // mines
    this.mines = [];
    this.explosionRadius = 250;
}

update() {
    // update the vectors from the ship
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x) + PI*0.5;
    this.vectors.forEach(v => v.rotate(this.angle - this.prevangle));
    this.prevangle = this.angle;

    var toMouse = createVector(mouseX-this.pos.x, mouseY-this.pos.y);
    this.dir.rotate(toMouse.heading()-this.dir.heading());
    this.walls();

    // bullets
    this.bullets.forEach(b => b.update());

    // mods
    this.mods.forEach((mod) => {
        if (mod.type === 'pickup') mod.draw();
    });

    // emp
    if (this.empActive) this.emp();

    // special
    if (this.specialActive) this.special();

    // mines
    this.mines.forEach(mine => mine.draw());
    }

walls() {
    // checks for walls and replaces ship if necessary
    let xmin = width;
    let ymin = height;
    let xmax = 0;
    let ymax = 0;

    for (let i = 0; i < this.vectors.length; i++) {
        if (this.vectors[i].x + this.pos.x < xmin) xmin = this.vectors[i].x + this.pos.x;
        if (this.vectors[i].y + this.pos.y < ymin) ymin = this.vectors[i].y + this.pos.y;
        if (this.vectors[i].x + this.pos.x > xmax) xmax = this.vectors[i].x + this.pos.x;
        if (this.vectors[i].y + this.pos.y > ymax) ymax = this.vectors[i].y + this.pos.y;
    }

    if (xmin < 0)      this.pos.x = this.pos.x + this.PlayerSPD * dt;
    if (ymin < 0)      this.pos.y = this.pos.y + this.PlayerSPD * dt;
    if (xmax > width)  this.pos.x = this.pos.x - this.PlayerSPD * dt;
    if (ymax > height) this.pos.y = this.pos.y - this.PlayerSPD * dt;
}

shoot() {
    if (millis() - this.timestamps[0] > this.shotDelay && game.screen.ammo.amount > 0) {
        let bullet = new Bullet(this, 'yellow', this.dir, p5.Vector.add(this.pos, this.vectors[0]), game.sounds.bullet1);
        this.bullets.push(bullet);
        this.timestamps[0] = millis();
        game.screen.ammo.amount--;
        if(bullet.constructor.name == "Laser") {
          //sound.currentTime = 0;
          game.sounds.laser1.play();
        } else {
          game.sounds.bullet1.play();
        }
    }

    /*
    // Beispiel für Laser-Seitenschüsse mit geringerer RoF
    if (millis() - this.timestamps[1] > this.shotDelay+300 && game.screen.ammo.amount > 0) {
        let bullet1 = new Laser(this, 'yellow', this.vectors[1], p5.Vector.add(this.pos, this.vectors[1]), game.sounds.laser1);
        let bullet2 = new Laser(this, 'yellow', this.vectors[10], p5.Vector.add(this.pos, this.vectors[10]), game.sounds.laser1);
        this.bullets.push(bullet1, bullet2);
        this.timestamps[1] = millis();
        game.screen.ammo.amount -= 2;
    }*/
}

loadColor() {
	this.color = color(255);
	for(let i = 0; i < 4; i++) {
		this.color.maxes.rgb[i] = user.ships[this.constructor.name].color[i];
	}
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    } else if (mode === 'keyDown') {
        if (keyIsDown(32)) this.shoot();
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.pos.x -= this.PlayerSPD * dt;
        if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) this.pos.x += this.PlayerSPD * dt;
        if (keyIsDown(UP_ARROW)   || keyIsDown(87)) this.pos.y -= this.PlayerSPD * dt;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.pos.y += this.PlayerSPD * dt;
    }
}

getSkillIncrease(x) {
    // y = 3*ln(x+1,5)-1
    // Math.log == ln
    return 3 * Math.log(x + 1.5) - 1;
}

collides(obj) { // currently enemy or pickup
    let collision = false;
    let checkVector;

    this.vectors.forEach((v) => {
        checkVector = createVector(v.x + this.pos.x, v.y + this.pos.y);
        if (obj.isHit(checkVector)) collision = true
    });

    return collision;
}

emp() {
    // Sound
    if (!game.sounds.nova1.isPlaying()) game.sounds.nova1.play();
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
    this.empRange += 15;

    // Deaktivieren des EMP (und Variablen zurücksetzen), wenn komplett gezeichnet
    if (this.empRange > this.empMaxRange) {
        this.empActive = false;
        this.empRange = 0;
    }

    // Auf Gegner checken (in EMP-range?) und ggf. wegdrücken
    game.screen.enemies.forEach((e) => {
        let toEnemy = createVector(e.pos.x-this.pos.x, e.pos.y-this.pos.y);

        if (toEnemy.mag() <= this.empRange) {
            // prüfen, ob der Gegner schon von diesem push() betroffen ist
            let foundPush = false;
            e.pushes.forEach(push => {
                if (push.id === e.pushes[e.pushes.length-1].id) foundPush = true;
            });

            // falls nicht füge ein push() hinzu
            if (e.pushes.length === 0 || foundPush === false) {
                // Parameter vorbereiten
                toEnemy.mult(this.empMaxRange/toEnemy.mag()); // Stärke des Effektes abhängig von Entfernung zum Gegner

                // Funktionsreferenz speichern
                let p = {
                    id: game.generateID(),
                    fn: e.push.bind(e, toEnemy.mult(1/60), 1500, millis())
                }

                // Funktion dem Enemy.pushes-Array hinzufügen
                e.pushes.push(p);
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
    game.sounds.dash1.play();
    this.pos.x += this.dir.x*this.PlayerDASH;
    this.pos.y += this.dir.y*this.PlayerDASH;
}

layMine() {
    this.mines.push(new Mine(this.pos, this.PlayerDMG*5, this.explosionRadius));
}

}

class Ship1 extends Ship {
constructor(x, y) {
    super();
    this.name = "Sharion"
    this.pos.x = x;
    this.pos.y = y;
    //get the vectors from the ship
    this.vectors = [];

    //GAMEPLAY VARIABLES
    this.loadStats();
    this.specialActive = false;

    //this.color = color(user.ships[this.constructor.name].color[0], user.ships[this.constructor.name].color[1], user.ships[this.constructor.name].color[2], user.ships[this.constructor.name].color[3]);
    this.createVectors();
    this.specialText = "The special of this ship will increase the single bullet damage";
}

loadStats() {
    this.baseHP = 3;
    this.maxHP = Math.round(this.baseHP + this.getSkillIncrease(user.skillup[this.constructor.name].HP));

    this.crashDamage = 150;
    this.shotDelay   = 250 - this.getSkillIncrease(user.skillup[this.constructor.name].FR);
    this.bulletspeed = 0.8 + this.getSkillIncrease(user.skillup[this.constructor.name].BSPD)*0.1;
    this.PlayerHP = this.maxHP;
    this.DMG = 10 + this.getSkillIncrease(user.skillup[this.constructor.name].DMG)*2;
    this.PlayerDMG = this.DMG;
    this.PlayerSPD = 5 + this.getSkillIncrease(user.skillup[this.constructor.name].SPD)/2;
    this.PlayerRNG = 500 + this.getSkillIncrease(user.skillup[this.constructor.name].RNG)*100;
    this.PlayerDASH = 10 + this.getSkillIncrease(user.skillup[this.constructor.name].DASH)*2;
    this.specialTime = 5;

    this.loadColor();
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
    image(this.img, this.pos.x, this.pos.y);
    pop();
}
}


//SHIP2
class Ship2 extends Ship {
constructor(x, y) {
    super();
    this.name = "Corinat"
    this.pos.x = x;
    this.pos.y = y;
    //get the vectors from the ship
    this.vectors = [];

    //GAMEPLAY VARIABLES
    this.loadStats();

    this.specialTime = 5;


    //this.color = color(user.ships[this.constructor.name].color[0], user.ships[this.constructor.name].color[1], user.ships[this.constructor.name].color[2], user.ships[this.constructor.name].color[3]);
    this.createVectors();

    this.specialText = "The special of this Ship will increase the firerate";
}

loadStats() {
    this.baseHP = 2;
    this.maxHP = Math.round(this.baseHP + this.getSkillIncrease(user.skillup[this.constructor.name].HP)/2);
    this.crashDamage = 300;
    this.shotDelay   = 180 - this.getSkillIncrease(user.skillup[this.constructor.name].FR);
    this.bulletspeed = 0.8 + this.getSkillIncrease(user.skillup[this.constructor.name].BSPD)*0.1;
    this.PlayerHP = this.maxHP;
    this.DMG = 5 + this.getSkillIncrease(user.skillup[this.constructor.name].DMG);
    this.PlayerDMG = this.DMG;
    this.PlayerSPD = 8 + this.getSkillIncrease(user.skillup[this.constructor.name].SPD)/1.5;
    this.PlayerRNG = 400 + this.getSkillIncrease(user.skillup[this.constructor.name].RNG)*75;
    this.PlayerDASH = 20 + this.getSkillIncrease(user.skillup[this.constructor.name].DASH)*5;

    this.loadColor();
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
    image(this.img, this.pos.x, this.pos.y);
    pop();
}

shoot() {
    if (millis() - this.timestamps[0] > this.shotDelay && game.screen.ammo.amount > 0) {
        let bullet = new Laser(this, 'yellow', this.dir, p5.Vector.add(this.pos, this.vectors[0]), game.sounds.laser1);
        this.bullets.push(bullet);
        this.timestamps[0] = millis();
        game.screen.ammo.amount--;
    }
}

// Override for Laser instead of bullet
controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode === 'RETURN') {
            console.log("pressed something");
            screenshake(5, millis(), game.effects);
        }
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    } else if (mode === 'keyDown') {
        if (keyIsDown(32)) this.shoot();
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.pos.x -= this.PlayerSPD * dt;
        if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) this.pos.x += this.PlayerSPD * dt;
        if (keyIsDown(UP_ARROW)   || keyIsDown(87)) this.pos.y -= this.PlayerSPD * dt;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.pos.y += this.PlayerSPD * dt;
    }
}
}
