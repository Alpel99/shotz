class Level1 {
constructor() {
    this.color0 = color(90);
    this.color1 = color(255);
    this.color2 = color(0);

    this.name = "Level 1";

    this.c = color(255,0,0)
    this.ship = new Ship(width/2, height/2, this.c);

   //misc
    this.score = 0;
    this.wave = 0;
    this.gamespeed = 200;
    this.gamespeedincrease = 100;

    //enemies
    this.enemies = [];
    this.maxenemies = 5;
    this.minsize = 50;
    this.maxsize = 300;
    this.chase = false;

    //Player
    this.bulletspeed = 300;
    this.PlayerHP = 3;
    this.PlayerDMG = 10;
    this.PlayerSPD = 10;
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

setup() {
    for(let i = 0; i < this.maxenemies; i++) {
        this.enemies[i] = new Enemy();
    }

    /*
    this.bullets = [];
    for(let i = 0; i < 1; i++) {
        this.bullets[i] = new Bullet();
    }
    */
}

draw() {
    background(game.screen.color0);
    this.enemies.forEach(element => element.show());
    this.enemies.forEach(element => element.update());
    //game1Bullets.forEach(element => element.show());
    // game1Bullets.forEach(element => element.update());
    this.ship.draw(color(255));
    /*
    game1Movement();
    game1DrawShip1();
    game1Layout();

    */
}

}