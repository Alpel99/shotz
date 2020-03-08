class Shipskill_menu {
constructor() {
    this.color1 = color(255);
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.rdiff = random(-0.5,0.5);
    this.gdiff = random(-0.5,0.5);
    this.bdiff = random(-0.5,0.5);

    this.ships = [
    new Ship1(width/6, height/4),
    new Ship2(2 * width/6, height/4),
    //new Ship1(3 * width/6, height/4, color(255, 0, 128)),
    //new Ship1(4 * width/6, height/4, color(255, 0, 0)),
    //new Ship1(5 * width/6, height/4, color(255, 128, 255))
    ];

    this.menuOverlay = new MenuOverlay();
}

draw() {
    //this.r = this.r + 0.01;
    this.r = this.r + this.rdiff;
    this.g = this.g + this.gdiff;
    this.b = this.b + this.bdiff;
    if(this.r > 255 || this.r < 0) {
        this.r--;
        this.r = Math.abs(this.r);
        this.rdiff = random(-0.5,0.5);
    }
    if(this.g > 255 || this.g < 0) {
        this.g--;
        this.g = Math.abs(this.g);
        this.gdiff = random(-0.5,0.5);
    }
    if(this.b > 255 || this.b < 0) {
        this.b--;
        this.b = Math.abs(this.b);
        this.bdiff = random(-0.5,0.5);
    }
    background(this.r,this.g,this.b);

    this.ships.forEach(s => s.draw());
    this.menuOverlay.draw();
}

back() {
  game.screen = new Start_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
        for(let i = 0; i < this.ships.length; i++) {
            if(this.mouseHover(this.ships[i].pos.x, this.ships[i].pos.y, 150) == true) {
                game.screen = new Skill_menu(this.ships[i]);
                break;
            }
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
}
