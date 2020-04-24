class Enemy {
constructor(color) {
    this.id = game.generateID();
    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.speed = (1/(this.size*2)*200) * game.screen.speed;
    this.color = color;                                 // = @param: Farbe von Lvl vorgegeben
    this.color.setAlpha(100);

    this.vel = createVector(random(-10,10), random(-10, 10)).normalize();
    this.pos = createVector(0, 0);

    this.setStartSpot();                    // = Startlocation

    this.score = 5;                         // = Player-points per Kill
    this.dropChance = 0.9;                  // = Chance, dass powerUp fallen gelassen wird
    this.knockbackSensitivity = 1           // = Multiplier für Knockback-Vektor
    this.pushes = [];                       // = speichert vorübergehend push-Funktionen, die auf diesen Gegner wirken

    this.chase = false;                     // Keine Verwendung bisher
    this.lock = false;
    this.border = game.screen.color2;                  // Keine Verwendung bisher
}

setStartSpot() {
    let s = floor(random(4));
    // still kills you in corners (would say that's fine)
    if (s == 0) {
        this.pos.x = this.size/2;
        this.pos.y = random(this.size/2, height - this.size/2);
    } else if (s == 1) {
        this.pos.x = width - this.size/2;
        this.pos.y = random(this.size/2, height - this.size/2);
    } else if (s == 2) {
        this.pos.x = random(this.size/2, width - this.size/2);
        this.pos.y = this.size/2;
    } else {
        this.pos.x = random(this.size/2, width - this.size/2);
        this.pos.y = height - this.size/2;
    }

    if (dist(game.screen.ship.pos.x, game.screen.ship.pos.y, this.pos.x, this.pos.y) < this.size) {
        this.setStartSpot();
    }
}

show() {
    push();
    stroke(this.border);
    strokeWeight(1.5);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
}

update() {
    if (game.screen.ship.collides(this)) {
        // Check with Server
        // Diesen Gegner aus Liste entfernen
        /*
        if (random(1) < this.dropChance) {
            game.choosePowerUp(this.pos.x, this.pos.y);
        }
        für getroffen werden kein PU
        */
        game.sounds.hit1.play();
        screenshake(20, millis(), game.effects);

        // Kollision Schiff/Gegner überarbeiten! Abhängig davon womit das Schiff den Gegner trifft, werden ggf. mehrere Lebenspunkte abgezogen. (manche Vektoren doppelt gechecked?)
        if (game.screen.ship.PlayerHP > 1) {
            game.screen.ship.PlayerHP--;
        } else {
            game.screen.ship.PlayerHP = 0;
            game.screen.end();
            return;
        }
    }

    let angle;
    if (this.pos.x < this.size/2) {
        this.pos.x = this.size/2;
        angle = random(180) - 90;
        this.vel.rotate(angle);
    } else if (this.pos.x > width - this.size/2) {
        this.pos.x = width - this.size/2;
        angle = random(180) + 90;
        this.vel.rotate(angle);
    } else if (this.pos.y < this.size/2) {
        this.pos.y = this.size/2;
        angle = random(180);
        this.vel.rotate(angle);
    } else if (this.pos.y > height - this.size/2) {
        this.pos.y = height - this.size/2;
        angle = random(180) + 180;
        this.vel.rotate(angle);
    }

    if (this.pushes.length > 0) {
        this.pushes.forEach(push => push.fn());
    }

    this.vel.mult(this.speed * dt);
    this.pos.add(this.vel);
    this.vel.normalize();
    this.show();

    if(this.border.time < millis()) {
      this.border = game.screen.color2;
    }
}

handleHit(bullet) {
    if (!this.isDead(bullet.damage)) {
        this.size -= bullet.damage;
        this.border = game.screen.color3;
        this.border.time = millis() + 100;
    } else {
        game.screen.score += this.score;
        if (random(1) < this.dropChance) {
            game.choosePowerUp(this.pos.x, this.pos.y);
        }
        game.removeFromList(game.screen.enemies, this);
    }
}

isHit(obj) {
    // returns true, if given bullet or vector has hit this Enemy
    let hit = false;

    if (obj instanceof Bullet || obj instanceof Mine) {
        if (dist(obj.pos.x, obj.pos.y, this.pos.x, this.pos.y) < this.size/2 + obj.size/2) {
            hit = true;
        }
    } else if (obj instanceof p5.Vector) {
        if (dist(obj.x, obj.y, this.pos.x, this.pos.y) < this.size/2) hit = true;
    }

    return hit;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.size - dmg <= this.minsize) return true;
    else return false;
}

push(vector, duration, timestamp, fade = true) {
    /*
    *  @Parameter
    *  vector: In welche Richtung und mit welcher Geschwindigkeit geht der push
    *  duration: Wenn vorhanden, wirkt der push über diese Dauer, sonst instantly
    *  timestamp: Startzeitpunkt des pushes
    *  fade: boolean, default = true, Abruptes Ende des pushes, falls false, sonst langsame Entschleunigung
    */

    let vec = createVector(vector.x, vector.y).mult(this.knockbackSensitivity);
    let tsdur = timestamp + duration;
    let tsdurHalf = timestamp + (duration/2);

    if (duration) {
        if (fade) {
            // duration + fadeout
            if (millis() <= tsdurHalf) {
                this.vel.add(vec);
            } else if (millis() <= tsdur && millis() > tsdurHalf) {
                vec.mult((tsdur-millis())/(duration/2)); // fadeout
                this.vel.add(vec);
            } else {
                this.pushes.pop();
            }
        } else {
            // duration without fadeout
            if (millis() <= tsdur) {
                this.vel.add(vec);
            } else {
                this.pushes.pop();
            }
        }
    } else {
        // no duration, instant push
        this.vel.add(vec);
        this.pushes.pop();
    }
}
}

class SpikeOrbitter {
constructor() {
    this.score = 15;                        // Player-points per Kill
    this.life = 400;                        // enemy HP
    this.maxLife = this.life;               // needed in show(), for check when to shoot spikes
    this.frameCount = frameCount;           // REMOVE?? needed for ship/enemy-collision

    // movement
    this.pos = createVector(0, 0);          // set initially by setStartSpot()
    this.vel = createVector(0, 0);          // vector velocity, movement speed and direction
    this.dir = createVector(0, 10);         // NECESSARY????
    this.toShip = createVector(0, 0);       // vector from enemy(this) to ship
    this.angle = 90;                        // orbit direction (clockwise or counter clockwise) - could be randomized
    this.speed = 20;                        // movement speed px/sec
    this.orbitDist = 200;                   // orbitting distance (when does enemy start to orbit) - could be randomized

    // show
    this.mainColor = color(0);              // color body
    this.secondaryColor = color(220);       // color spikes
    this.w = 30;                            // enemy width
    this.a = this.w*2/5;                    // needed for drawing body
    this.b = 3/5*this.w;                    // needed for drawing body
    this.vertices = [
        //Body
        createVector(-this.w, -this.w),     // 0 - Ecke oben links
        createVector(-this.a, -this.w),     // 1
        createVector(0, -this.w+this.b),    // 2 -oben mitte
        createVector(this.a, -this.w),      // 3
        createVector(this.w, -this.w),      // 4 - Ecke oben rechts
        createVector(this.w, -this.a),      // 5
        createVector(this.w-this.b, 0),     // 6 - mitte rechts
        createVector(this.w, this.a),       // 7
        createVector(this.w, this.w),       // 8 - Ecke unten rechts
        createVector(this.a, this.w),       // 9
        createVector(0, this.w-this.b),     // 10 - unten mitte
        createVector(-this.a, this.w),      // 11
        createVector(-this.w, this.w),      // 12 - Ecke unten links
        createVector(-this.w, this.a),      // 13
        createVector(-this.w+this.b, 0),    // 14 - mitte links
        createVector(-this.w, -this.a),     // 15
        // Spikes
        createVector(0, -this.w-this.b),                // 16 - Spitze oben mitte
        createVector(-(1.5*this.a), -this.w+this.b),    // 17
        createVector(1.5*this.a, -this.w+this.b),       // 18
        createVector(this.w+this.b, 0),                 // 19 - Spitze mitte rechts
        createVector(this.w-this.b, -(1.5*this.a)),     // 20
        createVector(this.w-this.b, (1.5*this.a)),      // 21
        createVector(0, this.w+this.b),                 // 22 - Spitze unten mitte
        createVector((1.5*this.a), this.w-this.b),      // 23
        createVector(-(1.5*this.a), this.w-this.b),     // 24
        createVector(-this.w-this.b, 0),                // 25 - Spitze mitte links
        createVector(-this.w+this.b, (1.5*this.a)),     // 26
        createVector(-this.w+this.b, -(1.5*this.a))     // 27
    ];
    this.setStartSpot();                            // find start location
}

setStartSpot() {
    let s = floor(random(2));
    if (s == 0) {
        this.pos.x = width - this.w;
        this.pos.y = height/2;
    } else {
        this.pos.x = 0 + this.w;
        this.pos.y = height/2;
    }

    if (dist(game.screen.ship.pos.x, game.screen.ship.pos.y, this.pos.x, this.pos.y) < this.w) {
        this.setStartSpot();
    }
}

show() {
    let a = this.a;
    let b = this.b;

    // Spikes
    fill(this.secondaryColor);
    // eleganteren Weg mit for in oder for of loop finden!!
    if (this.life > (this.maxLife * 0.75)) {
        triangle(this.vertices[16].x + this.pos.x, this.vertices[16].y + this.pos.y,
                 this.vertices[17].x + this.pos.x, this.vertices[17].y + this.pos.y,
                 this.vertices[18].x + this.pos.x, this.vertices[18].y + this.pos.y);

        triangle(this.vertices[19].x + this.pos.x, this.vertices[19].y + this.pos.y,
                 this.vertices[20].x + this.pos.x, this.vertices[20].y + this.pos.y,
                 this.vertices[21].x + this.pos.x, this.vertices[21].y + this.pos.y);

        triangle(this.vertices[22].x + this.pos.x, this.vertices[22].y + this.pos.y,
                 this.vertices[23].x + this.pos.x, this.vertices[23].y + this.pos.y,
                 this.vertices[24].x + this.pos.x, this.vertices[24].y + this.pos.y);

        triangle(this.vertices[25].x + this.pos.x, this.vertices[25].y + this.pos.y,
                 this.vertices[26].x + this.pos.x, this.vertices[26].y + this.pos.y,
                 this.vertices[27].x + this.pos.x, this.vertices[27].y + this.pos.y);
    } else if (this.life > this.maxLife * 0.6) {
        triangle(this.vertices[16].x + this.pos.x, this.vertices[16].y + this.pos.y,
                 this.vertices[17].x + this.pos.x, this.vertices[17].y + this.pos.y,
                 this.vertices[18].x + this.pos.x, this.vertices[18].y + this.pos.y);

        triangle(this.vertices[19].x + this.pos.x, this.vertices[19].y + this.pos.y,
                 this.vertices[20].x + this.pos.x, this.vertices[20].y + this.pos.y,
                 this.vertices[21].x + this.pos.x, this.vertices[21].y + this.pos.y);

        triangle(this.vertices[22].x + this.pos.x, this.vertices[22].y + this.pos.y,
                 this.vertices[23].x + this.pos.x, this.vertices[23].y + this.pos.y,
                 this.vertices[24].x + this.pos.x, this.vertices[24].y + this.pos.y);
    } else if (this.life > this.maxLife * 0.4) {
        triangle(this.vertices[19].x + this.pos.x, this.vertices[19].y + this.pos.y,
                 this.vertices[20].x + this.pos.x, this.vertices[20].y + this.pos.y,
                 this.vertices[21].x + this.pos.x, this.vertices[21].y + this.pos.y);

        triangle(this.vertices[22].x + this.pos.x, this.vertices[22].y + this.pos.y,
                 this.vertices[23].x + this.pos.x, this.vertices[23].y + this.pos.y,
                 this.vertices[24].x + this.pos.x, this.vertices[24].y + this.pos.y);
    } else if (this.life > this.maxLife * 0.2) {
        triangle(this.vertices[22].x + this.pos.x, this.vertices[22].y + this.pos.y,
                 this.vertices[23].x + this.pos.x, this.vertices[23].y + this.pos.y,
                 this.vertices[24].x + this.pos.x, this.vertices[24].y + this.pos.y);
    } else {
        // start rotation.dist--, speed++
        console.log("ROTATION!!");
    }

    // Black main body
    fill(this.mainColor);
    beginShape();
        for (let i = 0; i < 16; i++) {
            vertex(this.vertices[i].x + this.pos.x, this.vertices[i].y + this.pos.y);
        }
    endShape(CLOSE);
}

move() {
    // wall collision corner - chase ship if trapped
    if (this.pos.x < 150 && this.pos.y < 150 ||                  // upper left corner
        width - this.pos.x < 150 && this.pos.y < 150 ||          // upper right corner
        width - this.pos.x < 150 && height - this.pos.y < 150 || // bottom right corner
        this.pos.x < 150 && height - this.pos.y < 150) {         // bottom left corner
        this.vel.set(this.toShip.x, this.toShip.y);
    } else {
        // wall collision - normal movement behavior
        if (this.pos.x < this.w) {
            this.pos.x = this.w;
            this.vel.rotate(PI);
        }
        if (this.pos.x > width - this.w) {
            this.pos.x = width - this.w;
            this.vel.rotate(PI);
        }
        if (this.pos.y > height - this.w) {
            this.pos.y = height - this.w;
            this.vel.rotate(PI);
        }
        if (this.pos.y < this.w) {
            this.pos.y = this.w;
            this.vel.rotate(PI);
        }
        // Bewegung zum Schiff und ab dist = 200 darum kreisen
        // if (dist(this.pos.x, this.pos.y, game.screen.ship.pos.x, game.screen.ship.pos.y) > this.orbitDist) {
        if (this.toShip.mag() > this.orbitDist) {
            this.vel = this.toShip.normalize();
            console.log(this.vel);
        } else if (this.toShip.mag() <= this.orbitDist) {
            // this.vel = -this.toShip.normalize();
            this.vel = this.toShip.rotate(this.angle);
            console.log(this.vel);
        // } else {
        //     // maybe there is a more elegant way, to get the circle movement (to prevent the stutter)
        //     // this.pos.x = game.screen.ship.pos.x + cos(this.alpha) * this.orbitDist;
        //     // this.pos.y = game.screen.ship.pos.y + sin(this.alpha) * this.orbitDist;
        //     // console.log("rotate");
        //     // this.alpha++;
        }
    }

    this.vel.mag(1);
    this.pos.add(this.vel);
    // this.pos.x = this.pos.x + this.vel.x * this.speed;
    // this.pos.y = this.pos.y + this.vel.y * this.speed;
}

update() {
    this.toShip.set(game.screen.ship.pos.x, game.screen.ship.pos.y).sub(this.pos);
    // console.log(this.toShip.mag());
    this.move();

    // rotate
    this.vertices.forEach((v) => {
        v.rotate((this.toShip.heading()-this.dir.heading()));
    });
    this.dir.rotate(this.toShip.heading()-this.dir.heading());

    // update color depending on this.life
    this.mainColor = color(0, (this.life*0.6375)); // = this.life/400*255

    // OLD update
    for (let i = 0; i < game.screen.ship.vectors.length; i++) {
        // check enemy collision with isHit() for each vector
        let v = createVector(game.screen.ship.vectors[i].x + game.screen.ship.pos.x, game.screen.ship.vectors[i].y + game.screen.ship.pos.y);
        if (this.isHit(v)) {
            this.handleHit(v);
            if (game.screen.ship.PlayerHP > 1) {
                game.screen.ship.PlayerHP--;
            } else {
                game.screen.ship.PlayerHP = 0;
                game.screen.end();
                return;
            }
            break;
        }
    }
    this.show();
}

handleHit(obj) {
    console.log("Enemy Handle hit");
    if (obj instanceof Bullet) {
        // Hit by bullet
        if (!this.isDead(obj.damage)) {
            this.life -= obj.damage;
        } else {
            game.screen.score += this.score;
            // Diesen Gegner aus Liste entfernen
            game.removeFromList(game.screen.enemies, this);
        }
    } else if (obj instanceof p5.Vector) {
        // Hit by ship
        console.log("hit by ship");
        screenshake(30, millis(), game.effects);
        if (!this.isDead(game.screen.ship.crashDamage)) {
            if ((frameCount - this.frameCount) > 2*frameRate()) {
                // doesnt work yet - because of multiple ship.vertices?
                this.life -= game.screen.ship.crashDamage;
                // Gegner versetzen, um multiple Kollision zu vermeiden
                this.pos.x = this.pos.x - (game.screen.ship.pos.x - this.pos.x);
                this.pos.y = this.pos.y - (game.screen.ship.pos.y - this.pos.y);
            }
            this.frameCount = frameCount;
        } else {
            game.screen.score += this.score;
            // Diesen Gegner aus Liste entfernen
            game.removeFromList(game.screen.enemies, this);
        }
    }

}

isHit(obj) {
    // returns true, if given bullet has hit this Enemy
    // polygon collision detection: http://www.jeffreythompson.org/collision-detection/poly-point.php
    let hit = false;

    // Bullet Kollision auf der linken Seite ist problematisch?!

    if (obj instanceof Bullet) {
        // if ((obj.x+obj.size > this.pos.x-this.w && obj.x-obj.size < this.pos.x+this.w) &&
        //     (obj.y+obj.size > this.pos.y-this.w && obj.y-obj.size < this.pos.y+this.w)) {
        //     hit = true;
        // }

        let next = 0;
        // console.log(this.vertices);
        this.vertices.forEach((v, i) => {
            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = i+1;
            if (next == this.vertices.length) next = 0;
            let vn = this.vertices[next];       // n for "next"

            if (((v.y >= obj.y && vn.y < obj.y) || (v.y < obj.y && vn.y >= obj.y)) &&
                (obj.x < (vn.x-v.x)*(obj.y-v.y) / (vn.y-v.y)+v.x)) {
                hit = true;
                    // Das war ein Test, der die vertices anzeigen sollte
                    // push();
                    // strokeWeight(6);
                    // stroke('red');
                    // point(v.x, v.y);
                    // // stroke('purple');
                    // // point(this.vertices[i].x, this.vertices[i].y);
                    // pop();
            } else {
                // console.log("nothing");
                // console.log(frameRate());
            }
        });

    } else if (obj instanceof p5.Vector) {

        if ((obj.x > this.pos.x-this.w && obj.x < this.pos.x+this.w) &&
            (obj.y > this.pos.y-this.w && obj.y < this.pos.y+this.w)) {
            hit = true;
        }
    }

  //   for (let current = 0; current<this.vertices.length; current++) {
  // }
    return hit;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.life - dmg <= 0) return true;
    else return false;
}
}
