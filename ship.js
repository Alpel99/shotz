class Ship {
constructor(x, y, v) {
    this.x = x;
    this.y = y;
    //get the vectors form the ship
    this.vectors = v;
}

update() {
    //update the vectors from the ship
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    this.vectors.forEach(element => element.rotate(this.angle+PI*0.5));
    }

move() {
    
    if(keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
      this.x = this.x - game.screen.PlayerSPD;
    }
    if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
      this.x = this.x + game.screen.PlayerSPD;
    }
    if(keyIsDown(UP_ARROW)||keyIsDown(87)) {
      this.y = this.y - game.screen.PlayerSPD;
    }
    if(keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
      this.y = this.y + game.screen.PlayerSPD;
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
        this.x = this.x + game.screen.PlayerSPD;
    }
        if(ymin < 0) {
        this.y = this.y + game.screen.PlayerSPD;
    }
    if(xmax > width) {
        this.x = this.x - game.screen.PlayerSPD;
    }
    if(ymax > height) {
        this.y = this.y - game.screen.PlayerSPD;
    }

}
}
