class Shop_menu {
  constructor() {
    this.color0 = color(0);
    this.color1 = color(255);
    this.color2 = color(0);
    this.s = 20;
    this.w = width/this.s;
    this.h = height/this.s;
    this.offset = 0;
    this.offdiff = 0.0003;

    this.pickMode = "ship";
    //ship, color

    this.applyButton = createGraphics(100, 38);
    this.applyButtonRed = createGraphics(100, 38);
    this.drawButton();


    this.ships = [
    new Ship1(2 * width/10, height/4),
    new Ship2(3 * width/10, height/4),
    //new Ship1(3 * width/6, height/4, color(255, 0, 128)),
    //new Ship1(4 * width/6, height/4, color(255, 0, 0)),
    //new Ship1(5 * width/6, height/4, color(255, 128, 255))
    ];

    this.menuOverlay = new MenuOverlay();
  }

  draw() {
    this.background();
    this.text();
    this.ships.forEach(s => s.draw());
    this.adjust();

    this.menuOverlay.draw();
  }

  adjust() {
    if(this.pickMode == "color") {
        this.pickship.color = this.colorPicker.color();
        this.pickship.draw();
    }
  }

  text() {
    push();
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textSize(35);
    fill(this.color2);
    text("Repaint: ", 40, height/4 - 20)
    this.cpx = textWidth("Repaint: ");
    pop();

    push();
    imageMode(CENTER);
    if(mouseX > 50 && mouseX < 150 && mouseY > height/4 - 5 && mouseY < height/4 + 45) {
        image(this.applyButtonRed, 100, height/4 + 20);
    } else {
        image(this.applyButton, 100, height/4 + 20);
    }

    pop();
  }
  background() {
    background(this.color0);
    noStroke();
    for(let i = 0; i < this.w; i++) {
      for(let j = 0; j < this.h; j++) {
        fill(color(noise(i+this.offset*0.4*20,j+this.offset*2.3*20)*255));
        rect(i*this.s,j*this.s,this.s,this.s);
      }

    }
    this.offset += this.offdiff;
    if(this.offset > 1000 || this.offset < 0) {
      this.offdiff = this.offdiff*-1;
    }
  }

  controls(mode) {
      if (mode === 'keyPress') {
      } else if (mode === 'mousePress') {
      } else if (mode === 'mouseClick') {
        for(let i = 0; i < this.ships.length; i++) {
            if(this.mouseHover(this.ships[i].x, this.ships[i].y, 150) == true && this.pickMode == "ship") {
                this.colorPicker = createColorPicker(color(user.ships[this.ships[i].constructor.name].color[0], user.ships[this.ships[i].constructor.name].color[1], user.ships[this.ships[i].constructor.name].color[2], user.ships[this.ships[i].constructor.name].color[3]));
                this.colorPicker.position(this.cpx + 50, height/4-20);
                this.pickMode = "color";
                this.pickship = this.ships[i];
                break;
            }
        }
        //APPLY
        if(mouseX > 50 && mouseX < 150 && mouseY > height/4 - 5 && mouseY < height/4 + 45 && this.pickMode == "color") {
          user.money -= 50;
          console.log(user.money);
          for(let i = 0; i < 4; i++) {
            console.log(this.pickship.constructor.name);
            user.ships[this.pickship.constructor.name].color[i] = this.colorPicker.color().levels[i];
          }
          this.removePickers();
        }
      }
  }

  mouseHover(x, y, size) {
      //Center from rectagnle that mouse hovers
      var hover = false;
      if(mouseX > x-size/2 && mouseX < x+size/2 && mouseY > y-size/2 && mouseY < y+size/2) {
          hover = true;
      }
      return hover;
  }

  back() {
    if(this.pickMode == "ship") {
      this.removePickers();
      game.screen = new Start_menu();
    } else {
      this.removePickers();
    }
  }

  removePickers() {
    var inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].parentElement.removeChild(inputs[i]);
    }
    this.pickMode = "ship";
  }

  drawButton() {
    this.applyButton.background(0);
    this.applyButton.fill(128);
    this.applyButton.rect(5, 5, this.applyButton.width - 10, this.applyButton.height - 10);
    this.applyButton.fill(0);
    this.applyButton.textSize(20);
    this.applyButton.textAlign(CENTER, CENTER);
    this.applyButton.text("APPLY", this.applyButton.width/2, this.applyButton.height/2);


    this.applyButtonRed.background(255);
    this.applyButtonRed.fill(255,0,0);
    this.applyButtonRed.rect(5, 5, this.applyButtonRed.width - 10, this.applyButtonRed.height - 10);
    this.applyButtonRed.fill(0);
    this.applyButtonRed.textSize(20);
    this.applyButtonRed.textAlign(CENTER, CENTER);
    this.applyButtonRed.text("APPLY", this.applyButtonRed.width/2, this.applyButtonRed.height/2);
  }

}