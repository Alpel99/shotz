class Popup {
constructor(w, h, color1, color2, heading, text) {
  if(h < height) {
    this.height = h;
    this.y = (height-this.height)*0.5;
  } else {
    this.height = height;
    this.y = 0;
  }
  if(w < width) {
    this.width = w;
    this.x = (width-this.width)*0.5;
  } else {
    this.width = width;
    this.x = 0;
  }
  this.color0 = color(0, 220);
  this.color1 = color1;
  this.color2 = color2;
  //this.color1.setAlpha(100);
  //this.color2.setAlpha(100);
  this.heading = heading;
  this.text = text;
  this.close = new Button(this.x + this.width/2, this.y + this.height - (this.width/3)*3/8 + 10, this.width/3, "CLOSE");
  this.visible = false;
}

draw() {
  push();
  stroke(200);
  strokeWeight(5);
  fill(this.color0);
  rect(this.x,this.y,this.width,this.height);
  pop();
  push();
  textAlign(CENTER, CENTER);
  fill(this.color1);
  textSize(60);
  text(this.heading, width/2, this.y + 50);
  fill(this.color2);
  textSize(20);
  text(this.text, width/2 - this.width/2 + 15, this.y + 80, this.width - 30, this.height - this.close.h - 100);
  pop();
  this.close.draw();
}

}
