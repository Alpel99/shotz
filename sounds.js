class Sounds {
  constructor() {
    this.path = "assets/sounds/";
    this.laser1 = this.addSound("laser1");
    this.bullet1 = this.addSound("bullet1");
    this.hit1 = this.addSound("hit1");
    this.drop1 = this.addSound("drop1");
    this.menu1 = this.addSound("menu_hover1");
    this.pupickup1 = this.addSound("pupickup2");
    this.emp3 = this.addSound("emp3");
    this.dash1 = this.addSound("teleport1");
  }

  addSound(string) {
    return new Audio(this.path + string + ".mp3");
  }

  play(string) {
    /*if(!this[string].paused) {
      this[string].pause();
    }*/
    this[string].currentTime = 0;
    this[string].play();
  }

/*
  addSound(string) {
    return loadSound(this.path + string + '.mp3');
  }
*/
}
