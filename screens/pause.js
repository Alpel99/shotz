class Pause {
constructor(c0, c1, c2, lvl) {
    this.color0 = c0;
    this.color1 = c1;
    this.color2 = c2;
    this.lvl = lvl;
    this.text = this.lvl.name;
    this.name = "pause";
}

draw() {
    push();
    background(this.color0);
    textSize(65);
    textAlign(CENTER);
    fill(this.color1);
    text(this.text, width/2, height/2 - 150);
    textStyle(BOLD);
    text("PAUSE", width/2, height/2 - 25);
    textStyle(NORMAL);
    textSize(25);
    fill(this.color2);
    text("continue by clicking or pressing enter", width/2, height/2 + 50);
    pop();
    //drawAmmo
}

back() {
    this.lvl.mode = "run";
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
        this.lvl.mode = 'run';
    }
}
}
