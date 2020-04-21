class Game {
    constructor() {
        this.screen = new Login_menu();
        this.menuOverlay = new MenuOverlay();
        this.sounds = new Sounds();
        this.effects = [];          // Ein Versuch eines Event-Loops für Effekte, aktuell nur Explosionen
    }

draw() {
    // translate muss vor allen anderen draw-Operationen ausgeführt werden
    if (this.effects.length > 0) {
        this.effects.forEach(ef => {
            if (ef.type === 'screenshake') {
                ef.fn();
            }
        });
    }

    this.screen.draw();

    // Alle anderen Effekte müssen nach den normalen draw-Operationen ausgeführt werden.
    if (this.effects.length > 0) {
        this.effects.forEach(ef => {
            if(ef.type !== 'screenshake') {
                ef.fn();
            }
        });
    }
}

controls(mode) {
    if (mode === 'keyPress') {
        if (keyCode === ESCAPE ||
            //keyCode === 81 || //Q
            keyCode === BACKSPACE) {
            if (this.screen.back()) this.screen.back();
        }
	if(keyCode === 222) {
		//Ä
		this.sendData();
	}
  if(keyCode === 186) {
    //Ü -- download userdata.json
    var data = user.sendData();
      saveJSON(data, 'userdata.json');
  }
    }
    this.screen.controls(mode);
}

choosePowerUp(x, y) {
    // Wählt ein zufälliges Powerup aus dem powerups-Objekt aus und pusht es in ship.mods
    game.sounds.drop1.pause();
    game.sounds.drop1.currentTime = 0;
    game.sounds.drop1.play();

    let pu = powerups[Math.floor(Math.random()*powerups.length)];
    let ts = millis();

    // Pickup-Objekt zum push vorbereiten
    let pickup = {
        type: 'pickup',
        name: pu.pickup.name,
        description: pu.pickup.description,
        timestamp: ts
    }
    pickup.onPickup = pu.pickup.onPickup.bind(pickup);
    pickup.draw = pu.pickup.draw.bind(pickup, x, y, pu);

    this.screen.ship.mods.push(pickup);
}

drawPickup(x, y, pu, pickup, content) {
    /*
    *  Parameter:
    *  x, y:    Position des getöteten Gegners (dort wird pickup dargestellt)
    *  pu:      Referenz zum richtigen PowerUp-Objekt (aus powerups.js)
    *  pickup:  Referenz zum temporären pickup-Obkekt (das in choosePowerup() erstellt wurde)
    *  content: Aussehen des pickups (innerhalb des gelben Rahmens)
    */

    // Aussehen des Pickups
    push();
        strokeWeight(4);
        fill(0, 100);
        stroke(game.screen.color1);
        rect(x, y, 60, 60);
        rect(x-5, y-5, 70, 70);
        noStroke();
        fill(game.screen.color1);
        content();
    pop();

    // Schiffkolission zum Einsammeln des Pickups
    game.screen.ship.vectors.forEach((v) => {
        const vx = v.x + game.screen.ship.pos.x;
        const vy = v.y + game.screen.ship.pos.y;
        if (vx >= x && vx <= x+60 && vy >= y && vy <= y+60) {
            pu.pickup.onPickup(pu);
            game.sounds.drop1.pause();
            game.sounds.drop1.currentTime = 0;
            game.sounds.drop1.play();
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
            stroke(game.screen.color1);
            rect(x+pos_hor, y+pos_ver, 300, 60);

            textSize(15);
            fill(game.screen.color3);
            noStroke();
            text(pu.pickup.description, x+pos_hor+10, y+pos_ver+5, 280, 50);
        pop();
    }

    // Löschen des Pickups nach 10 Sekunden
    if (pickup.timestamp < millis()-10000) {
        this.deletePickUp(pickup);
    }
}

deletePickUp(pickup) {
    // Identifiziert Pickup anhand seines timestamps und entfernt es aus der Liste
    let index;
    for (let i = 0; i < game.screen.ship.mods.length; i++) {
        const mod = game.screen.ship.mods[i];
        if (mod.timestamp === pickup.timestamp) {
            index = i;
            break;
        }
    }
    game.screen.ship.mods.splice(index, 1);
}

generateID () {
    // Erzeugt eine zufällige id
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


removeFromList(list, element) {
    // Typische Operation ein Element von einer Liste entfernen, wenn es nicht mehr dargestellt werden soll
    // Bedingung: das Element hat eine ID (game.generateID())
    // Parameter:
    // list: Liste, aus der das Element entfernt werden soll
    // element: Element, das aus der Liste entfernt werden soll

    for (let i = 0; i < list.length; i++) {
        if (list[i].id === element.id) {
            list.splice(i, 1);
            break;
        }
    }
}
}
