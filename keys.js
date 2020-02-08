function keyPressed() {
if(keyCode === 81) {
    game.screen.back();

    try {
        game.screen.reset();
    } catch(error) {

    }
}

if((keyCode === 68  || keyCode === RIGHT_ARROW) && game.screen.name == "level_menu") {
    game.screen.page++;
}
if((keyCode === 65  || keyCode === LEFT_ARROW) && game.screen.name == "level_menu" && game.screen.page > 1) {
    game.screen.page--;
}

switch (this.use) {
  case "ammo1":
    break;
  case "ISH":
    this.activeCounter = 120;
    break;
  case "MINE":
    this.activeCounter = 15;
    break;
  case "SMB":
    this.activeCounter = 150;
    break;
  case "SPECIAL":
    this.activeCounter = 180;
    break;
  default:
    //
    break;
}

    if(keyCode === 49) {
    //1
        for(let i = 0; i < 6; i++) {
            user.slots[i].active = false;
            if(user.slots[i].use === "ammo1") {
                user.slots[i].active = true;
            }
        }
        game.screen.ammo = user.ammo[0];
    }
    //2
    if(keyCode == 50) {
        for(let i = 0; i < 6; i++) {
            user.slots[i].active = false;
            if(user.slots[i].use === "ammo2") {
                user.slots[i].active = true;
            }
        }
        game.screen.ammo = user.ammo[1];
    }
    //3
    if(keyCode === 51) {
        for(let i = 0; i < 6; i++) {
            user.slots[i].active = false;
            if(user.slots[i].use === "ammo3") {
                user.slots[i].active = true;
            }
        }
        game.screen.ammo = user.ammo[2];
    }
    //4
    if(keyCode === 52) {
        for(let i = 0; i < 6; i++) {
            user.slots[i].active = false;
            if(user.slots[i].use === "ammo4") {
                user.slots[i].active = true;
            }
        }
        game.screen.ammo = user.ammo[3];
    }
    //5
    if(keyCode === 53) {
        for(let i = 0; i < 6; i++) {
            user.slots[i].active = false;
            if(user.slots[i].use === "ammoX") {
                user.slots[i].active = true;
            }
        }
        game.screen.ammo = user.ammo[4];
    }

    if(keyCode === 69) {
    //E
        if(user.slots[5].counter == 0 && user.slots[5].activeCounter == -1) {
            user.slots[5].activate();
        }
    }
    //R
    if(keyCode === 82) {
        if(user.slots[6].counter == 0 && user.slots[6].activeCounter == -1) {
            user.slots[6].activate();
        }
    }
    //T
    if(keyCode === 84) {
        if(user.slots[7].counter == 0 && user.slots[7].activeCounter == -1) {
            user.slots[7].activate();
        }
    }
    //F
    if(keyCode === 70) {
        if(user.slots[8].counter == 0 && user.slots[8].activeCounter == -1) {
            user.slots[8].activate();
        }
    }

//game.screen.keys(keyCode);
}
