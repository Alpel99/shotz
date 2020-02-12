class LevelOverlay {
constructor() {
}

draw() {
    // HP Bar
    push();
    rectMode(CENTER);
    fill(0);
    var maxHP = game.screen.ship.baseHP + Math.round(game.screen.ship.getSkillIncrease(user.skillup.Ship1.HP));
    rect(width/2, 40, 300, 20, 5);
    rectMode(CORNER);
    fill(230,40,40);
    rect(width/2 - 148, 32, map(game.screen.ship.PlayerHP, 0, maxHP, 0, 296), 16, 5);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(13);
    textStyle(BOLD);
    text(game.screen.ship.PlayerHP + "/" + maxHP, width/2, 41);
    pop();

    // Text top left
    push();
    textSize(32);
    fill(game.screen.color2);
    textAlign(LEFT);
    text("Score: " + game.screen.score, 20, 40);
    text("Wave: " + game.screen.wave, 20, 80);
    pop();

    // Quickslot Bar
    push();
    for(let i = 0; i < user.items.length; i++) {
        user.items[i].draw();
    }
    pop();
}

controls(mode) {
    if (mode === 'keyPress') {
    for(let i = 0; i < user.items.length; i++) {
        if(keyCode == user.items[i].keyCode && user.items[i].counter == 0 && user.items[i].activeCounter == -1) {
            user.items[i].activate();
        }
    }
    } else if (mode === 'mousePress') {
    } else if (mode === 'mouseClick') {
    }
}
}