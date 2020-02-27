class Start_menu {
constructor() {
    this.color0 = color(0);
    this.color1 = color(255, 0, 0);
    this.color2 = color(100, 0, 0);
    this.level =     new StartMenuItem("Level", width/5, height/3, this.color1);
    this.shop =      new StartMenuItem("Shop", width/5 - 50, height/3 + 100, this.color2);
    this.pvp =       new StartMenuItem("PVP", width/5 - 100, height/3 + 200, this.color2);
    this.skillups =     new StartMenuItem("Skillups", width/5 + 300, height/3, this.color1);
    this.ships =     new StartMenuItem("Ships", width/5 + 250, height/3 + 100, this.color1);
    this.inventory = new StartMenuItem("Inventory", width/5 + 200, height/3 + 200, this.color2);
    this.rankings =  new StartMenuItem("Rankings", width/5 + 700, height/3, this.color2);
    this.user =  new StartMenuItem("User", width/5 + 650, height/3 + 100, this.color2);
    this.premium =   new StartMenuItem("Premium", width/5 + 600, height/3 + 200, this.color2);
    this.keys = new StartMenuItem("Controls", width/5 + 150, height/3 + 300, this.color1);
    this.banner =    new StartBanner();
    this.name = "start_menu";
    this.menuOverlay = new MenuOverlay();
}

draw() {
    background(this.color0);
    this.banner.draw();
    this.level.draw();
    this.shop.draw();
    this.pvp.draw();
    this.ships.draw();
    this.inventory.draw();
    this.rankings.draw();
    this.premium.draw();
    this.skillups.draw();
    this.user.draw();
    this.keys.draw();

    this.menuOverlay.draw();
}

back() {
    game.screen = new Start_menu();
}

controls(mode) {
    if (mode === 'keyPress') {
    } else if (mode === 'mousePress') {
        if (this.level.checkHover() === true) {
            game.screen = new Level_menu();
            game.setup = false;
        } else if (this.shop.checkHover() === true) {
            console.log("shop");
        } else if (this.pvp.checkHover() === true) {
            console.log("pvp");
        } else if (this.inventory.checkHover() === true) {
           console.log("inventory");
        } else if (this.ships.checkHover() === true) {
            game.screen = new Ship_menu();
        } else if (this.rankings.checkHover() === true) {
            console.log("rankings");
        } else if (this.premium.checkHover() === true) {
            console.log("premium");
        } else if (this.skillups.checkHover() === true) {
            game.screen = new Shipskill_menu();
        } else if (this.user.checkHover() === true) {
            console.log("user");
        } else if (this.keys.checkHover() === true) {
            game.screen = new Keys_menu();
        }
    } else if (mode === 'mouseClick') {
    }
}
}


class StartMenuItem {
constructor(t, a, b, c) {
    this.x = a;
    this.y = b;
    this.text = t;
    this.color = c;
}

draw() {
    push();
    fill(this.color);
    textAlign(LEFT, TOP)
    textSize(50);
    text(this.text, this.x, this.y);
    var hover = this.checkHover();
    if (hover === false) {
        triangle(this.x - 10, this.y, this.x - 10, this.y + 50, this.x - 40, this.y + 50);
        triangle(this.x + 10 + textWidth(this.text), this.y, this.x + 10 + textWidth(this.text), this.y + 50, this.x + 40 + textWidth(this.text), this.y);
    } else {
        triangle(this.x - 10, this.y, this.x - 10, this.y + 50, this.x - 40, this.y);
        triangle(this.x + 10 + textWidth(this.text), this.y, this.x + 10 + textWidth(this.text), this.y + 50, this.x + 40 + textWidth(this.text), this.y + 50);
    }
    pop();
}

checkHover() {
    push();
    var hover;
    textSize(50);
    if(mouseX > this.x - 10 && mouseX < this.x + 10 + textWidth(this.text) && mouseY > this.y && mouseY < this.y + 50) {
        hover = true;
    } else {
        hover =  false;
    }
    pop();
    return hover;
}
}


class StartBanner {
constructor() {
    this.counter = 0;
}

draw() {
	fill(game.screen.color1);
	if (this.counter > 400) {
		this.counter = 0;
	}
	textAlign(LEFT, CENTER);
	if (this.counter < 15) {
		var ssize = 20 + this.counter*13;
	} else {
		ssize = 220;
	}
	if (this.counter < 25) {
		var hsize = 20 + this.counter*7;
	} else {
		hsize = 200;
	}
	if (this.counter < 40) {
		var osize = 20 + this.counter*4;
	} else {
		osize = 180;
	}
	if (this.counter < 50) {
		var tsize = 20 + this.counter*3;
	} else {
		tsize = 180;
	}
	if (this.counter < 200) {
		var zsize = 75 - this.counter*0.25;
	} else {
		zsize = 25;
	}
	push();
	rotate(-0.1);
	textSize(ssize);
	text('S', 400 + this.counter/100, 200);
	pop();

	push();
	rotate(-0.07);
	textSize(hsize);
	text('h', 550 + this.counter/80, 180 + this.counter/65);
	pop();

	textSize(osize);
	text('o', 650 + this.counter/50 + 40, 130 + this.counter/50);

	push();
	rotate(0.05);
	textSize(tsize);
	text('t', 990 + this.counter/25 - 180, 90 + this.counter/40);
	pop();

	if(this.counter > 51) {
		push();
		rotate(0.1)
		textSize(zsize);
		text('z', 530 + this.counter*6 + this.counter**2 / 50, 50 + this.counter/40);
		pop();
	}
	this.counter = this.counter + 1;
}
}
