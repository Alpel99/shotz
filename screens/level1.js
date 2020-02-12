class Level1 {
constructor() {
    this.color0 = color(90); //Background
    this.color1 = color(40,200,40); //enemies, active Items, Keys
    this.color2 = color(0); //Background Items, amount text
    this.color3 = color(200); //cooldown arc color

    this.name = "Level1";

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
    this.speedincrease = 10;

    // ammo get user.slots[1-5].active
    //this.ammo = user.ammo[0];
    for(let i = 0; i < 5; i++) {
        if(user.items[i].active == true && user.items[i].use.replace(/[0-9]/g, '') == "ammo") {
            this.ammo = user.items[i];
        }
    }
    if(!this.ammo) {
        this.ammo = user.items[0];
        this.ammo.active = true;
    }

    var userammo1 = user.items.find(element => element.use == "ammo1");
    if(userammo1.amount < 10000) {
        userammo1.amount = 10000;
    }

    //items/etc
    for(let i = 0; i < user.items.length; i++) {
        user.items[i].activeCounter = -1;
        user.items[i].counter = 0;
    }

    // ship
    this.ship = new Ship1(width/2, height/2, color(255,255,0)); //needs this.ammo

    // variable vor ammo selection! like user.selectedammo = 0;

    // enemies
    this.enemies = [];
    this.maxenemies = 5;
}

end() {
    //check with server, send to server(this.wave; this.score)
    var exp = this.wave*100 + this.score*10;
    var coinz = floor(this.wave/2);
    var ammo2 = floor(exp/15);

    user.experience.Level1.exp += exp;
    while(user.experience.Level1.exp > user.experience.Level1.lvl*1000) {
        user.experience.Level1.exp -= user.experience.Level1.lvl*1000;
        user.experience.Level1.lvl++;
        user.skillpoints++;
    }

    user.money += coinz;
    var userammo2 = user.items.find(element => element.use == "ammo2");
    userammo2 += ammo2;

    var str_exp = "Experience: " + exp;
    var str_coinz = "Coinz: " + coinz;
    var str_ammo = "x2 Ammo: " + ammo2;
    var str_etc = "";

    //actually send to the server
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

        if (this.score > this.scoreMax) {
            this.score = 0;
            this.wave++;
            this.speed += this.speedincrease;
        }

        user.items.forEach(i => i.update());

        // Ship
        this.ship.update();
        this.ship.draw();

        // Enemies
        if (this.enemies.length < this.maxenemies) {
            // this.enemies.push(new SpikeOrbitter());
            this.enemies.push(new Enemy(this.color1))
        }
        this.enemies.forEach(e => e.update());

        // Overlay
        this.levelOverlay.draw();
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
