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
    fill(game.screen.color1);
    ellipse(this.x, this.y, this.size);
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

isHit(bullet) {
    // returns true, if given bullet has hit this Enemy
    if (dist(bullet.x, bullet.y, this.x, this.y) < this.size/2 + bullet.size/2) {
        return true;
    } else return false;
}

isDead(dmg) {
    // returns true, if given amount of dmg reduces life to or below zero
    if (this.size - dmg <= this.minsize) return true;
    else return false;
}
}
