/*IMPORTANT:
 *der 0te Vektor im vectors array muss die Spitze sein (dort wo die Kugeln herausschießen)
 *Lösung für 2 Vektoren (Doppelschuss) mit 0 & 1?
*/
class Ship {
constructor() {
    this.x = width/2;
    this.y = height/2;

    //get the vectors form the ship
    this.prevangle = 0;
    this.angle = 0;

    //Player - from level
    this.bulletspeed = 15;
    this.PlayerHP = 3;
    this.PlayerDMG = 10;
    this.PlayerSPD = 5;
    this.PlayerRNG = 500;
    this.img = createGraphics(150,150);
}

update() {
    //update the vectors from the ship
    this.angle = atan2(mouseY - this.y, mouseX - this.x) + PI*0.5;
    this.vectors.forEach(element => element.rotate(this.angle - this.prevangle));
    this.prevangle = this.angle;
    this.move();
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

class Ship1 extends Ship {
constructor(x, y, c) {
    super();
    this.x = x;
    this.y = y;
    //get the vectors form the ship
    this.vectors = [];

    this.color = c;
    //this.color = color(255,0,0);

    //Player - from level
    this.bulletspeed = 15;
    this.PlayerHP = 3;
    this.PlayerDMG = 10;
    this.PlayerSPD = 5;
    this.PlayerRNG = 500;
    
    this.createVectors();
}

createVectors() {
    push();
    translate(75,75);
    //Flügel
    this.vectors[3] = createVector(-30, 20);
    this.vectors[1] = createVector(-40, -20);
    this.vectors[2] = createVector(0, 20);
    this.vectors[9] = createVector(-this.vectors[3].x, 20);
    this.vectors[10] = createVector(-this.vectors[1].x, -20);

    //Main
    this.vectors[0] = createVector(0, -50);
    this.vectors[4] = createVector(-30, 20);
    this.vectors[5] = createVector(30, 20);

    //White
    this.vectors[6] = createVector(-20, 20);
    this.vectors[11] = createVector(-this.vectors[6].x, 20);

    //Bridge
    this.vectors[7] = createVector(0, -5);
    this.vectors[8] = createVector(5, 10);
    this.vectors[12] = createVector(-this.vectors[8].x, 10);
    pop();
}

draw() {
    push();
        this.img.push();
        this.img.clear();
        this.img.translate(75,75);
        this.img.stroke(128);
        this.img.strokeWeight(2);
        this.img.fill(0);
    
        //Wings
        this.img.triangle(this.vectors[3].x,this.vectors[3].y,this.vectors[1].x,this.vectors[1].y,this.vectors[2].x,this.vectors[2].y);
        this.img.triangle(this.vectors[9].x,this.vectors[9].y,this.vectors[10].x,this.vectors[10].y,this.vectors[2].x,this.vectors[2].y);
    
        //Main
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[4].x,this.vectors[4].y,this.vectors[5].x,this.vectors[5].y);
    
        //Color
        this.img.fill(this.color);
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[4].x,this.vectors[4].y,this.vectors[6].x,this.vectors[6].y);
        this.img.triangle(this.vectors[0].x,this.vectors[0].y,this.vectors[5].x,this.vectors[5].y,this.vectors[11].x,this.vectors[11].y);
    
        //Bridge
        this.img.fill(230);
        this.img.triangle(this.vectors[7].x,this.vectors[7].y,this.vectors[8].x,this.vectors[8].y,this.vectors[12].x,this.vectors[12].y);
        this.img.pop();
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    pop();
}
}
