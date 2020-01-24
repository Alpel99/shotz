class MenuOverlay {
constructor() {
this.money = user.money;


}
draw() {
//is used in all Menus
push();
fill(128);
textSize(40);
textStyle(NORMAL);
textAlign(LEFT, TOP);
strokeWeight(1);
stroke(255);
text(this.money, width - textWidth(this.money) - 95, 30);
pop();
//coin image
push();
imageMode(CORNER);
//image(coin, width - 100, 20);
pop();

}
}