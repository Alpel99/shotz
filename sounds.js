class Sounds {
  constructor() {
    this.path = "assets/sounds/";
    this.laser1 = this.addSound("laser1");
    this.bullet1 = this.addSound("bullet1");
    this.hit1 = this.addSound("hit1");
    this.drop1 = this.addSound("drop1");
  }

  addSound(string) {
    return new Audio(this.path + string + ".mp3");
  }

/*
  addSound(string) {
    return loadSound(this.path + string + '.mp3');
  }
*/
}
