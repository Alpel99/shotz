class Enemy {
constructor(speed, color) {
    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.speed = 1/(this.size*2)*speed;                 // = @param: Geschwindigkeit von Lvl vorgegeben
    this.color = color;                                 // = @param: Farbe von Lvl vorgegeben

    this.v = createVector(random(-10,10), random(-10, 10)).normalize();
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

    this.x = this.x + this.v.x * this.speed;
    this.y = this.y + this.v.y * this.speed;

    if (this.x < this.size/2) {
        this.v = createVector(random(1,10), random(-10, 10));
    } else if (this.x > width - this.size/2) {
        this.v = createVector(random(-10,-1), random(-10, 10));
    } else if (this.y < this.size/2) {
        this.v = createVector(random(-10,10), random(1, 10));
    } else if (this.y > height - this.size/2) {
        this.v = createVector(random(-10,10), random(-1, -10));
    }
    this.v.normalize();
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


class Bot extends Enemy {
constructor(speed) {
    super();

    // current properties

    this.w = 30;                            // width of enemy
    this.a = this.w*2/5;
    this.b = 3/5*this.w;
    this.vertices = [
        createVector(this.x-this.w, this.y-this.w), // Ecke links oben
        createVector(this.x-this.a, this.y-this.w),
        createVector(this.x, this.y-this.w-this.b), // Spitze oben
        createVector(this.x+this.a, this.y-this.w),
        createVector(this.x+this.w, this.y-this.w), // Ecke rechts oben
        createVector(this.x+this.w, this.y-this.a),
        createVector(this.x+this.w+this.b, this.y), // Spitze rechts
        createVector(this.x+this.w, this.y+this.a),
        createVector(this.x+this.w, this.y+this.w), // Ecke rechts unten
        createVector(this.x+this.a, this.y+this.w),
        createVector(this.x, this.y+this.w+this.b), // Spitze unten
        createVector(this.x-this.a, this.y+this.w),
        createVector(this.x-this.w, this.y+this.w), // Ecke links unten
        createVector(this.x-this.w, this.y+this.a),
        createVector(this.x-this.w-this.b, this.y), // Spitze links
        createVector(this.x-this.w, this.y-this.a)
    ];
    this.mainColor = 'black';               // color body
    this.secondaryColor = '#ddd';           // color spikes
    this.score = 15;                        // Player-points per Kill
    this.life = 400;                        // enemy HP
    this.x = 0;
    this.y = 0;
    this.setStartSpot();                    // Startlocation

    // old properties

    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.speed = 1/(this.size*2)*speed;  // = @param: Geschwindigkeit von Lvl vorgegeben

    this.v = createVector(random(-10,10), random(-10, 10)).normalize();

    this.chase = false;
    this.lock = false;
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
    fill(this.secondaryColor)
    let t_oben = triangle(this.x, this.y-this.w-b, this.x-(1.5*a), this.y-this.w+b, this.x+(1.5*a), this.y-this.w+b); // Spitze oben
    let t_rechts = triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a)); // Spitze rechts
    let t_unten = triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b); // Spitze unten
    let t_links = triangle(this.x-this.w-b, this.y, this.x-this.w+b, this.y+(1.5*a), this.x-this.w+b, this.y-(1.5*a));// Spitze links

    // Black main body
    fill(this.mainColor);
    beginShape();
        vertex(this.x-this.w, this.y-this.w);   // oben links
        vertex(this.x-a, this.y-this.w);
        vertex(this.x, this.y-this.w+b);        // oben mitte
        vertex(this.x+a, this.y-this.w);
        vertex(this.x+this.w, this.y-this.w);   // oben rechts
        vertex(this.x+this.w, this.y-a);
        vertex(this.x+this.w-b, this.y);        // rechts mitte
        vertex(this.x+this.w, this.y+a);
        vertex(this.x+this.w, this.y+this.w);   // unten rechts
        vertex(this.x+a, this.y+this.w);
        vertex(this.x, this.y+this.w-b);        // unten mitte
        vertex(this.x-a, this.y+this.w);
        vertex(this.x-this.w, this.y+this.w);   // unten links
        vertex(this.x-this.w, this.y+a);
        vertex(this.x-this.w+b, this.y);        // links mitte
        vertex(this.x-this.w, this.y-a);
    endShape(CLOSE);
}

update() {
    // calls this.show() as last step of update
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
            continue;
        }
    }

    this.x = this.x + this.v.x * this.speed;
    this.y = this.y + this.v.y * this.speed;

    if (this.x < this.size/2) {
        this.v = createVector(random(1,10), random(-10, 10));
    } else if (this.x > width - this.size/2) {
        this.v = createVector(random(-10,-1), random(-10, 10));
    } else if (this.y < this.size/2) {
        this.v = createVector(random(-10,10), random(1, 10));
    } else if (this.y > height - this.size/2) {
        this.v = createVector(random(-10,10), random(-1, -10));
    }
    this.v.normalize();
    this.show();
}

handleHit(obj) {
    console.log("handleHit called");
    console.log(obj instanceof p5.Vector);

    if (obj instanceof Bullet) {
        console.log("Hit by bullet");
        if (!this.isDead(obj.damage)) {
            this.life -= obj.damage;
            console.log("enemy life: " + this.life);
        } else {
            game.screen.score += this.score;
            // Diesen Gegner aus Liste entfernen
            game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
        }
    } else if (obj instanceof p5.Vector) {
        console.log("hit by ship");
        if (!this.isDead(obj.crashDamage)) {
            this.life -= obj.crashDamage;
            console.log("enemy life: " + this.life);
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

    if (obj instanceof Bullet) {
        if ((obj.x+obj.size > this.x-this.w && obj.x-obj.size < this.x+this.w) &&
            (obj.y+obj.size > this.y-this.w && obj.y-obj.size < this.y+this.w)) {
                console.log("Hit by bullet");
            hit = true;
        }
    } else if (obj instanceof p5.Vector) {

        if ((obj.x > this.x-this.w && obj.x < this.x+this.w) &&
            (obj.y > this.y-this.w && obj.y < this.y+this.w)) {
                console.log("Hit by ship");
            hit = true;
        }
    } else {
        if (!hit) console.log("Hit by nothing");
    }


    // let next = 0;
    // this.vertices.forEach((v, i) => {
    //     // get next vertex in list
    //     // if we've hit the end, wrap around to 0
    //     next = i+1;
    //     if (next == this.vertices.length) next = 0;
    //     let vn = this.vertices[next];       // n for "next"
    //
    //     if (((v.y >= obj.y && vn.y < obj.y) || (v.y < obj.y && vn.y >= obj.y)) &&
    //         (obj.x < (vn.x-v.x)*(obj.y-v.y) / (vn.y-v.y)+v.x)) {
    //         hit = true;
    //         console.log("HIT!!");
    //     }
    // });

  //   for (let current = 0; current<this.vertices.length; current++) {

  //
  //       // compare position, flip 'collision' variable
  //       // back and forth
  // }

    // createVector(this.x-this.w, this.y-this.w), // Ecke links oben
    // createVector(this.x-this.a, this.y-this.w),
    // createVector(this.x, this.y-this.w-this.b), // Spitze oben
    // createVector(this.x+this.a, this.y-this.w),
    // createVector(this.x+this.w, this.y-this.w), // Ecke rechts oben
    // createVector(this.x+this.w, this.y-this.a),
    // createVector(this.x+this.w+this.b, this.y), // Spitze rechts
    // createVector(this.x+this.w, this.y+this.a),
    // createVector(this.x+this.w, this.y+this.w), // Ecke rechts unten
    // createVector(this.x+this.a, this.y+this.w),
    // createVector(this.x, this.y+this.w+this.b), // Spitze unten
    // createVector(this.x-this.a, this.y+this.w),
    // createVector(this.x-this.w, this.y+this.w), // Ecke links unten
    // createVector(this.x-this.w, this.y+this.a),
    // createVector(this.x-this.w-this.b, this.y), // Spitze links
    // createVector(this.x-this.w, this.y-this.a)

    return hit;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.life - dmg <= 0) return true;
    else return false;
}
}
