class Credits {
  constructor() {
    this.color0 = color(0);
    this.color1 = color(255,0,0);
    this.speed = 0.5;

    this.diff = 175;
    this.start = 100;
    this.items = [
      new CreditsItem("J&P", width/2, this.start),
      new CreditsItem("Bananensosse", width/2, this.start+this.diff),
      new CreditsItem("Music: by myself", width/2, this.start+this.diff*2),
      new CreditsItem("Additional sound effects from https://www.zapsplat.com", width/2, this.start+this.diff*3)
    ];
  }

  draw() {
    background(game.screen.color0);
    this.items.forEach(i => i.update());
  }

  back() {
    game.screen = new Start_menu();
  }

  controls(mode) {
      if (mode === 'keyPress') {
        this.speed += 0.1;
      } else if (mode === 'mousePress') {
      } else if (mode === 'mouseClick') {
        this.speed += 0.1;
      }
  }

}

class CreditsItem {
  constructor(string, x, y) {
    this.string = string;
    this.x = x;
    this.y = y;
  }

  draw() {
    push();
      textSize(55);
      fill(game.screen.color1);
      textAlign(CENTER);
      text(this.string, this.x, this.y);
    pop();
  }

  update() {
    this.draw();
    this.y += game.screen.speed;
    if(this.y > height + 40 && this.y > game.screen.start + game.screen.diff*(game.screen.items.length)) {
      this.y = -30;
    }
  }
}
