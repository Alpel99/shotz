class Level_menu {
constructor() {
    this.color0 = color(15,15,128);
    this.color1 = color(128);
    this.levels = [
        new LevelMenuItem("Level1", user.experience.Level1.exp, user.experience.Level1.lvl*1000),
        new LevelMenuItem("Level2", user.experience.Level2.exp, user.experience.Level2.lvl*1000),
        new LevelMenuItem("Level3", user.experience.Level3.exp, user.experience.Level3.lvl*1000),
        new LevelMenuItem("Level4", user.experience.Level4.exp, user.experience.Level4.lvl*1000),
        new LevelMenuItem("Level5", user.experience.Level5.exp, user.experience.Level5.lvl*1000)
    ];
    this.page = 1;
    this.mod = 5;
    this.menuOverlay = new MenuOverlay();
    this.balls = [];
    for(let i = 0; i < 20; i++) {
        this.balls[i] = new ball();
    }
}

draw() {
    background(this.color0);
    this.balls.forEach(b => b.update());
    if (height > 800) this.mod = 5;
    else this.mod = 3;

    for(let i = (this.page-1)*this.mod; i < this.page*this.mod; i++) {
        if (i < this.levels.length) {
            this.levels[i].draw(this.levels[i].checkHover(), height/6 + 150*(i%this.mod));
        }
    }

    this.menuOverlay.draw();
}

back() {
    game.screen = new Start_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
        if ((keyCode === 68 ||
            keyCode === RIGHT_ARROW) && this.page <= (this.levels.length/this.mod)) {
            this.page++;
        }
        if ((keyCode === 65 ||
            keyCode === LEFT_ARROW) && this.page > 1) {
            this.page--;
        }
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
        if(this.levels[0].checkHover() === true) {
            game.screen = new Level1();
        } else
        if(this.levels[1].checkHover() === true) {
            console.log("Level2");
        } else
        if(this.levels[2].checkHover() === true) {
            console.log("Level3");
        }
    }
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
    var hover = false;
    push();
    textSize(50);
    if (mouseX > this.x &&
        mouseX < this.x + 10 + textWidth(this.text) &&
        mouseY > this.y &&
        mouseY < this.y + 50) {
        hover =  true;
    } else {
        hover =  false;
    }
    pop();
    return hover;
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

function ball() {
    this.x = random(width);
    this.z = random(40,100);
    this.xdiff = random(-5,5);
    this.y = random(-600,0);
    this.s = random(10,25);
    this.speed = map(this.s, 10, 25, 5, 2);
    this.c = color(random(0,255), random(0,255), random(0,255));
    this.touched = false;

    this.show = function() {
        push();
            noStroke();
            if(this.touched === false) {
                fill(255,180);
            } else {
                fill(this.c, 180);
            }
            ellipse(this.x,this.y,this.s);
        pop();
    }

    this.update = function() {
        this.x = this.x + this.xdiff;
        this.y = this.y + this.speed;
        this.z = this.z - 1;
        if (this.y > height + this.s) {
            this.y = 0;
            this.x = random(width);
            this.touched = false;
        }
        if (this.z < 0) {
            this.xdiff = this.xdiff + random(-2,2);
            if (this.xdiff > 3) {
                this.xdiff = 2;
            }
            if (this.xdiff < -3) {
                this.xdiff = -2;
            }
            this.z = random(40,100);
        }
        if (dist(this.x,this.y,mouseX,mouseY) < this.s/1.5) {
            this.touched = true;
        }
        this.show();
    }
}
