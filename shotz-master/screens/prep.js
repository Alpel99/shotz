class Prep {
constructor(c0, c1, c2, lvl) {
    this.color0 = c0;
    this.color1 = c1;
    this.color2 = c2;
    this.lvl = lvl;
    this.text = this.lvl.name;
    this.name = "prep";
}

draw() {
    push();
    background(this.color0);
    textSize(65);
    textAlign(CENTER);
    fill(this.color1);
    text(this.text, width/2, height/2 - 200);
    textSize(25);
    fill(this.color2);
    text("start by clicking or pressing enter \nmove with WASD and doge the green targets \n aim with the mouse for the targets and shoot with space or left mouse button", width/2, height/2 - 50);
    pop();
    //drawAmmo
}

back() {
    game.screen = new Level_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode === ENTER) this.lvl.mode = 'run';
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
        this.lvl.mode = 'run';
    }
}
}
