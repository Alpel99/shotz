// Coding Train Sound Tutorial: https://www.youtube.com/watch?v=40Me1-yAtTc

class Sounds {
    constructor() {
        this.path = 'assets/sounds/';
        this.hit1       = this.addAudio('effect_hit1');
        this.drop1      = this.addAudio('effect_drop1');

        this.laser1     = this.addSound('effect_laser1');
        this.bullet1    = this.addSound('effect_bullet1');
        this.explosion1 = this.addSound('effect_explosion1');
        this.nova1      = this.addSound('effect_nova1');
        this.menu_click = this.addSound('menu_click');
        this.menu_deny  = this.addSound('menu_deny');

        this.bullet1.playMode('sustain');
        this.bullet1.setVolume(0.5);

        this.laser1.playMode('sustain');
        this.laser1.setVolume(0.5);
    }

    addAudio(string) {
        return new Audio(this.path + string + '.mp3');
    }

  // In dieser Form funktioniert die p5.sounds-library, z.B. isPlaying(), das checkt, ob ein Sound gerade abgespielt wird und weitere.
  // für den Explosionseffekt ist die p5.sounds.js nötig
    addSound(string) {
        return loadSound(this.path + string + '.mp3');
    }
}
