class Keys_menu {
constructor(ship) {
    this.color0 = color(200);
    this.color1 = color(0);
    this.menuOverlay = new MenuOverlay();
    this.name = "keys_menu";

    for(let i = 0; i < user.items.length; i++) {
        user.items[i].active = false;
    }
    this.mode = "skill";
    //modes -> select: skill/key
    this.resetButton = createGraphics(200, 75);
    this.resetButtonRed = createGraphics(200, 75);
    this.buttonDraw();
}

draw() {
    push();
    background(this.color0);
    for(let i = 0; i < user.items.length; i++) {
        user.items[i].draw();
        push();
        imageMode(CENTER);
        rectMode(CENTER);
        fill(0);
        rect(width/user.items.length*(i+0.5), height/1.5, 75, 75);
        image(img_item, (width/user.items.length)*(i+0.5), height/1.5);
        textSize(25);
        textAlign(CENTER, BOTTOM)
        text(String.fromCharCode(user.items[i].keyCode), width/user.items.length*(i+0.5), height/1.5 - 50);
        if(user.items[i].active == true) {
            push();
            noStroke();
            fill(64);
            rect(width/2 - 100, height/4, 100, 100);
            image(img_item, width/2 - 100, height/4);
            pop();
            this.mode = "key";
        }
        textSize(20);
        textAlign(LEFT);
        text("Standard Controls\nBack(in Menus): ESC/Backspace\n", 40, height - 150);
        pop();
    }

    imageMode(CENTER);
    if(mouseX > width*0.9 - 100 && mouseX < width*0.9 + 100 && mouseY > height - 188 && mouseY < height - 112) {
        image(this.resetButtonRed, width*0.9, height - 150);
    } else {
        image(this.resetButton, width*0.9, height - 150);
    }
    this.menuOverlay.draw();
}

back() {
    game.screen = new Start_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
        if(this.mode == "key") {
            var skill = user.items.find(element => element.active == true);
            skill.keyCode = keyCode;
            skill.active = false;
            this.mode = "skill";
        }
    } else if (mode === 'mousePress') {
        for(let i = 0; i < user.items.length; i++) {
            if(this.mouseHover((width/user.items.length)*(i+0.5), height/1.5, 75) == true) {
                for(let j = 0; j < user.items.length; j++) {
                    user.items[j].active = false;
                }
                user.items[i].active = true;
            }
        }
        if(mouseX > width*0.9 - 100 && mouseX < width*0.9 + 100 && mouseY > height - 188 && mouseY < height - 112) {
            user.items[0].keyCode = 49;
            user.items[1].keyCode = 50;
            user.items[2].keyCode = 51;
            user.items[3].keyCode = 52;
            user.items[4].keyCode = 53;
            user.items[5].keyCode = 69;
            user.items[6].keyCode = 82;
            user.items[7].keyCode = 84;
            user.items[8].keyCode = 70;
            user.items[9].keyCode = 81;
            //user.items[10].keyCode = 71;
        }
    } else if (mode === 'mouseClick') {
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

buttonDraw() {
    this.resetButton.background(0);
    this.resetButton.fill(128);
    this.resetButton.rect(10, 10, this.resetButton.width - 20, this.resetButton.height - 20);
    this.resetButton.fill(0);
    this.resetButton.textSize(40);
    this.resetButton.textAlign(CENTER, CENTER);
    this.resetButton.text("RESET", this.resetButton.width/2, this.resetButton.height/2);


    this.resetButtonRed.background(255);
    this.resetButtonRed.fill(255,0,0);
    this.resetButtonRed.rect(10, 10, this.resetButtonRed.width - 20, this.resetButtonRed.height - 20);
    this.resetButtonRed.fill(0);
    this.resetButtonRed.textSize(40);
    this.resetButtonRed.textAlign(CENTER, CENTER);
    this.resetButtonRed.text("RESET", this.resetButtonRed.width/2, this.resetButtonRed.height/2);
}

}