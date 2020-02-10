class Bullet {
constructor(shooter, color, dir, start) {
    this.shooter = shooter;                          // Who shot? Aktuell nur game.screen.ship, aber perspektivisch auch Enemies
    this.color = color;                              // bullet color - ammo color auf diese Weise übergeben?
    this.pos = createVector(start.x, start.y);       // current bullet position
    this.vel = createVector(dir.x, dir.y);           // shoot direction vector
    this.start = createVector(start.x, start.y);     // bullet start position

    this.damage = this.shooter.PlayerDMG;
    this.ammo = game.screen.ammo;
    this.size = this.shooter.PlayerDMG/2;
}

show() {
    push();
        stroke(game.screen.ammo.color);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    pop();
}

update() {
    this.vel.mag(this.shooter.bulletspeed);
    this.pos.add(p5.Vector.mult(this.vel, dt)); // anstatt this.pos.add(this.vel) - für framerate control
                                                // die statische Methode p5.Vector.mult() erzeugt neuen Vektor und korrumpiert nicht die Magnitude von this.vel

    // bullet surpasses max range (= hitsWall)
    if (this.pos.dist(this.start) > this.shooter.PlayerRNG) {
        // bullet aus Liste entfernen
        this.shooter.bullets.splice(this.shooter.bullets.indexOf(this), 1);
    }

    // bullet hits enemy
    game.screen.enemies.forEach((e) => {
        if (e.isHit(this)) {
            e.handleHit(this);
            // bullet aus Liste entfernen
            this.shooter.bullets.splice(this.shooter.bullets.indexOf(this), 1);
        }
    });
    this.show();
}
}

class Laser extends Bullet {
    constructor(shooter, color, dir, start) {
        super(shooter, color, dir, start);
        this.w = 15;
    }

    show() {
        push();
            stroke(game.screen.ammo.color || this.color);
            strokeWeight(this.damage/5 || 1);

            line(this.pos.x, this.pos.y, (this.pos.x+this.vel.x), (this.pos.y+this.vel.y));
        pop();
    }
}
