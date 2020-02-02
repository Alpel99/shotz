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
    if (obj instanceof Bullet) {
        if (dist(obj.x, obj.y, this.x, this.y) < this.size/2 + obj.size/2) {
            return true;
        } else return false;
    } else if (obj instanceof p5.Vector) {
        if (dist(obj.x, obj.y, this.x, this.y) < this.size/2) {
            return true;
        } else return false;
    }
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

    this.minsize = 50;
    this.maxsize = 250;
    this.size = floor(random(this.maxsize)) + this.minsize;  // = Größe = HP

    this.w = 30;
    this.speed = 1/(this.size*2)*speed;  // = @param: Geschwindigkeit von Lvl vorgegeben
    this.mainColor = 'black';
    this.secondaryColor = '#ddd';

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
    let a = this.w*2/5;
    let b = 3/5*this.w;
    let grundfläche = 3*((2*this.w)-2*(a));

    // Spikes
    fill(this.secondaryColor)
    let t_oben = triangle(this.x, this.y-this.w-b, this.x-(1.5*a), this.y-this.w+b, this.x+(1.5*a), this.y-this.w+b); // Spitze oben
    let t_rechts = triangle(this.x+this.w+b, this.y, this.x+this.w-b, this.y-(1.5*a), this.x+this.w-b, this.y+(1.5*a)); // Spitze rechts
    let t_unten = triangle(this.x, this.y+this.w+b, this.x+(1.5*a), this.y+this.w-b, this.x-(1.5*a), this.y+this.w-b); // Spitze unten
    let t_links = triangle(this.x-this.w-b, this.y, this.x-this.w+b, this.y+(1.5*a), this.x-this.w+b, this.y-(1.5*a));// Spitze links

    // Black main body
    fill(this.mainColor);
    // ellipse(this.x, this.y, this.size);
    beginShape();
    vertex(this.x-this.w, this.y-this.w);   // oben links
    vertex(this.x-a, this.y-this.w);
    vertex(this.x, this.y-this.w+b);               // oben mitte
    vertex(this.x+a, this.y-this.w);
    vertex(this.x+this.w, this.y-this.w);   // oben rechts
    vertex(this.x+this.w, this.y-a);
    vertex(this.x+this.w-b, this.y);               // rechts mitte
    vertex(this.x+this.w, this.y+a);
    vertex(this.x+this.w, this.y+this.w);   // unten rechts
    vertex(this.x+a, this.y+this.w);
    vertex(this.x, this.y+this.w-b);               // unten mitte
    vertex(this.x-a, this.y+this.w);
    vertex(this.x-this.w, this.y+this.w);   // unten links
    vertex(this.x-this.w, this.y+a);
    vertex(this.x-this.w+b, this.y);               // links mitte
    vertex(this.x-this.w, this.y-a);
    endShape(CLOSE);
}

update() {
    // calls this.show() as last step of update
    for (let i = 0; i < game.screen.ship.vectors.length; i++) {
        if (dist(game.screen.ship.vectors[i].x + game.screen.ship.x, game.screen.ship.vectors[i].y + game.screen.ship.y, this.x, this.y) < this.size/2) {
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
    console.log("handleHit called");
    // if (!this.isDead(bullet.damage)) {
    //     this.size -= bullet.damage;
    // } else {
    //     game.screen.score += this.score;
    //     // Diesen Gegner aus Liste entfernen
    //     game.screen.enemies.splice(game.screen.enemies.indexOf(this), 1);
    // }
}

isHit(bullet) {
    // returns true, if given bullet has hit this Enemy
    if ((bullet.x > this.x-this.w && bullet.x < this.x+this.w) &&
        (bullet.y > this.y-this.w && bullet.y < this.y+this.w)) {
        return true;
    } else return false;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.size - dmg <= this.minsize) return true;
    else return false;
}
}
