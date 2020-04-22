class Button {
  constructor(x, y, w, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.text = t;
    this.tsize = this.w/5;
    this.h = Math.round(w*3/8);
    this.d = Math.round(this.w/20);
  }

  draw() {
    push();
    rectMode(CENTER);
    if(this.hover() == true) {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        fill(255, 0, 0);
        rect(this.x, this.y, this.w - this.d*2, this.h - this.d*2);
        fill(0);
        textSize(this.tsize);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);
    } else {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        fill(128);
        rect(this.x, this.y, this.w - this.d*2, this.h - this.d*2);
        fill(0);
        textSize(this.tsize);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);
    }
    pop();
  }

  hover() {
    var a = false;
    if (mouseX > this.x-this.w/2 &&
        mouseX < this.x+this.w/2 &&
        mouseY > this.y - this.h/2 &&
        mouseY < this.y + this.h/2) {
        a = true;
    }
    return a;
  }

}
