class Bullet {
constructor(color) {
this.visible = false;
this.color = color
this.damage = game.screen.ship.PlayerDMG * game.screen.ammo.damage;

}

show() {
    if (this.visible) {
        fill(game.screen.ammo.color);
        ellipse(this.x,this.y,this.size)
    }
}

start() {
    this.ammo = game.screen.ammo;
    this.size = game.screen.ship.PlayerDMG/2;
    this.x = game.screen.ship.vectors[0].x + game.screen.ship.x;
    this.y = game.screen.ship.vectors[0].y + game.screen.ship.y;
    this.xorig = this.x;
    this.yorig = this.y;
    this.v = createVector(mouseX - this.x, mouseY - this.y);
    this.v.normalize();
    this.visible = true;
}

update() {
    // calls this.show() as last step of update
    if (this.visible) {
        this.x = this.x + this.v.x * game.screen.ship.bulletspeed;
        this.y = this.y + this.v.y * game.screen.ship.bulletspeed;

        if(dist(this.x, this.y, this.xorig, this.yorig) > game.screen.ship.PlayerRNG) {
            this.visible = false;
        }

        game.screen.enemies.forEach((e) => {
            if (e.isHit(this)) {
                e.handleHit(this);
                this.visible = false;
            }
        });
        this.show();
    }
}
}
