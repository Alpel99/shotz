class Ship_menu {
constructor() {
this.r = random(0,255);
this.g = random(0,255);
this.b = random(0,255);
this.rdiff = random(-1,1);
this.gdiff = random(-1,1);
this.bdiff = random(-1,1);
}

draw() {
//this.r = this.r + 0.01;
this.r = this.r + this.rdiff;
this.g = this.g + this.gdiff;
this.b = this.b + this.bdiff;
if(this.r > 255 || this.r < 0) {
    this.r--;
    this.r = Math.abs(this.r);
    this.rdiff = random(-1,1);
}
if(this.g > 255 || this.g < 0) {
    this.g--;
    this.g = Math.abs(this.g);
    this.gdiff = random(-1,1);
}
if(this.b > 255 || this.b < 0) {
    this.b--;
    this.b = Math.abs(this.b);
    this.bdiff = random(-1,1);
}
background(this.r,this.g,this.b);
}

back() {
  game.screen = new Start_menu();

}
}
