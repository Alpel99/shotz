// Explosion (für Minen und evtl. explosive shots)

function explosion(pos, range, color, ts, loop) {
    let explRange = 0;     // current range
    let particles = [];    // container for particle effects
    let expl_id = game.generateID();
    let expl_sound = game.sounds.explosion1;

    function explode() {
        const tDiff = millis()-ts;

        if (!expl_sound.isPlaying()) expl_sound.play();

        push();
            if (Math.floor(tDiff/25) <= 1) {
                noStroke();
                fill(255, 255, 255, 100);
                ellipse(pos.x, pos.y, range*1, range*0.2);
            } else if (Math.floor(tDiff/25) <= 2) {
                noStroke();
                fill(0);
                ellipse(pos.x, pos.y, range*0.6);
            } else if (Math.floor(tDiff/25) <= 3) {
                noStroke();
                fill(255);
                ellipse(pos.x, pos.y, range*0.6);
            } else if (Math.floor(tDiff/25) <= 4) {
                noStroke();
                fill(0);
                ellipse(pos.x, pos.y, range*0.6);
            } else if (Math.floor(tDiff/25) <= 5) {
                noStroke();
                fill(255);
                ellipse(pos.x, pos.y, range*0.6);
            }
        pop();

        if (explRange < range) {
            explRange = (millis() - ts)/5;

            while (particles.length < 50) {
                let randR = random(explRange/2);
                let randAngle = random()*360;
                let curTS = millis();
                let vector = createVector(random()*explRange/2, 0);

                vector.rotate(randAngle);
                vector.add(pos.x, pos.y);
                particles.push(new ExplosionParticle(vector, randR, color, curTS));
            }
        } else if (explRange > range) {
            // expl_sound.stop();
            let index = loop.filter(e => e.id = expl_id);
            loop.splice(index, 1);
        }


        particles.forEach((particle) => {particle.draw();});
    }

    class ExplosionParticle {
        constructor(pos, range, color, ts) {
            this.pos = pos;
            this.range = range;
            this.color = color;
                // this.color.setAlpha(100);
            this.color2 = color;
                // this.color2.setRed  ((color.levels[0] + 40 < 255) ? color.levels[0]+40 : 255);
                // this.color2.setGreen((color.levels[1] - 40 > 0)   ? color.levels[1]-40 : 0);
                // this.color2.setBlue ((color.levels[2] - 40 > 0)   ? color.levels[2]-40 : 0);
                // this.color2.setAlpha(100);
            this.ts = ts;
            this.r = 0;
        }

        draw() {
            if (this.r < this.range) {
                push();
                    noStroke();
                    fill(this.color2);
                    circle(this.pos.x, this.pos.y, this.r+10);
                    fill(this.color);
                    circle(this.pos.x, this.pos.y, this.r);
                pop();
                this.r = (millis() - this.ts)/5;
            } else {
                particles.splice(particles.indexOf(this), 1);
            }
        }
    }

    index = loop.length;
    loop.push({
        fn: explode,
        id: expl_id
    });
}
