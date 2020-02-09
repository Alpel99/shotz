class Level1 {
constructor() {
    this.color0 = color(90);
    this.color1 = color(40,200,40);
    this.color2 = color(0);
    this.color3 = color(255,128); //color3 = gegenteil zu color 2

    this.name = "Level 1";

    // mode
    this.mode = "prep";
    /* modes:
    prep: preparation, before game begins
    run: game running
    post: end, game over (0hp)
    pause: game pause (after pressing esc) */

    this.levelOverlay = new LevelOverlay();
    this.prep = new Prep(this.color0, this.color1, this.color2, this);
    this.pause = new Pause(this.color0, this.color1, this.color2, this);
    //post defined after loss

    // misc
    this.score = 0;
    this.scoreMax = 50;
    this.wave = 0;
    this.waveMax = 10;
    this.speedincrease = 10;

    // ammo
    this.ammo = user.ammo[0];
    user.slots[0].active = true;

    // ship
    this.ship = new Ship1(width/2, height/2, color("blue")); //needs this.ammo

    // variable vor ammo selection! like user.selectedammo = 0;

    // enemies
    this.enemies = [];
    this.maxenemies = 5;

    // Skilltree (ins ship)
    this.skillPointsmax = 16;
    this.skillPointsHP = 0;
    this.skillPointsDMG = 0;
    this.skillPointsRange = 0;
    this.skillPointsSPD = 0;

    this.skillPointsHPMax = 4;
    this.skillPointsDMGMax = 4;
    this.skillPointsRangeMax = 4;
    this.skillPointsSPDMax = 4;

    this.skillPointsHPInc = 1;
    this.skillPointsDMGInc = 2;
    this.skillPointsRangeInc = 200;
    this.skillPointsSPDInc = 1.5;
}

end() {
    //check with server, send to server(this.wave; this.score)
    var exp = this.wave*100 + this.score*10;
    var coinz = floor(this.wave/2);
    var ammo2 = floor(exp/15);

    var str_exp = "Experience: " + exp;
    var str_coinz = "Coinz: " + coinz;
    var str_ammo = "x2 Ammo: " + ammo2;
    var str_etc = "";

    this.post = new Post(this.color0, this.color1, this.color2, this, str_exp, str_coinz, str_ammo, str_etc);
    this.mode = "post";
}

back() {
    if      (this.mode == "prep") this.prep.back();
    else if (this.mode == "post") this.post.back();
    else if (this.mode == "pause") this.pause.back();
    else this.mode = "pause";
}

draw() {
    background(game.screen.color0);

    if (this.mode == "prep") this.prep.draw();
    else if (this.mode == "run") {
        // Overlay
        this.levelOverlay.draw();

        if (this.score > this.scoreMax) {
            this.score = 0;
            if (this.wave < this.waveMax) {
                this.wave++;
            } else {
                this.end();
            }
            this.speed += this.speedincrease;
        }

        user.slots.forEach(s => s.update());

        // Ship
        this.ship.update();
        this.ship.draw();

        // Enemies
        if (this.enemies.length < this.maxenemies) {
            // this.enemies.push(new SpikeOrbitter());
            this.enemies.push(new Enemy(this.color1))
        }
        this.enemies.forEach(e => e.update());
    }
    else if (this.mode == "post") this.post.draw();  // change post to intern in game -> dann this.post.draw();
    else if (this.mode == "pause") {
        this.pause.draw();// change pause to intern in game -> dann this.pause.draw();
        this.levelOverlay.draw();
    }
}

controls(mode) {
    if      (this.mode == 'prep') this.prep.controls(mode);
    else if (this.mode == 'pause') this.pause.controls(mode);
    else if (this.mode == 'post') this.post.controls(mode);
    else {
        this.ship.controls(mode);
        this.levelOverlay.controls(mode);
    }
}
}
