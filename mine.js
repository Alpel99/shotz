class Mine {
    constructor(pos, dmg, rng) {
        this.pos = pos.copy();
        this.damage = dmg;
        this.range = rng;
        this.ts = millis();
        this.blinkOffset = random(10);
        this.size = 50;
        this.id = game.generateID();
        console.log(this.id);
        console.log(game.effects);

        this.l1 = this.pos.copy().sub(createVector(-this.size/2, -this.size/2));
        this.l2 = this.pos.copy().sub(createVector( this.size/2,  this.size/2));
        this.l3 = this.pos.copy().sub(createVector(-this.size/2,  this.size/2));
        this.l4 = this.pos.copy().sub(createVector( this.size/2, -this.size/2));
    }

    draw() {
        // Mine zeichnen
        push();
            stroke(200);
            strokeWeight(3);
            // this.l1.rotate(degrees(Math.floor(millis())/10));
            line(this.pos.x, this.pos.y, this.l1.x, this.l1.y);
            line(this.pos.x, this.pos.y, this.l2.x, this.l2.y);
            line(this.pos.x, this.pos.y, this.l3.x, this.l3.y);
            line(this.pos.x, this.pos.y, this.l4.x, this.l4.y);

            stroke(0);
            strokeWeight(1);
            fill(color(30, 30, 30));
            ellipse(this.pos.x, this.pos.y, this.size);
            if ((Math.floor(millis() + this.blinkOffset / 1000) ) % 2 === 0) {
                fill('red');
            } else {
                fill('yellow');
            }
            ellipse(this.pos.x, this.pos.y, this.size/2);
        pop();

        // collision check und trigger
        game.screen.enemies.forEach((e) => {
            if (e.isHit(this)) {
                this.trigger();
            }
        });
    }

    trigger() {
        // Mine aus der Liste in Ship.mines entfernen
        const index = game.screen.ship.mines.filter(mine => mine.id === this.id);
        console.log(index);
        game.screen.ship.mines.splice(index, 1);

        game.screen.enemies.forEach((e) => {

            let toEnemy = createVector(e.pos.x-this.pos.x, e.pos.y-this.pos.y);

            if (toEnemy.mag() <= this.range) {
                if (!e.empActive) {
                    // Rückstoß
                    toEnemy.mult(this.range/toEnemy.mag()); // Stärke des Effektes abhängig von Entfernung zum Gegner

                    let ts = millis();

                    // Funktionsreferenz speichern
                    let fn = e.push.bind(e, toEnemy.mult(1/60), 1000, ts);

                    // Funktion dem Enemy.pushes-Array hinzufügen
                    e.pushes.push(fn);
                    e.empActive = true;

                    // Schaden
                    e.handleHit(this);
                }
            }
        });

        // Explosionsanimation
        explosion(
            this.pos,
            this.range,
            game.screen.color1,
            millis(),
            game.effects
        )
    }
}
