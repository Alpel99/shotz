function pictures() {
    back = createGraphics(80, 50);
    redback = createGraphics(80, 50);
    skilltree = createGraphics(80, 80);
    skilltreehover = createGraphics(80, 80);
    coin = createGraphics(50,50);
    exclamation = createGraphics(50,50);
    img_ship = createGraphics(150,150);
    img_ship1 = createGraphics(150,150);
    img_ship2 = createGraphics(150,150);
    img_ammo1 = createGraphics(80,80);
    img_ammo2 = createGraphics(80,80);
    img_ammo3 = createGraphics(80,80);
    img_ammo4 = createGraphics(80,80);
    img_hp = createGraphics(100, 100);
    img_speed = createGraphics(100, 100);
    img_range = createGraphics(100, 100);
    img_damage = createGraphics(100, 100);
    img_skillup = createGraphics(400,150);
    img_redskillup = createGraphics(400,150);
    drawRedSkillup();
    drawHP();
    drawSpeed();
    drawRange();
    drawDamage();
    drawAmmo1();
    drawAmmo2();
    drawAmmo3();
    drawAmmo4();
    drawBack();
    drawRedBack();
    drawSkilltree();
    drawSkilltreeHover();
    drawCoin();
    drawExclamation();
    drawShip();
    vectorsShip1();
    drawShip1(color(255));
    vectorsShip2();
    drawShip2();
    drawSkillup();
    //rotate Ship:
    //var angle = atan2(mouseY - y, mouseX - x);
  	//ship_vectors.forEach(element => element.rotate(angle+PI*0.5));
}

function drawSkillup() {
img_skillup.background(0);
img_skillup.fill(128);
img_skillup.rect(10, 10, img_skillup.width - 20, img_skillup.height - 20);
img_skillup.fill(0);
img_skillup.textSize(80);
img_skillup.textAlign(CENTER, CENTER);
img_skillup.text("Skill up", img_skillup.width/2, img_skillup.height/2);
}

function drawRedSkillup() {
img_redskillup.background(255);
img_redskillup.fill(255,0,0);
img_redskillup.rect(10, 10, img_skillup.width - 20, img_skillup.height - 20);
img_redskillup.fill(0);
img_redskillup.textSize(80);
img_redskillup.textAlign(CENTER, CENTER);
img_redskillup.textStyle(BOLD);
img_redskillup.text("Skill up", img_skillup.width/2, img_skillup.height/2);
}


function drawBack() {
    back.background(0);
    back.fill(128);
    back.rect(3, 3, 74, 44);
    back.fill(0);
    back.textSize(25);
    back.textAlign(CENTER, CENTER);
    back.text("Back", 40, 25);
}

function drawRedBack() {
    redback.background(255);
    redback.fill(255,0,0);
    redback.rect(3, 3, 74, 44);
    redback.fill(0);
    redback.textStyle(BOLD);
    redback.textSize(25);
    redback.textAlign(CENTER, CENTER);
    redback.text("Back", 40, 25);
}

function drawSkilltree() {
    skilltree.background(0);
    var c2 = color(0);
    var c1 = color(255,255,0);
    skilltree.noFill();
    for (var y = 0; y < skilltree.height; y++) {
        var inter = map(y, 0, skilltree.height, 0, 1);
        var c = lerpColor(c1, c2, inter);
        skilltree.stroke(c);
        skilltree.line(0, y, skilltree.width, y);
    }
    skilltree.fill(0);
    skilltree.triangle(0,0,40,0,0,40);
    skilltree.triangle(80,0,40,0,80,40);
    skilltree.rect(0,40,25,40);
    skilltree.rect(55,40,25,40);
}

function drawSkilltreeHover() {
    skilltreehover.background(0);
    var c2 = color(0);
    var c1 = color(255,0,0);
    skilltreehover.noFill();
    for (var y = 0; y < skilltreehover.height; y++) {
        var inter = map(y, 0, skilltreehover.height, 0, 1);
        var c = lerpColor(c1, c2, inter);
        skilltreehover.stroke(c);
        skilltreehover.line(0, y, skilltreehover.width, y);
    }
    skilltreehover.fill(0);
    skilltreehover.triangle(0,0,40,0,0,40);
    skilltreehover.triangle(80,0,40,0,80,40);
    skilltreehover.rect(0,40,25,40);
    skilltreehover.rect(55,40,25,40);
}

function drawCoin() {
    coin.scale(1.4);
    coin.background(255,0);
    coin.fill(200,150,70);
    coin.ellipse(20,20,20);
    coin.stroke(160);
    coin.fill(200,200,40);
    coin.ellipse(20,20,15);
    coin.fill(200,150,70);
    coin.textAlign(CENTER, CENTER);
    coin.textSize(10);
    coin.stroke(160);
    coin.text("Z", 20, 21);
}

function drawExclamation() {
  exclamation.background(0,0);
  exclamation.strokeJoin(ROUND);
  exclamation.fill(0,153,51);
  exclamation.triangle(10,10,40,10,25,40);
  exclamation.stroke(160);
  exclamation.fill(255,255,0);
  exclamation.triangle(15,13,35,13,25,33);
  exclamation.fill(0);
  exclamation.textSize(17);
  exclamation.textAlign(CENTER, CENTER);
  exclamation.textStyle(BOLD);
  exclamation.text("!", 25, 22);

}

function drawAmmo1() {
var colorAmmo2 = color(255);
img_ammo1.noStroke();
img_ammo1.translate(40,40);
img_ammo1.fill(colorAmmo2);
img_ammo1.ellipse(0, 27, 15);

img_ammo1.fill(0);
img_ammo1.rect(-8, -20, 16, 50, 3);

img_ammo1.fill(255);
img_ammo1.rect(-6,-10,2,35,2);
img_ammo1.rect(-2,-10,4,35,2);
img_ammo1.rect(4,-10,2,35,2);

//real ammo
img_ammo1.fill(colorAmmo2);
img_ammo1.rect(-4,-38,8,22,5);
img_ammo1.strokeWeight(1);
img_ammo1.stroke(colorAmmo2);
img_ammo1.line(-4,-20,-6,-25);
img_ammo1.line(4,-20,6,-25);
img_ammo1.line(4,-18,10,-23);
img_ammo1.line(-4,-18,-10,-23);
}

function drawAmmo2() {
var colorAmmo2 = color(230, 34, 0);
img_ammo2.noStroke();
img_ammo2.translate(40,40);
img_ammo2.fill(colorAmmo2);
img_ammo2.ellipse(0, 27, 15 );

img_ammo2.fill(0);
img_ammo2.rect(-8, -20, 16, 50, 3);

img_ammo2.fill(colorAmmo2);
img_ammo2.rect(-6,-10,2,35,2);
img_ammo2.rect(-2,-10,4,35,2);
img_ammo2.rect(4,-10,2,35,2);

//real ammo
img_ammo2.fill(colorAmmo2);
img_ammo2.rect(-4,-38,8,22,5);
img_ammo2.strokeWeight(1);
img_ammo2.stroke(colorAmmo2);
img_ammo2.line(-4,-20,-6,-25);
img_ammo2.line(4,-20,6,-25);
img_ammo2.line(4,-18,10,-23);
img_ammo2.line(-4,-18,-10,-23);
}

function drawAmmo3() {
var colorAmmo3 = color(240, 232, 14);
img_ammo3.noStroke();
img_ammo3.translate(40,40);
img_ammo3.fill(colorAmmo3);
img_ammo3.ellipse(0, 27, 15 );

img_ammo3.fill(0);
img_ammo3.rect(-8, -20, 16, 50, 3);

img_ammo3.fill(colorAmmo3);
img_ammo3.rect(-6,-10,2,35,2);
img_ammo3.rect(-2,-10,4,35,2);
img_ammo3.rect(4,-10,2,35,2);

//real ammo
img_ammo3.fill(colorAmmo3);
img_ammo3.rect(-4,-38,8,22,5);
img_ammo3.strokeWeight(1);
img_ammo3.stroke(colorAmmo3);
img_ammo3.line(-4,-20,-6,-25);
img_ammo3.line(4,-20,6,-25);
img_ammo3.line(4,-18,10,-23);
img_ammo3.line(-4,-18,-10,-23);
}

function drawAmmo4() {
var colorAmmo4 = color(0);
img_ammo4.noStroke();
img_ammo4.translate(40,40);
img_ammo4.fill(colorAmmo4);
img_ammo4.ellipse(0, 27, 15 );

img_ammo4.fill(255);
img_ammo4.rect(-8, -20, 16, 50, 3);

img_ammo4.fill(colorAmmo4);
img_ammo4.rect(-6,-10,2,35,2);
img_ammo4.rect(-2,-10,4,35,2);
img_ammo4.rect(4,-10,2,35,2);

//real ammo
img_ammo4.fill(colorAmmo4);
img_ammo4.rect(-4,-38,8,22,5);
img_ammo4.strokeWeight(1);
img_ammo4.stroke(colorAmmo4);
img_ammo4.line(-4,-20,-6,-25);
img_ammo4.line(4,-20,6,-25);
img_ammo4.line(4,-18,10,-23);
img_ammo4.line(-4,-18,-10,-23);
}

function drawHP() {
img_hp.background(128);
img_hp.noStroke();
img_hp.fill(25, 133, 54);
img_hp.translate(50,50);
img_hp.rect(-10, -40, 20, 80, 5);
img_hp.rect(-40, -10, 80, 20, 5);
}

function drawSpeed() {
img_speed.background(128);
img_speed.translate(50,50);
img_speed.rotate(PI*0.5);
img_speed.fill(0);
img_speed.stroke(255);
img_speed.triangle(0,-40,-10,-10,10,-10);
img_speed.stroke(240,0,0);
img_speed.strokeWeight(2);
img_speed.line(-40,40,-8,-5);
img_speed.line(-30,40,-6,-7);
img_speed.line(-20,40,-4,-7);
img_speed.line(-10,40,-2,-9);
img_speed.line(0,40,0,-8);
img_speed.line(40,40,8,-5);
img_speed.line(30,40,6,-7);
img_speed.line(20,40,4,-7);
img_speed.line(10,40,2,-9);
}

function drawRange() {
img_range.background(128);
img_range.stroke(240,0,0);
img_range.noFill();
img_range.strokeWeight(3);
img_range.translate(50,50);
img_range.ellipse(0,0,80);
img_range.line(-40,0,-35,0);
img_range.line(40,0,35,0);
img_range.line(0,-40,0,-35);
img_range.line(0,40,0,35);
img_range.noStroke();
img_range.fill(100,0,0);
img_range.ellipse(0,0,5);
}

function drawDamage() {
img_damage.background(128);
img_damage.fill(240,0,0);
img_damage.stroke(0);
img_damage.triangle(40,50,90,10,20,80);
img_damage.triangle(50,60,90,10,20,80);
img_damage.stroke(0);
img_damage.stroke(90);
img_damage.strokeWeight(6);
img_damage.line(10,90,30,70);
}

function vectorsShip1() {
    img_ship1.push();
    img_ship1.translate(75,75);

    //Flügel
    ship1_vectors[3] = img_ship1.createVector(-30, 20);
    ship1_vectors[1] = img_ship1.createVector(-40, -20);
    ship1_vectors[2] = img_ship1.createVector(0, 20);
    ship1_vectors[9] = img_ship1.createVector(-ship1_vectors[3].x, 20);
    ship1_vectors[10] = img_ship1.createVector(-ship1_vectors[1].x, -20);

    //Main
    ship1_vectors[0] = img_ship1.createVector(0, -50);
    ship1_vectors[4] = img_ship1.createVector(-30, 20);
    ship1_vectors[5] = img_ship1.createVector(30, 20);

    //White
    ship1_vectors[6] = img_ship1.createVector(-20, 20);
    ship1_vectors[11] = img_ship1.createVector(-ship1_vectors[6].x, 20);

    //Bridge
    ship1_vectors[7] = img_ship1.createVector(0, -5);
    ship1_vectors[8] = img_ship1.createVector(5, 10);
    ship1_vectors[12] = img_ship1.createVector(-ship1_vectors[8].x, 10);

    img_ship1.pop();
}

function drawShip1(a) {
    img_ship1.background(game.screen.color0);
    img_ship1.push();
    img_ship1.translate(75,75);
    img_ship1.stroke(128);
    img_ship1.strokeWeight(2);
    img_ship1.fill(0);

    //Flügel
    img_ship1.triangle(ship1_vectors[3].x,ship1_vectors[3].y,ship1_vectors[1].x,ship1_vectors[1].y,ship1_vectors[2].x,ship1_vectors[2].y);
    img_ship1.triangle(ship1_vectors[9].x,ship1_vectors[9].y,ship1_vectors[10].x,ship1_vectors[10].y,ship1_vectors[2].x,ship1_vectors[2].y);

    //Main
    img_ship1.triangle(ship1_vectors[0].x,ship1_vectors[0].y,ship1_vectors[4].x,ship1_vectors[4].y,ship1_vectors[5].x,ship1_vectors[5].y);

    //White
    img_ship1.fill(a);
    img_ship1.triangle(ship1_vectors[0].x,ship1_vectors[0].y,ship1_vectors[4].x,ship1_vectors[4].y,ship1_vectors[6].x,ship1_vectors[6].y);
    img_ship1.triangle(ship1_vectors[0].x,ship1_vectors[0].y,ship1_vectors[5].x,ship1_vectors[5].y,ship1_vectors[11].x,ship1_vectors[11].y);

    //Bridge
    img_ship1.fill(230);
    img_ship1.triangle(ship1_vectors[7].x,ship1_vectors[7].y,ship1_vectors[8].x,ship1_vectors[8].y,ship1_vectors[12].x,ship1_vectors[12].y);
    img_ship1.pop();
}

function vectorsShip2() {
    img_ship2.push();
    img_ship2.translate(75,75);

    //Flügel
    ship2_vectors[0] = img_ship2.createVector(-30, 20);
    ship2_vectors[1] = img_ship2.createVector(-40, -20);
    ship2_vectors[2] = img_ship2.createVector(0, 20);
    ship2_vectors[9] = img_ship2.createVector(-ship2_vectors[0].x, 20);
    ship2_vectors[10] = img_ship2.createVector(-ship2_vectors[1].x, -20);

    //Main
    ship2_vectors[3] = img_ship2.createVector(0, -50);
    ship2_vectors[4] = img_ship2.createVector(-30, 20);
    ship2_vectors[5] = img_ship2.createVector(30, 20);

    //White
    ship2_vectors[6] = img_ship2.createVector(-20, 20);
    ship2_vectors[11] = img_ship2.createVector(-ship2_vectors[6].x, 20);

    //Bridge
    ship2_vectors[7] = img_ship2.createVector(0, -5);
    ship2_vectors[8] = img_ship2.createVector(5, 10);
    ship2_vectors[12] = img_ship2.createVector(-ship2_vectors[8].x, 10);

    img_ship2.pop();
}

function drawShip2() {
    img_ship2.push();
    img_ship2.translate(75,75);
    img_ship2.stroke(128);
    img_ship2.strokeWeight(2);
    img_ship2.fill(0);

    //Flügel
    img_ship2.triangle(ship2_vectors[0].x,ship2_vectors[0].y,ship2_vectors[1].x,ship2_vectors[1].y,ship2_vectors[2].x,ship2_vectors[2].y);
    img_ship2.triangle(ship2_vectors[9].x,ship2_vectors[9].y,ship2_vectors[10].x,ship2_vectors[10].y,ship2_vectors[2].x,ship2_vectors[2].y);

    //Main
    img_ship2.triangle(ship2_vectors[3].x,ship2_vectors[3].y,ship2_vectors[4].x,ship2_vectors[4].y,ship2_vectors[5].x,ship2_vectors[5].y);

    //White
    img_ship2.fill(200);
    img_ship2.triangle(ship2_vectors[3].x,ship2_vectors[3].y,ship2_vectors[4].x,ship2_vectors[4].y,ship2_vectors[6].x,ship2_vectors[6].y);
    img_ship2.triangle(ship2_vectors[3].x,ship2_vectors[3].y,ship2_vectors[5].x,ship2_vectors[5].y,ship2_vectors[11].x,ship2_vectors[11].y);

    //Bridge
    img_ship2.fill(230);
    img_ship2.triangle(ship2_vectors[7].x,ship2_vectors[7].y,ship2_vectors[8].x,ship2_vectors[8].y,ship2_vectors[12].x,ship2_vectors[12].y);
    img_ship2.pop();
}

function drawShip() {
  img_ship.noStroke();
  img_ship.fill(255,0,0);
  img_ship.background(0,0,125,0);
  //ydiff: -15
  img_ship.translate(75,60);

  //Seitliche Flügel
  ship_vectors[0] = img_ship.createVector(-7, 0);
  ship_vectors[1] = img_ship.createVector(-10, 40);
  ship_vectors[2] = img_ship.createVector(-50, 30);
  ship_vectors[3] = img_ship.createVector(-ship_vectors[0].x, 0);
  ship_vectors[4] = img_ship.createVector(-ship_vectors[1].x, 40);
  ship_vectors[5] = img_ship.createVector(-ship_vectors[2].x, 30);

  //Mitten
  ship_vectors[6] = img_ship.createVector(-5, -20);
  ship_vectors[7] = img_ship.createVector(7, 40);
  ship_vectors[8] = img_ship.createVector(-7, 40);
  ship_vectors[9] = img_ship.createVector(-ship_vectors[6].x, -25);
  ship_vectors[10] = img_ship.createVector(ship_vectors[6].x, -25);
  ship_vectors[11] = img_ship.createVector(ship_vectors[7].x, 40);

  //Flügeldinger in der Mitte
  ship_vectors[12] = img_ship.createVector(-5, -25);
  ship_vectors[13] = img_ship.createVector(-17, 45);
  ship_vectors[14] = img_ship.createVector(-7, 40);
  ship_vectors[15] = img_ship.createVector(-ship_vectors[12].x, -25);
  ship_vectors[16] = img_ship.createVector(-ship_vectors[13].x, 45);
  ship_vectors[17] = img_ship.createVector(-ship_vectors[14].x, 40);

  //Flügelspitzen
  ship_vectors[18] = img_ship.createVector(-50, 30);
  ship_vectors[19] = img_ship.createVector(-48, 5);
  ship_vectors[20] = img_ship.createVector(-30, 35);
  ship_vectors[21] = img_ship.createVector(-ship_vectors[18].x, 30);
  ship_vectors[22] = img_ship.createVector(-ship_vectors[19].x, 5);
  ship_vectors[23] = img_ship.createVector(-ship_vectors[20].x, 35);

  //Fenster
  ship_vectors[24] = img_ship.createVector(-2, 20);
  ship_vectors[25] = img_ship.createVector(-ship_vectors[24].x, ship_vectors[24].y);

  //Linien:
  //Hinten
  ship_vectors[26] = img_ship.createVector(-50, 30);
  ship_vectors[27] = img_ship.createVector(-16, 38);
  ship_vectors[28] = img_ship.createVector(-ship_vectors[26].x, ship_vectors[26].y);
  ship_vectors[29] = img_ship.createVector(-ship_vectors[27].x, ship_vectors[27].y);

  //Seiten nach oben
  ship_vectors[30] = img_ship.createVector(-48, 5);
  ship_vectors[31] = img_ship.createVector(-ship_vectors[30].x, ship_vectors[30].y);

  //Spitzen nach innen
  ship_vectors[32] = img_ship.createVector(-38, 21);
  ship_vectors[33] = img_ship.createVector(-ship_vectors[32].x, ship_vectors[32].y);

  //Lange Flügelseiten zum Schiff
  ship_vectors[34] = img_ship.createVector(-10, 2);
  ship_vectors[35] = img_ship.createVector(-ship_vectors[34].x, ship_vectors[34].y)

  //Hinten
  ship_vectors[36] = img_ship.createVector(-7, 40);
  ship_vectors[37] = img_ship.createVector(-ship_vectors[36].x, ship_vectors[36].y);

  //Vorne
  ship_vectors[38] = img_ship.createVector(-5, -25);
  ship_vectors[39] = img_ship.createVector(-ship_vectors[38].x, ship_vectors[38].y);

  //Shoot
  ship_vectors[40] = img_ship.createVector(0, -25);
  //ENDE VEKTOREN!!!!


  //Seitliche Flügel
  img_ship.triangle(ship_vectors[0].x,ship_vectors[0].y,ship_vectors[1].x,ship_vectors[1].y,ship_vectors[2].x,ship_vectors[2].y);
  img_ship.triangle(ship_vectors[3].x,ship_vectors[3].y,ship_vectors[4].x,ship_vectors[4].y,ship_vectors[5].x,ship_vectors[5].y);

  //Mitten
  img_ship.stroke("red");
  img_ship.triangle(ship_vectors[6].x,ship_vectors[6].y,ship_vectors[7].x,ship_vectors[7].y,ship_vectors[8].x,ship_vectors[8].y);
  img_ship.triangle(ship_vectors[9].x,ship_vectors[9].y,ship_vectors[10].x,ship_vectors[10].y,ship_vectors[11].x,ship_vectors[11].y);

  //Flügeldinger in der Mitte
  //img_ship.noStroke();
  img_ship.stroke(0);
  img_ship.triangle(ship_vectors[12].x,ship_vectors[12].y,ship_vectors[13].x,ship_vectors[13].y,ship_vectors[14].x,ship_vectors[14].y);
  img_ship.triangle(ship_vectors[15].x,ship_vectors[15].y,ship_vectors[16].x,ship_vectors[16].y,ship_vectors[17].x,ship_vectors[17].y);

  //Flügelspitzen
  img_ship.noStroke();
  img_ship.triangle(ship_vectors[18].x,ship_vectors[18].y,ship_vectors[19].x,ship_vectors[19].y,ship_vectors[20].x,ship_vectors[20].y);
  img_ship.triangle(ship_vectors[21].x,ship_vectors[21].y,ship_vectors[22].x,ship_vectors[22].y,ship_vectors[23].x,ship_vectors[23].y);


  //was bin ich? img_ship.triangle(-5,-10,5,-10,0,-35);

  //Fenster
  img_ship.stroke(0);
  img_ship.strokeWeight(5);
  img_ship.line(ship_vectors[24].x,ship_vectors[24].y,ship_vectors[25].x,ship_vectors[25].y);

  //Linien
  img_ship.strokeWeight(1);

  //Hinten:
  img_ship.line(ship_vectors[26].x,ship_vectors[26].y,ship_vectors[27].x,ship_vectors[27].y);
  img_ship.line(ship_vectors[28].x,ship_vectors[28].y,ship_vectors[29].x,ship_vectors[29].y);

  //Seiten nach oben
  img_ship.line(ship_vectors[26].x,ship_vectors[26].y,ship_vectors[30].x,ship_vectors[30].y);
  img_ship.line(ship_vectors[28].x,ship_vectors[28].y,ship_vectors[31].x,ship_vectors[31].y);

  //Spitzen nach innen
  img_ship.line(ship_vectors[30].x,ship_vectors[30].y,ship_vectors[32].x,ship_vectors[32].y);
  img_ship.line(ship_vectors[31].x,ship_vectors[31].y,ship_vectors[33].x,ship_vectors[33].y);

  //Lange Flügelseiten zum Schiff
  img_ship.line(ship_vectors[32].x,ship_vectors[32].y,ship_vectors[34].x,ship_vectors[34].y);
  img_ship.line(ship_vectors[33].x,ship_vectors[33].y,ship_vectors[35].x,ship_vectors[35].y);

  //Hinten
  img_ship.line(ship_vectors[36].x,ship_vectors[36].y,ship_vectors[37].x,ship_vectors[37].y);
  //Vorne
  img_ship.line(ship_vectors[38].x,ship_vectors[38].y,ship_vectors[39].x,ship_vectors[39].y);
}
