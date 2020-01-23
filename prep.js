class Prep {
constructor(c0, c1, c2) {
    this.color0 = c0;
    this.color1 = c1;
    this.color2 = c2
    this.name = "prep";
}

draw() {
    push();
    background(this.color0);
    text(game.screen.name, width/2, height/2 - 200);

}
}