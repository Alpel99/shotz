let img_ammo;
class Ammo {
constructor(d, a, c) {
    this.amount = a;
    this.damage = d;
    this.color = c;
    img_ammo = createGraphics(50,50);
}
decrease() {
    this.amount--;
}
draw() {
img_ammo.remove();
img_ammo = createGraphics(50,50);

img_ammo.noStroke();
img_ammo.translate(25,25);
img_ammo.fill(this.color);
img_ammo.ellipse(0, 15, 12, 15);

img_ammo.fill(0);
img_ammo.rect(-5, -5, 10, 15, 3);

img_ammo.fill(255);
img_ammo.rect(-6,-5,2,20,4);
img_ammo.rect(-2,-5,4,22,2);
img_ammo.rect(4,-5,2,20,4);

//real ammo
img_ammo.fill(this.color);
img_ammo.rect(-4,-5,8,-19,5);
img_ammo.strokeWeight(1);
img_ammo.stroke(this.color);
img_ammo.line(-4,-5,-6,-10);
img_ammo.line(4,-5,6,-10);
img_ammo.line(4,-3,10,-8);
img_ammo.line(-4,-3,-10,-8);

}
}

