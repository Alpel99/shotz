class Game {
    constructor() {
        this.screen = new Start_menu();
        this.setup = false;
        this.menuOverlay = new MenuOverlay();
    }

draw() {
    this.screen.draw();

    if (this.setup == false) {
        try {
            this.screen.setup();
        } catch(error) {
        }
        this.setup = true;
    }
}

controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode === ESCAPE ||
            //keyCode === 81 || //Q
            keyCode === BACKSPACE) {
            if (this.screen.back()) this.screen.back();
        }
    }
    this.screen.controls(mode);
}

choosePowerUp(x, y) {
    // Chooses one powerup from powerups-object randomly and pushes it to ship.mods
    let pu = powerups[Math.floor(Math.random()*powerups.length)];
    this.screen.ship.mods.push({
        type: 'pickup',
        draw: this.wrapDraw(x, y, pu),
        onPickup: this.wrapOnPickup(pu),
        timestamp: millis()
    });
}

wrapDraw(x, y, pu) {
    // wraps draw() for context variables/parameter
    return function() {pu.pickup.draw(x, y, pu)};
}

wrapOnPickup(pu) {
    // wraps onPickup() for context variables/parameter
    return function() {pu.pickup.onPickup(pu)};
}

drawPickup(x, y, pu, content) {
    /*
    *  Parameter:
    *  x, y:    Position des getöteten Gegners (dort wird pickup dargestellt)
    *  pu:      Referenz zum richtigen PowerUp-Objekt
    *  content: Aussehen des pickups (innerhalb des gelben Rahmens - bisher nur Buchstabenkürzel)
    */

    // Aussehen Pickups
    push();
        strokeWeight(4);
        fill(0, 0, 0, 100);
        stroke(255, 204, 0);
        rect(x, y, 60, 60);
        rect(x-5, y-5, 70, 70);
        content();
    pop();

    // Schiffkolission zum Einsammeln des Pickups
    game.screen.ship.vectors.forEach((v) => {
        const vx = v.x + game.screen.ship.x;
        const vy = v.y + game.screen.ship.y;
        if (vx >= x && vx <= x+60 && vy >= y && vy <= y+60) {
            pu.pickup.onPickup(pu);
        }
    });

    // Beschreibungstext onMouseOver anzeigen
    if (mouseX >= x && mouseX <= x+60 && mouseY >= y && mouseY <= y+60) {
        let pos_hor = 0;
        let pos_ver = 0;
        if (mouseX > width/2) pos_hor = -300;
        else pos_hor = 60;
        if (mouseY > height/2) pos_ver = -60;
        else pos_ver = 60;

        push();
            strokeWeight(2);
            fill(0, 0, 0, 100);
            stroke(255, 204, 0);
            rect(x+pos_hor, y+pos_ver, 300, 60);

            textSize(15);
            fill('red');
            noStroke();
            text(pu.pickup.description, x+pos_hor+10, y+pos_ver+5, 280, 50);
        pop();
    }
    //
    // // Löschen der Pickups nach 5 Sekunden
    // console.log(game.screen.ship.mods.indexOf(pu.pickup));
    // let index = game.screen.ship.mods.indexOf(pu.pickup);
    // console.log(index);
    // console.log(game.screen.ship.mods[index]);
    // console.log(game.screen.ship.mods[index].timestamp);
    // // console.log(pu.pickup.timestamp);
    // // console.log(typeof pu.pickup.timestamp);
    // // console.log(millis());
    // // console.log(pu.pickup.timestamp - (millis()-5000));
    // if (pu.pickup.timestamp < millis()-5000) {
    //     game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
    // }
    }

}
