class Bullet {
constructor() {
this.visible = false;
}

show() {
    if(this.visible == true) {
    push();
    fill(game.screen.ammo.color);
    ellipse(this.x,this.y,this.size)
    pop();
    }
}

start() {
    this.ammo = game.screen.ammo;
    this.size = game.screen.PlayerDMG/2;
    this.x = game.screen.ship.x;
    this.y = game.screen.ship.y;
    this.xorig = this.x;
    this.yorig = this.y;
    this.v = createVector(mouseX - this.x, mouseY - this.y);
    this.v.normalize();
    this.visible = true;
}

update() {
    if(this.visible == true) {
        this.x = this.x + this.v.x * game.screen.bulletspeed;
        this.y = this.y + this.v.y * game.screen.bulletspeed;

        if(dist(this.x, this.y, this.xorig, this.yorig) > game.screen.PlayerRNG) {
            this.visible = false;
        }

        for(let i = 0; i < game.screen.enemies.length; i++) {
            if(dist(this.x, this.y, game.screen.enemies[i].x, game.screen.enemies[i].y) < game.screen.enemies[i].size/2 + this.size/2) {
                if(game.screen.enemies[i].size > game.screen.minsize + game.screen.PlayerDMG * game.screen.ammo.damage) {
                    game.screen.enemies[i].size = game.screen.enemies[i].size - game.screen.PlayerDMG * game.screen.ammo.damage;
                    this.visible = false;
                } else {
                    game.screen.score++;
                    game.screen.enemies[i].reset();
                    this.visible = false;

                    if(game.screen.score >= game.screen.scoreMax) {
                        game.screen.score = 0;
                        if(game.screen.wave < game.screen.waveMax) {
                            game.screen.wave++;
                        } else {
                            //game.screen = new Post();
                        }
                        game.screen.speed += game.screen.speedincrease;
                        for(let i = 0; i < game.screen.enemies.length; i++) {
                            game.screen.enemies[i].reset();
                        }
                    }
                }
            }
        }
    }
}
}