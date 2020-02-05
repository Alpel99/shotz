class Level1 {
constructor() {
    this.color0 = color(90);
    this.color1 = color(40,200,40);
    this.color2 = color(0);
    this.color3 = color(255,128); //color3 = gegenteil zu color 2

    this.name = "Level 1";

    //mode
    this.mode = "prep";
    /* modes:
    prep: preparation, before game begins
    run: game running
    post: end, game over (0hp)
    pause: game pause (after pressing esc) */

    this.prep = new Prep(this.color0, this.color1, this.color2, this.name);
    this.pause = new Pause(this.color0, this.color1, this.color2, this.name);
    //post defined after loss

    //ship (only holds position and rotates vectors)
    this.ship = new Ship(width/2, height/2, ship1_vectors);

    //misc
    this.score = 0;
    this.scoreMax = 50;
    this.wave = 0;
    this.waveMax = 10;
    this.speed = 200;
    this.speedincrease = 100;

    //ammo
    this.ammo = user.ammo[0];
    user.slots[0].active = true;

    //variable vor ammo selection! like user.selectedammo = 0;

    //enemies
    this.enemies = [];
    this.maxenemies = 5;

    //bullets
    this.bullets = [];

    //Skilltree (ins ship)
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

    this.post = new Post(this.color0, this.color1, this.color2, this.name, str_exp, str_coinz, str_ammo, str_etc);
    this.mode = "post";
}

back() {
    if (this.mode == "prep") {
        this.prep.back();
    } else if (this.mode == "post") {
        this.post.back();
    } else if (this.mode == "pause") {
        this.pause.back();
    } else {
        this.mode = "pause";
    }
}

setup() {
    for(let i = 0; i < 1; i++) {
        this.bullets[i] = new Bullet();
    }
    //change this
    vectorsShip1();
    this.mode = "run";
}

draw() {
    background(game.screen.color0);

    if (this.mode == "prep") {
        this.prep.draw();
    } else if (this.mode == "run") {
        //Ship
        this.ship.update();
        this.ship.move();
        push();
        imageMode(CENTER);
        drawShip1(this.ship.color);
        image(img_ship1, this.ship.x, this.ship.y);
        pop();

        if (this.enemies.length < this.maxenemies) {
            this.enemies.push(new Bot(this.speed));
            //this.enemies.push(new Enemy(this.speed, this.color1))
        }

        this.enemies.forEach(e => e.update());
        this.bullets.forEach(b => b.update());

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

        this.keyCheck();
    } else if (this.mode == "post") {
        // change post to intern in game -> dann this.post.draw();
        this.post.draw();
    } else if(this.mode == "pause") {
        // change post to intern in game -> dann this.post.draw();
        this.pause.draw();
    }
}

keyCheck() {
    if(keyIsDown(32)) {
        for(let i = 0; i < this.bullets.length; i++) {
            if(this.bullets[i].visible == false) {
                   this.bullets[i].start();
               return;
            }
        }
    }
}
}
