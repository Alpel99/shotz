class Mine {
    constructor(pos, dmg, rng) {
        this.pos = pos.copy();
        this.damage = dmg;
        this.range = rng;
        this.ts = millis();
        this.blinkOffset = random(10);
        this.size = 50;
        this.id = game.generateID();
        this.triggered = false;

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
            // if ((Math.floor(millis() + this.blinkOffset / 1000) ) % 2 === 0) {
            if ((Math.floor(millis() / 1000) ) % 2 === 0) {
                fill('red');
            } else {
                fill('yellow');
            }
            ellipse(this.pos.x, this.pos.y, this.size/2);
            textSize(15);
            // // id
            // text(this.id, this.pos.x+30, this.pos.y+30);
            // range
            noFill();
            stroke(color(255,0,0,50));
            ellipse(this.pos.x, this.pos.y, this.range);
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
        this.triggered = true;
        const index = 0;
        for (let i = 0; i < game.screen.ship.mines.length; i++) {
            let mine = game.screen.ship.mines[i];
            if (mine.triggered) {
                game.screen.ship.mines.splice(i, 1);
                break;
            }
        }
        let betroffen = 0;
        game.screen.enemies.forEach((e) => {
            let toEnemy = createVector(e.pos.x-this.pos.x, e.pos.y-this.pos.y);

            if (toEnemy.mag() <= this.range) {

                // prüfen, ob der Gegner schon von diesem push() betroffen ist
                let foundPush = false;
                e.pushes.forEach(push => {
                    if (push.id === e.pushes[e.pushes.length-1].id) foundPush = true;
                });

                // falls nicht füge ein push() hinzu
                if (e.pushes.length === 0 || foundPush === false) {
                    // Rückstoß
                    toEnemy.mult(this.range/toEnemy.mag()); // Stärke des Effektes abhängig von Entfernung zum Gegner

                    // Funktion dem Enemy.pushes-Array hinzufügen
                    let p = {
                        id: game.generateID(),
                        fn: e.push.bind(e, toEnemy.mult(1/60), 1000, millis())
                    }
                    e.pushes.push(p);

                    // Schaden
                    // e.color = 'black';
                    e.handleHit(this);
                }
                betroffen++;
            }
        });
        console.log(betroffen);
        // Explosionsanimation
        explosion(
            this.pos,
            this.range,
            game.screen.color1,
            millis(),
            game.effects
        )
        screenshake(20, millis(), game.effects);
    }
}
