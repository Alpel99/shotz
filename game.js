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
            keyCode === 81 ||
            keyCode === BACKSPACE) {
            if (this.screen.back()) this.screen.back();
        }
    }
    this.screen.controls(mode);
}
}
