class Level_menu {
constructor() {
    this.color0 = color(15,15,128);
    this.color1 = color(128);
    this.levels = [];
    this.levels[0] = new LevelMenuItem("Level1", 800, 1000);
    this.levels[1] = new LevelMenuItem("Level2", 200, 2000);
    this.levels[2] = new LevelMenuItem("Level3", 351, 1000);
    this.levels[3] = new LevelMenuItem("Level4", 351, 1000);
    this.levels[4] = new LevelMenuItem("Level5", 351, 1000);
    this.name = "level_menu"
    this.page = 1;
}

draw() {
//fix this?
    background(this.color0);
    try {
        if(height > 800) {
            for(let i = (this.page - 1)*5; i < this.page*5; i++) {
                this.levels[i].draw(this.levels[i].checkHover(), height/6 + 150*(i%5));
            }
        }
        else {
            for(let i = (this.page - 1)*3; i < this.page*3; i++) {
                this.levels[i].draw(this.levels[i].checkHover(), height/6 + 150*(i%3));
            }
        }
    } catch(error) {
        //console.log(error);
    }
}

back() {
    game.screen = new Start_menu();
}
}

class LevelMenuItem {
constructor(t, exp, maxexp) {
    this.x = width/3 - 100;
    this.text = t;
    this.exp = exp;
    this.maxexp = maxexp;
}

draw(hover, y) {
    this.y = y;
    push();
    fill(game.screen.color1);
    textAlign(LEFT, TOP);
    textSize(50);
    if(hover === false) {
        textStyle(NORMAL);
    } else {
        textStyle(BOLD);
    }
    text(this.text, this.x, this.y);
    pop();
    this.drawExp();
}

checkHover() {
    push();
    textSize(50);
    if(mouseX > this.x && mouseX < this.x + 10 + textWidth(this.text) && mouseY > this.y && mouseY < this.y + 50) {
        return true;
    } else {
        return false;
    }
    pop();
}

drawExp() {
    push();
    fill(0);
    rect(this.x - 320, this.y + 5, 300, 30);
    var expn = map(this.exp, 0, this.maxexp, 0, 294);
     if(this.maxexp == 0) {
        expn = 294;
     }
    fill(245, 203, 66, map(this.exp, 0, this.maxexp, 30, 255));
    rect(this.x - 317, this.y + 8, expn, 24);
    pop();
    push();
    fill(game.screen.color1);
    textSize(20);
    textAlign(CENTER, BOTTOM);
    text(Math.floor(this.exp) + "/" + this.maxexp + " exp", this.x - 160, this.y + 5);
    pop();
}
}