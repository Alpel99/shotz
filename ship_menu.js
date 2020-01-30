class Ship_menu {
constructor() {
this.r = 128;
this.g = 128;
this.b = 128;

}

draw() {
//this.r = this.r + 0.01;
this.r = noise(this.r)*255;
this.g = noise(this.g)*255;
this.b = noise(this.b)*255;
background(this.r,this.g,this.b);
}
}