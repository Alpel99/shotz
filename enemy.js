class Enemy {
constructor(speed, color) {
    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.speed = 1/(this.size*2)*speed;                 // = @param: Geschwindigkeit von Lvl vorgegeben
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
        if (dist(obj.x, obj.y, this.x, this.y) < this.size/2 + obj.size/2) hit = true;
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

class SpikeOrbitter extends Enemy {
constructor(speed) {
    super();
    this.score = 15;                        // Player-points per Kill
    this.life = 400;                        // enemy HP
    this.maxLife = this.life;               // needed in show(), for check when to shoot spikes
    this.frameCount = frameCount;           // REMOVE?? needed for ship/enemy-collision
    this.x = 0;
    this.y = 0;

    // movement
    this.toShip = createVector(0, 0);       // vector from enemy(this) to ship
    this.vel = createVector(0, 0);          // vector velocity, movement speed and direction
    this.angle = 90;                        // orbit direction (clockwise or counter clockwise)
    this.speed = speed/100;                 // @param: speed, statet from level
    this.orbitDist = 200;                   // orbitting distance (when does enemy start to orbit)

    // show
    this.mainColor = color(0);              // color body
    this.secondaryColor = color(220);       // color spikes
    this.w = 30;                            // width of enemy
    this.a = this.w*2/5;                    // needed for drawing body
    this.b = 3/5*this.w;                    // needed for drawing body
    this.vertices = [
        //Body
        createVector(this.x-this.w, this.y-this.w), // Ecke oben links
        createVector(this.x-this.a, this.y-this.w),
        createVector(this.x, this.y-this.w+this.b), // oben mitte
        createVector(this.x+this.a, this.y-this.w),
        createVector(this.x+this.w, this.y-this.w), // Ecke oben rechts
        createVector(this.x+this.w, this.y-this.a),
        createVector(this.x+this.w-this.b, this.y), // mitte rechts
        createVector(this.x+this.w, this.y+this.a),
        createVector(this.x+this.w, this.y+this.w), // Ecke unten rechts
        createVector(this.x+this.a, this.y+this.w),
        createVector(this.x, this.y+this.w-this.b), // unten mitte
        createVector(this.x-this.a, this.y+this.w),
        createVector(this.x-this.w, this.y+this.w), // Ecke unten links
        createVector(this.x-this.w, this.y+this.a),
        createVector(this.x-this.w+this.b, this.y), // mitte links
        createVector(this.x-this.w, this.y-this.a),
        // Spikes
        createVector(this.x, this.y-this.w-this.b), // Spitze oben mitte
        createVector(this.x-(1.5*this.a), this.y-this.w+this.b),
        createVector(this.x+(1.5*this.a), this.y-this.w+this.b),
        createVector(this.x+this.w+this.b, this.y), // Spitze mitte rechts
        createVector(this.x+this.w-this.b, this.y-(1.5*this.a),
        createVector(this.x+this.w-this.b, this.y+(1.5*this.a)),
        createVector(this.x, this.y+this.w+this.b), // Spitze unten mitte
        createVector(this.x+(1.5*this.a), this.y+this.w-this.b),
        createVector(this.x-(1.5*this.a), this.y+this.w-this.b),
        createVector(this.x-this.w-this.b, this.y),  // Spitze mitte links
        createVector(this.x-this.w+this.b, this.y+(1.5*this.a)),
        createVector(this.x-this.w+this.b, this.y-(1.5*this.a)))
    ];

    this.spikes = {
        t_oben   : function() {
            // console.log("triangle.draw aufgerufen");
            // console.log(this.w);
            // console.log(this.x, this.y);
            triangle(this.x, this.y-this.w-this.b, this.x-(1.5*this.a), this.y-this.w+this.b, this.x+(1.5*this.a), this.y-this.w+this.b)
        },
        t_rechts : function() {triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a))},
        t_unten  : function() {triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b)},
        t_links  : function() {triangle(this.x-this.w-b, this.y, this.x-this.w+b, this.y+(1.5*a), this.x-this.w+b, this.y-(1.5*a))}
    };
    this.setStartSpot();                            // find start location
    console.log(this.spikes);
}

setStartSpot() {
    let s = floor(random(2));
    if (s == 0) {
        this.x = width - this.w;
        this.y = height/2;
    } else {
        this.x = 0 + this.w;
        this.y = height/2;
    }

    if (dist(game.screen.ship.x, game.screen.ship.y, this.x, this.y) < this.w) {
        this.setStartSpot();
    }
}

show() {
    let a = this.a;
    let b = this.b;

    // Spikes
    fill(this.secondaryColor);
    // for (let s in this.spikes) {
    //     this.spikes.s();
    // }
    // eleganteren Weg mit for in oder for of loop finden!!
    if (this.life > (this.maxLife * 0.75)) {
        console.log(this.vertices[21]);
        // this.spikes.t_oben();
        // triangle(this.x, this.y-this.w-b, this.x-(1.5*a), this.y-this.w+b, this.x+(1.5*a), this.y-this.w+b);
        // triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a));
        // triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b);
        // triangle(this.x-this.w-b, this.y, this.x-this.w+b, this.y+(1.5*a), this.x-this.w+b, this.y-(1.5*a));
        triangle(this.vertices[16].x, this.vertices[16].y,
                this.vertices[17].x, this.vertices[17].y,
                this.vertices[18].x, this.vertices[18].y);
        triangle(this.vertices[19].x, this.vertices[19].y,
                this.vertices[20].x, this.vertices[20].y,
                this.vertices[21].x, this.vertices[21].y);
        triangle(this.vertices[22].x, this.vertices[22].y,
                this.vertices[23].x, this.vertices[23].y,
                this.vertices[24].x, this.vertices[24].y);
        triangle(this.vertices[25].x, this.vertices[25].y,
                this.vertices[26].x, this.vertices[26].y,
                this.vertices[27].x, this.vertices[27].y);
    } else if (this.life > this.maxLife * 0.6) {
        triangle(this.x, this.y-this.w-b, this.x-(1.5*a), this.y-this.w+b, this.x+(1.5*a), this.y-this.w+b);
        triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a));
        triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b);
    } else if (this.life > this.maxLife * 0.4) {
        triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a));
        triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b);
    } else if (this.life > this.maxLife * 0.2) {
        triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a));
    } else {
        // start rotation.dist--, speed++
        console.log("ROTATION!!");
    }

    // Black main body
    fill(this.mainColor);
    beginShape();
        for (let i = 0; i < 16; i++) {
            vertex(this.vertices[i].x, this.vertices[i].y);
        }
    endShape(CLOSE);
}

setVectors() {
    // Body
    this.vertices[0].set(this.x-this.w, this.y-this.w); // Ecke oben links
    this.vertices[1].set(this.x-this.a, this.y-this.w);
    this.vertices[2].set(this.x, this.y-this.w+this.b); // oben mitte
    this.vertices[3].set(this.x+this.a, this.y-this.w);
    this.vertices[4].set(this.x+this.w, this.y-this.w); // Ecke oben rechts
    this.vertices[5].set(this.x+this.w, this.y-this.a);
    this.vertices[6].set(this.x+this.w-this.b, this.y); // mitte rechts
    this.vertices[7].set(this.x+this.w, this.y+this.a);
    this.vertices[8].set(this.x+this.w, this.y+this.w); // Ecke unten rechts
    this.vertices[9].set(this.x+this.a, this.y+this.w);
    this.vertices[10].set(this.x, this.y+this.w-this.b); // unten mitte
    this.vertices[11].set(this.x-this.a, this.y+this.w);
    this.vertices[12].set(this.x-this.w, this.y+this.w); // Ecke unten links
    this.vertices[13].set(this.x-this.w, this.y+this.a);
    this.vertices[14].set(this.x-this.w+this.b, this.y); // mitte links
    this.vertices[15].set(this.x-this.w, this.y-this.a);
    // Spikes
    this.vertices[16].set(this.x, this.y-this.w-this.b); // Spitze oben mitte
    this.vertices[17].set(this.x+this.w+this.b, this.y); // Spitze mitte rechts
    this.vertices[18].set(this.x, this.y+this.w+this.b); // Spitze unten mitte
    this.vertices[19].set(this.x-this.w-this.b, this.y); // Spitze mitte links

}

move() {
    this.pos = createVector(this.x, this.y);
    this.toShip.set(game.screen.ship.x, game.screen.ship.y);
    this.toShip.sub(this.pos);
    // this.toShip.mult(0.5);
    // line(this.x, this.y, this.x+this.toShip.x, this.y+this.toShip.y)

    // wall collision


    let corner = false;

    // trapped in corner - chase ship if trapped
    if (this.x < 150 && this.y < 150 ||                  // upper left corner
        width - this.x < 150 && this.y < 150 ||          // upper right corner
        width - this.x < 150 && height - this.y < 150 || // bottom right corner
        this.x < 150 && height - this.y < 150) {         // bottom left corner
        this.vel.set(this.toShip.x, this.toShip.y).normalize();
    } else {
        // normal movement behavior
        if (this.x < this.w) {
            this.x = this.w;
            this.angle *= -1;
        }
        if (this.x > width - this.w) {
            this.x = width - this.w;
            this.angle *= -1;
        }
        if (this.y > height - this.w) {
            this.y = height - this.w;
            this.angle *= -1;
        }
        if (this.y < this.w) {
            this.y = this.w;
            this.angle *= -1;
        }
        // Bewegung zum Schiff und ab dist = 200 darum kreisen
        if (dist(this.x, this.y, game.screen.ship.x, game.screen.ship.y) > this.orbitDist) {
            this.vel = this.toShip.normalize();
        } else if (dist(this.x, this.y, game.screen.ship.x, game.screen.ship.y) <= this.orbitDist) {
            // maybe there is a more elegant way, to get the circle movement (to prevent the stutter)
            this.vel = this.toShip.rotate(this.angle).normalize();
        }
    }

    this.x = this.x + this.vel.x * this.speed;
    this.y = this.y + this.vel.y * this.speed;
    // this.vel.normalize();
}

update() {
    this.move();
    this.setVectors();
    console.log(this.toShip.heading());
    // translate(this.x, this.y);
    this.vertices.forEach((v)=>{v.rotate(this.toShip.heading())});


    // update color depending on this.life
    this.mainColor = color(0, (this.life*0.6375)); // = this.life/400*255

    // OLD update
    for (let i = 0; i < game.screen.ship.vectors.length; i++) {
        // check enemy collision with isHit() for each vector
        let v = createVector(game.screen.ship.vectors[i].x + game.screen.ship.x, game.screen.ship.vectors[i].y + game.screen.ship.y);
        if (this.isHit(v)) {
            // Check with Server
            // Diesen Gegner aus Liste entfernen
            this.handleHit(v);
            // Kollision Schiff/Gegner überarbeiten! Abhängig davon womit das Schiff den Gegner trifft, werden ggf. mehrere Lebenspunkte abgezogen. (manche Vektoren doppelt gechecked?)
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
                this.x = this.x - (game.screen.ship.x - this.x);
                this.y = this.y - (game.screen.ship.y - this.y);
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
        // if ((obj.x+obj.size > this.x-this.w && obj.x-obj.size < this.x+this.w) &&
        //     (obj.y+obj.size > this.y-this.w && obj.y-obj.size < this.y+this.w)) {
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

        if ((obj.x > this.x-this.w && obj.x < this.x+this.w) &&
            (obj.y > this.y-this.w && obj.y < this.y+this.w)) {
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
