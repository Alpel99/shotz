class Post {
constructor(c0, c1, c2, lvl, l1, l2, l3, l4) {
    this.color0 = c0;
    this.color1 = c1;
    this.color2 = c2;
    this.lvl = lvl;
    //check with server:
    this.loot1 = l1;
    this.loot2 = l2;
    this.loot3 = l3;
    this.loot4 = l4;
    this.text = this.lvl.name;
    this.name = "post";

    this.menuOverlay = new MenuOverlay();
}

draw() {
    push();
    background(this.color0);
    textSize(65);
    textAlign(CENTER);
    fill(this.color1);
    text(this.text, width/2, height/2 - 200);

    push();
    textStyle(BOLD);
    text("GOOD GAME", width/2, height/2 - 100);
    pop();

    textSize(25);
    fill(this.color2);
    text("restart start by clicking or pressing enter \nexit with q", width/2, height/2);
    pop();

    push();
    textSize(65);
    textAlign(CENTER);
    fill(this.color1);
    text("Loot", width/2, height/2 + 90);
    textSize(25);
    fill(this.color2);
    text(this.loot1, width/2, height/2 + 150);
    text(this.loot2, width/2, height/2 + 200);
    text(this.loot3, width/2, height/2 + 250);
    text(this.loot4, width/2, height/2 + 300);
    pop();

    this.menuOverlay.draw();
}

back() {
    //go back to the same page?
    game.screen = new Level_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
        game.screen = new Level1();
    }
}
}
