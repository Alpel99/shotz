class Game {
constructor() {
this.screen = new Start_menu();
this.setup = false;
}

draw() {
this.screen.draw();
this.keyCheck();

if (this.setup == false) {
    try {
        this.screen.setup();
    } catch(error) {
    }
    this.setup = true;
}

}

keyCheck() {
//usable?
}
}







