class Sounds {
  constructor() {
    this.path = "assets/sounds/";
    this.laser1 = this.addSound("effect_laser1");
    this.bullet1 = this.addSound("effect_bullet1");
    this.hit1 = this.addSound("effect_hit1");
    this.drop1 = this.addSound("effect_drop1");
    this.explosion1 = loadSound(this.path + 'effect_explosion1.mp3');
    this.nova1 = this.addSound("effect_nova1");
    this.menu_click = this.addSound("menu_click");
    this.menu_deny = this.addSound("menu_deny");
  }

  addSound(string) {
    return new Audio(this.path + string + ".mp3");
  }

  // In dieser Form funktioniert die p5.sounds-library, z.B. isPlaying(), das checkt, ob ein Sound gerade abgespielt wird und weitere.
  // für den Explosionseffekt ist die p5.sounds.js nötig
  // addSound(string) {
  //   return loadSound(this.path + string + '.mp3');
  // }
}
