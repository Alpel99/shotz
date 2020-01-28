class Level1 {
constructor() {
    this.color0 = color(90);
    this.color1 = color(40,200,40);
    this.color2 = color(0);

    this.name = "Level 1";

    //mode
    this.mode = "prep";
    /* modes:
    prep: preparation, before game begins
    run: game running
    post: end, game over (0hp)
    pause: game pause (after pressing esc)
    */
    this.prep = new Prep(this.color0, this.color1, this.color2, this.name);
    this.post;

    //ship (only holds position and rotates vectors)
    this.ship_color = color(255,0,0);
    this.ship = new Ship(width/2, height/2, ship1_vectors);

   //misc
    this.score = 0;
    this.scoreMax = 10;
    this.wave = 0;
    this.waveMax = 10;
    this.speed = 200;
    this.speedincrease = 100;
    this.ammo = user.ammo[0];
    //variable vor ammo selection! like user.selectedammo = 0;

    //enemies
    this.enemies = [];
    this.maxenemies = 5;
    this.minsize = 50;
    this.maxsize = 300;
    this.chase = false;

    //bullets
    this.bullets = [];


    //Player
    this.bulletspeed = 20;
    this.bulletspeed = 15;
    this.PlayerHP = 3;
    this.PlayerDMG = 10;
    this.PlayerSPD = 5;
    this.PlayerRNG = 500;

    //Skilltree
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
//check with server, send to server
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
if(this.mode == "prep" || this.mode == "post") {
        this.prep.back();
} else {
    game.screen = new Pause();
    //implement it
}
}

setup() {
    for(let i = 0; i < this.maxenemies; i++) {
        this.enemies[i] = new Enemy();
    }

    for(let i = 0; i < 1; i++) {
        this.bullets[i] = new Bullet();
    }
    //change this
    this.mode = "run";
}

draw() {
    if(this.mode == "prep") {
        this.prep.draw();
    } else if(this.mode == "run") {
    background(game.screen.color0);
    this.enemies.forEach(element => element.show());
    this.enemies.forEach(element => element.update());
    this.bullets.forEach(element => element.show());
    this.bullets.forEach(element => element.update());
    
    //reset specific Vectors
    vectorsShip1();
    //rotate vectors in object
    this.ship.update();    
    //drawing specific ship
    push();
    imageMode(CENTER);
    img_ship1 = createGraphics(150,150);
    drawShip1(this.ship_color);
    image(img_ship1, this.ship.x, this.ship.y);
    img_ship1.remove();
    //move ship object
    this.ship.move();
    pop();
    //game1Layout();
    this.keyCheck();
    } else if(this.mode == "post") {
        //change post to intern in game -> dann this.post.draw();
        this.post.draw();
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
