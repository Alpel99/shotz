class MenuOverlay {
constructor() {
    this.coin = createGraphics(50,50);
    this.drawCoin();
}

draw() {
    //is used in all Menus
    push();
    fill(game.screen.color1);
    textSize(40);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text(user.money, width - textWidth(user.money) - 95, 30);
    textSize(30);
    text("User: " + user.name, 20, 20);
    text("ID: " + user.id , 20, 60);
    pop();
    //coin image
    push();
    imageMode(CORNER);
    image(this.coin, width - 100, 20);
    pop();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    }
}

drawCoin() {
    this.coin.scale(1.4);
    this.coin.background(255,0);
    this.coin.fill(200,150,70);
    this.coin.ellipse(20,20,20);
    this.coin.stroke(160);
    this.coin.fill(200,200,40);
    this.coin.ellipse(20,20,15);
    this.coin.fill(200,150,70);
    this.coin.textAlign(CENTER, CENTER);
    this.coin.textSize(10);
    this.coin.stroke(160);
    this.coin.text("Z", 20, 21);
}
}
