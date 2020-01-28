class Enemy {
constructor() {
this.reset();
}
reset() {
    this.size = floor(random(game.screen.minsize, game.screen.maxsize));
    this.s = floor(random(4));
    //still kills you in corners (would say that's fine)
    if(this.s == 0) {
        this.x = this.size/2;
        this.y = random(this.size/2, height - this.size/2);
    }
    if (this.s == 1) {
        this.x = width - this.size/2;
        this.y = random(this.size/2, height - this.size/2);
    }
    if (this.s == 2) {
        this.x = random(this.size/2, width - this.size/2);
        this.y = this.size/2;
    }
    if (this.s == 3) {
        this.x = random(this.size/2, width - this.size/2);
        this.y = height - this.size/2;
    }
    if(dist(game.screen.ship.x, game.screen.ship.y, this.x, this.y) < this.size) {
        this.reset();
    }

    this.basespeed = (1/(this.size*2))*game.screen.speed;
    this.lock = false;
    if(game.screen.chase == false) {
        this.v = createVector(random(-10,10), random(-10, 10));
        this.v.normalize();
    }

}

show() {
    push();
    fill(game.screen.color1);
    ellipse(this.x, this.y, this.size);
    pop();
}

update() {
    for(let i = 0; i < game.screen.ship.vectors.length; i++) {
        if(dist(game.screen.ship.vectors[i].x + game.screen.ship.x, game.screen.ship.vectors[i].y + game.screen.ship.y, this.x, this.y) < this.size/2) {
            //Check with Server
            this.reset();
            if(game.screen.PlayerHP > 1) {
                game.screen.PlayerHP--;
            } else {
                game.screen.PlayerHP = 0;
                game.screen.end();
                return;
            }

        }
    }

    this.x = this.x + this.v.x*this.basespeed;
    this.y = this.y + this.v.y*this.basespeed;

    if(this.x < this.size/2) {
        this.v = createVector(random(1,10), random(-10, 10));
    }
    if(this.x > width - this.size/2) {
        this.v = createVector(random(-10,-1), random(-10, 10));
    }
    if(this.y < this.size/2) {
        this.v = createVector(random(-10,10), random(1, 10));
    }
    if(this.y > height - this.size/2) {
        this.v = createVector(random(-10,10), random(-1, -10));
    }
    this.v.normalize();
}
}