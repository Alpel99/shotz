class Start_menu {
constructor() {
this.color0 = color(0);
this.color1 = color(255,0,0);
this.level = new StartMenuItem("Level", width/5, height/3);
this.shop = new StartMenuItem("Shop", width/5 - 50, height/3 + 100);
this.pvp = new StartMenuItem("PVP", width/5 - 100, height/3 + 200);
this.inventory = new StartMenuItem("Inventory", width/5 + 300, height/3);
this.user = new StartMenuItem("User", width/5 + 250, height/3 + 100);
this.rankings = new StartMenuItem("Rankings", width/5 + 200, height/3 + 200);
this.premium = new StartMenuItem("Premium", width/5 + 650, height/3 + 100);
this.banner = new StartBanner();
this.name = "start_menu";
}
draw() {
background(this.color0);
this.banner.draw();
this.level.draw(this.level.checkHover());
this.shop.draw(this.shop.checkHover());
this.pvp.draw(this.pvp.checkHover());
this.inventory.draw(this.inventory.checkHover());
this.user.draw(this.user.checkHover());
this.rankings.draw(this.rankings.checkHover());
this.premium.draw(this.premium.checkHover());
}
increase() {
game.screen = new Level_menu();
}

back() {
game.screen = new Start_menu();
}
}

class StartMenuItem {
constructor(t, a, b) {
this.x = a;
this.y = b;
this.text = t;
}
draw(hover) {
push();
fill(game.screen.color1);
textAlign(LEFT, TOP)
textSize(50);
text(this.text, this.x, this.y);
if(hover === false) {
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
textSize(50);
if(mouseX > this.x - 10 && mouseX < this.x + 10 + textWidth(this.text) && mouseY > this.y && mouseY < this.y + 50) {
    return true;
} else {
    return false;
}
pop();
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
	rotate(0.05)
	textSize(tsize);
	text('t', 990 + this.counter/25 - 180, 90 + this.counter/40);
	pop();

	if(this.counter > 51   ) {
		push();
		rotate(0.1)
		textSize(zsize);
		text('z', 530 + this.counter*6 + this.counter**2 / 50, 50 + this.counter/40);
		pop();
	}
	this.counter = this.counter + 1;
}
}