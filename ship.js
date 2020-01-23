class Ship {
constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c; //wie geht das
}

draw(a) {
    this.angle = atan2(mouseY - this.y, mouseX - this.x);


    //draw the ship, get new vectors for ship


    push();
    vectorsShip1();
    ship1_vectors.forEach(element => element.rotate(this.angle+PI*0.5));
    img_ship1 = createGraphics(150,150);
    drawShip1(this.color);
    //mach das ordentlich
    imageMode(CENTER);
    image(img_ship1, this.x, this.y);
    img_ship1.remove();
    pop();
    }
}