class Ship {
constructor(x, y, v) {
    this.x = x;
    this.y = y;
    //get the vectors form the ship
    this.vectors = v;
    this.prevangle = 0;
    this.angle = 0;
    this.color = color(255,0,0);

    //Player - from level
    this.crashDamage = 150;
    this.bulletspeed = 15;
    this.PlayerHP = 3;
    this.PlayerDMG = 10;
    this.PlayerSPD = 5;
    this.PlayerRNG = 500;
}

update() {
    //update the vectors from the ship
    this.angle = atan2(mouseY - this.y, mouseX - this.x) + PI*0.5;
    this.vectors.forEach(element => element.rotate(this.angle - this.prevangle));
    this.prevangle = this.angle;
    }

move() {
    if (keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
      this.x -= this.PlayerSPD;
    }
    if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
      this.x += this.PlayerSPD;
    }
    if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
      this.y -= this.PlayerSPD;
    }
    if(keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
      this.y += this.PlayerSPD;
    }

    var xmin = width;
    var ymin = height;
    var xmax = 0;
    var ymax = 0;

    for(let i = 0; i < this.vectors.length; i++) {
        if(this.vectors[i].x + this.x < xmin) {
            xmin = this.vectors[i].x + this.x;
        }
        if(this.vectors[i].y + this.y < ymin) {
            ymin = this.vectors[i].y + this.y;
        }
        if(this.vectors[i].x + this.x > xmax) {
            xmax = this.vectors[i].x + this.x;
        }
        if(this.vectors[i].y + this.y > ymax) {
            ymax = this.vectors[i].y + this.y;
        }
    }

    if(xmin < 0) {
        this.x = this.x + this.PlayerSPD;
    }
    if(ymin < 0) {
        this.y = this.y + this.PlayerSPD;
    }
    if(xmax > width) {
        this.x = this.x - this.PlayerSPD;
    }
    if(ymax > height) {
        this.y = this.y - this.PlayerSPD;
    }

}
}
