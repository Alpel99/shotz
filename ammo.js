
class Ammo {
constructor(d, a, c) {
    this.amount = a;
    this.damage = d;
    this.color = c;
}

draw() {
img_item.clear();
img_item.push();
img_item.noStroke();
img_item.translate(25,25);
img_item.fill(this.color);
img_item.ellipse(0, 15, 12, 15);

img_item.fill(0);
img_item.rect(-5, -5, 10, 15, 3);

img_item.fill(255);
img_item.rect(-6,-5,2,20,4);
img_item.rect(-2,-5,4,22,2);
img_item.rect(4,-5,2,20,4);

//real ammo
img_item.fill(this.color);
img_item.rect(-4,-5,8,-19,5);
img_item.strokeWeight(1);
img_item.stroke(this.color);
img_item.line(-4,-5,-6,-10);
img_item.line(4,-5,6,-10);
img_item.line(4,-3,10,-8);
img_item.line(-4,-3,-10,-8);
img_item.pop();
}
}



class Item {
constructor(use, a) {
    this.use = use;
    this.amount = a;
}

draw() {
img_item.clear();
switch (this.use) {
    case "ISH":
        img_item.push();
        img_item.noFill();
        img_item.stroke(0, 255, 255);
        img_item.strokeWeight(6);
        img_item.ellipse(25,25,32);
        img_item.pop();
        break;
    case "MINE":
        img_item.push();
        img_item.fill(200,0,0);
        img_item.noStroke();
        img_item.triangle(20,25,30,25,25,2);
        img_item.triangle(20,25,30,25,25,48);
        img_item.triangle(25,20,25,30,2,25);
        img_item.triangle(25,20,25,30,48,25);
        img_item.fill(128,0,0);
        img_item.ellipse(25,25,30);
        img_item.pop();
        break;
    case "EMP":
        img_item.push();
        img_item.fill(255);
        img_item.stroke(255);
        img_item.triangle(40, 10, 35, 5, 10, 20);
        img_item.triangle(10, 20, 20, 18, 40, 25);
        img_item.triangle(40, 25, 32, 22, 15, 40);
        img_item.triangle(17, 32, 28, 40, 15, 42);
        img_item.pop();
        break;
    case "SPECIAL":
        break;
}
}

}

