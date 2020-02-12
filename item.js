class Item {
constructor(index, use, a, d, c, k, at, cdt) {
    this.index = index;
    this.use = use;
    this.amount = a;
    this.damage = d;
    this.color = c;
    this.keyCode = k;
    this.active = false;
    this.activeTime = at*60;
    this.cooldownTime = cdt*60;
    this.counter = 0;
    this.activeCounter = -1;
    //String.fromCharCode(e.keyCode)

}

draw() {
if(game.screen.name.replace(/[0-9]/g, '') == "Level") {
    this.x = this.index*60 + width/2 - 320; //corner
    this.y = height - 100; //corner
}
push();
fill(game.screen.color2);
rect(this.x, this.y, 50, 50, 2);
pop();
img_item.clear();
switch (this.use.replace(/[0-9]/g, '')) {
    case "ISH":
        img_item.push();
        img_item.fill(255);
        img_item.ellipse(25,25,32);
        img_item.noFill();
        img_item.stroke(0);
        img_item.strokeWeight(1);
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                img_item.ellipse(15 + i*5, 15+j*5, 6);
            }

        }
        img_item.stroke(0, 200, 255);
        img_item.strokeWeight(6);
        img_item.ellipse(25,25,32);
        img_item.pop();
        break;
    case "MINE":
        img_item.push();
        img_item.fill(200,0,0);
        img_item.noStroke();
        img_item.triangle(20,25,30,25,25,2);
        img_item.triangle(20,25,30,25,25,48);
        img_item.triangle(25,20,25,30,2,25);
        img_item.triangle(25,20,25,30,48,25);
        img_item.fill(128,0,0);
        img_item.ellipse(25,25,30);
        img_item.pop();
        break;
    case "EMP":
        img_item.push();
        img_item.fill(255);
        img_item.stroke(255);
        img_item.triangle(40, 10, 35, 5, 10, 20);
        img_item.triangle(10, 20, 20, 18, 40, 25);
        img_item.triangle(40, 25, 32, 22, 15, 40);
        img_item.triangle(17, 32, 28, 40, 15, 42);
        img_item.pop();
        break;
    case "SPECIAL":
        break;
    case "ammo":
        img_item.push();
        img_item.noStroke();
        img_item.translate(25,25);
        img_item.fill(this.color);
        img_item.ellipse(0, 15, 12, 15);

        img_item.fill(0);
        img_item.rect(-5, -5, 10, 15, 3);

        img_item.fill(255);
        img_item.rect(-6,-5,2,20,4);
        img_item.rect(-2,-5,4,22,2);
        img_item.rect(4,-5,2,20,4);

        //real ammo
        img_item.fill(this.color);
        img_item.rect(-4,-5,8,-19,5);
        img_item.strokeWeight(1);
        img_item.stroke(this.color);
        img_item.line(-4,-5,-6,-10);
        img_item.line(4,-5,6,-10);
        img_item.line(4,-3,10,-8);
        img_item.line(-4,-3,-10,-8);
        img_item.pop();
        break;
    case "SPC":
        img_item.push();
        img_item.fill(0, 255, 255)
        img_item.textSize(40);
        img_item.textStyle(BOLD);
        img_item.textAlign(CENTER, CENTER);
        img_item.text("S", 25, 30);
        img_item.pop();
        break;

    case "DASH":
        img_item.push();
        img_item.stroke(255);
        img_item.strokeWeight(5);
        img_item.line(13,10,13,40);
        img_item.line(19,15,19,35);
        img_item.strokeWeight(4);
        img_item.line(24,18,24,32);
        img_item.line(29,22,29,28);
        img_item.strokeWeight(3);
        img_item.line(33,24,33,26);
        img_item.noStroke();
        img_item.fill(255,0,0);
        img_item.triangle(36,18,36,32,43,25);
        img_item.pop();
        break;
    }

    //Image
    push();
    imageMode(CORNER);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    image(img_item, this.x, this.y);
    if(this.amount > -1) {
        text(this.amount, this.x + 48, this.y - 2)
    }
    pop();

    //active
    if(this.active == true || this.activeCounter > 0) {
        push();
        stroke(game.screen.color1);
        strokeWeight(3);
        noFill();
        rect(this.x, this.y, 50, 50, 2);
        pop();
    }

    //Cooldown
    if(this.counter > 0) {
        //cooldown
        var a = map(this.counter, 0, this.cooldownTime, -PI/2, PI*1.5);
        push();
            fill(game.screen.color3);
            arc(this.x + 25, this.y + 25, 45, 45, -PI/2, a);
        pop();
    }

    //KeyName
    push();
    fill(game.screen.color1);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text(String.fromCharCode(this.keyCode), this.x + 48, this.y + 50);
    pop();

}

update() {
    if(this.counter > 0) {
        this.counter--;
    }
    if(this.activeCounter > 0) {
        this.activeCounter--;
    } else {
        if(this.activeCounter == 0) {
            this.counter = this.cooldownTime;
            this.activeCounter = -1;
        }
    }
}

activate() {
    switch (this.use) {
        case "ammo1":
            var ammo = user.items.find(element => element.use == "ammo1");
            this.resetAmmo(ammo);
            break;
        case "ammo2":
            var ammo = user.items.find(element => element.use == "ammo2");
            this.resetAmmo(ammo);
            break;
        case "ammo3":
            var ammo = user.items.find(element => element.use == "ammo3");
            this.resetAmmo(ammo);
            break;
        case "ammo4":
            var ammo = user.items.find(element => element.use == "ammo4");
            this.resetAmmo(ammo);
            break;
        case "ammo5":
            var ammo = user.items.find(element => element.use == "ammo5");
            this.resetAmmo(ammo);
            break;
        case "ISH":
            //ship für (2) Sekunden unverwundbar, coole anmiation mit kreis rings rum -> wie stern supermario (killt natürlich bosse etc nicht)
            break;
        case "MINE":
            //mine gelegt, wenn wer rein fliegt: damage
            break;
        case "EMP":
            //schubst gegner weg/hebt chase auf etc
            break;
        case "SPECIAL":
            //game.screen.ship.special();
             break;
        case "DASH":
            game.screen.ship.dash();
            break;
    }
    this.activeCounter = this.activeTime;
}

resetAmmo(ammo) {
    game.screen.ammo = ammo;
    for(let i = 0; i < user.items.length; i++) {
        user.items[i].active = false;
    }
    ammo.active = true;
}
}
