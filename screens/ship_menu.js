class Ship_menu {
constructor() {
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.rdiff = random(-0.5,0.5);
    this.gdiff = random(-0.5,0.5);
    this.bdiff = random(-0.5,0.5);
    this.ship1 = new Ship1(width/3, height/4, color(255, 255, 0));
}

draw() {
    //this.r = this.r + 0.01;
    this.r = this.r + this.rdiff;
    this.g = this.g + this.gdiff;
    this.b = this.b + this.bdiff;
    if(this.r > 255 || this.r < 0) {
        this.r--;
        this.r = Math.abs(this.r);
        this.rdiff = random(-0.5,0.5);
    }
    if(this.g > 255 || this.g < 0) {
        this.g--;
        this.g = Math.abs(this.g);
        this.gdiff = random(-0.5,0.5);
    }
    if(this.b > 255 || this.b < 0) {
        this.b--;
        this.b = Math.abs(this.b);
        this.bdiff = random(-0.5,0.5);
    }
    background(this.r,this.g,this.b);

    this.ship1.draw();
}

back() {
  game.screen = new Start_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    }
}
}
