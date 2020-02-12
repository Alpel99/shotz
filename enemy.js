class Enemy {
constructor(color) {
    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.speed = (1/(this.size*2)*200) * game.screen.speed;
    this.color = color;                                 // = @param: Farbe von Lvl vorgegeben

    this.vel = createVector(random(-10,10), random(-10, 10)).normalize();
    this.x = 0;
    this.y = 0;
    this.setStartSpot();                    // = Startlocation

    this.score = 5;                         // = Player-points per Kill
    this.chase = false;
    this.lock = false;
}

setStartSpot() {
    let s = floor(random(4));
    // still kills you in corners (would say that's fine)
    if (s == 0) {
        this.x = this.size/2;
        this.y = random(this.size/2, height - this.size/2);
    } else if (s == 1) {
        this.x = width - this.size/2;
        this.y = random(this.size/2, height - this.size/2);
    } else if (s == 2) {
        this.x = random(this.size/2, width - this.size/2);
        this.y = this.size/2;
    } else {
        this.x = random(this.size/2, width - this.size/2);
        this.y = height - this.size/2;
    }

    if (dist(game.screen.ship.x, game.screen.ship.y, this.x, this.y) < this.size) {
        this.setStartSpot();
    }
}

show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
}

update() {
    // calls this.show() as last step of update
    for (let i = 0; i < game.screen.ship.vectors.length; i++) {
        // check enemy collision with isHit() for each vector
        let vx = game.screen.ship.vectors[i].x + game.screen.ship.x;
        let vy = game.screen.ship.vectors[i].y + game.screen.ship.y;
        if (this.isHit(createVector(vx, vy))) {
            // Check with Server
            // Diesen Gegner aus Liste entfernen
            game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
            // Kollision Schiff/Gegner überarbeiten! Abhängig davon womit das Schiff den Gegner trifft, werden ggf. mehrere Lebenspunkte abgezogen. (manche Vektoren doppelt gechecked?)
            if (game.screen.ship.PlayerHP > 1) {
                game.screen.ship.PlayerHP--;
            } else {
                game.screen.ship.PlayerHP = 0;
                game.screen.end();
                return;
            }
        }
    }

    this.x = this.x + this.vel.x * this.speed;
    this.y = this.y + this.vel.y * this.speed;

    if (this.x < this.size/2) {
        this.vel = createVector(random(1,10), random(-10, 10));
    } else if (this.x > width - this.size/2) {
        this.vel = createVector(random(-10,-1), random(-10, 10));
    } else if (this.y < this.size/2) {
        this.vel = createVector(random(-10,10), random(1, 10));
    } else if (this.y > height - this.size/2) {
        this.vel = createVector(random(-10,10), random(-1, -10));
    }
    this.vel.normalize();
    this.show();
}

handleHit(bullet) {
    if (!this.isDead(bullet.damage)) {
        this.size -= bullet.damage;
    } else {
        game.screen.score += this.score;
        // Diesen Gegner aus Liste entfernen
        game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
    }
}

isHit(obj) {
    // returns true, if given bullet or vector has hit this Enemy
    let hit = false;

    if (obj instanceof Bullet) {
        if (dist(obj.pos.x, obj.pos.y, this.x, this.y) < this.size/2 + obj.size/2) {
            hit = true;
        }
    } else if (obj instanceof p5.Vector) {
        if (dist(obj.x, obj.y, this.x, this.y) < this.size/2) hit = true;
    }

    return hit;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.size - dmg <= this.minsize) return true;
    else return false;
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

    if (dist(game.screen.ship.x, game.screen.ship.y, this.pos.x, this.pos.y) < this.w) {
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
        // if (dist(this.pos.x, this.pos.y, game.screen.ship.x, game.screen.ship.y) > this.orbitDist) {
        if (this.toShip.mag() > this.orbitDist) {
            this.vel = this.toShip.normalize();
            console.log(this.vel);
        } else if (this.toShip.mag() <= this.orbitDist) {
            // this.vel = -this.toShip.normalize();
            this.vel = this.toShip.rotate(this.angle);
            console.log(this.vel);
        // } else {
        //     // maybe there is a more elegant way, to get the circle movement (to prevent the stutter)
        //     // this.pos.x = game.screen.ship.x + cos(this.alpha) * this.orbitDist;
        //     // this.pos.y = game.screen.ship.y + sin(this.alpha) * this.orbitDist;
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
    this.toShip.set(game.screen.ship.x, game.screen.ship.y).sub(this.pos);
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
        let v = createVector(game.screen.ship.vectors[i].x + game.screen.ship.x, game.screen.ship.vectors[i].y + game.screen.ship.y);
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
    if (obj instanceof Bullet) {
        // Hit by bullet
        if (!this.isDead(obj.damage)) {
            this.life -= obj.damage;
        } else {
            game.screen.score += this.score;
            // Diesen Gegner aus Liste entfernen
            game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
        }
    } else if (obj instanceof p5.Vector) {
        // Hit by ship
        if (!this.isDead(game.screen.ship.crashDamage)) {
            if ((frameCount - this.frameCount) > 2*frameRate()) {
                // doesnt work yet - because of multiple ship.vertices?
                this.life -= game.screen.ship.crashDamage;
                // Gegner versetzen, um multiple Kollision zu vermeiden
                this.pos.x = this.pos.x - (game.screen.ship.x - this.pos.x);
                this.pos.y = this.pos.y - (game.screen.ship.y - this.pos.y);
            }
            this.frameCount = frameCount;
        } else {
            game.screen.score += this.score;
            // Diesen Gegner aus Liste entfernen
            game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
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
