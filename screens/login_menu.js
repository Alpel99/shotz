class Login_menu {
constructor() {
	this.name = "login_menu";
	this.color0 = color(64);
	this.color1 = color(255,0,0);
	this.color2 = color(0);

	this.x = width/4;
	this.mode = "login";
	this.fix = false;

	this.username = createInput();
	this.username.position(this.x, height/3);
	this.username.style('padding', '5px');
	this.username.style('border', '2px solid black');
	this.username.style('border-radius', '5px');
	this.username.style('color', 'red');
	this.username.style('height', '35');
	this.username.style('width', '10%');
	this.username.style('font-weight', '700');
	this.username.style('font-size', '17');

	this.password = createInput('', 'password');
	this.password.position(this.x, height/3 + 150);
	this.password.style('padding', '5px');
        this.password.style('border', '2px solid black');
        this.password.style('border-radius', '5px');
        this.password.style('color', 'red');
        this.password.style('height', '35');
        this.password.style('width', '10%');
        this.password.style('font-weight', '700');
	this.password.style('font-size', '17');

        this.check = createInput('', 'password');
        this.check.position(this.x, height/3 + 300);
        this.check.style('padding', '5px');
        this.check.style('border', '2px solid black');
        this.check.style('border-radius', '5px');
        this.check.style('color', 'red');
        this.check.style('height', '35');
        this.check.style('width', '10%');
        this.check.style('font-weight', '700');
        this.check.style('font-size', '17');

	this.login = new Button(this.x + 75 , height/2 + 100, 150, "Login");
	this.register = new Button(this.x + 75 , height/2 + 250, 150, "Register");
}

draw() {
	background(this.color0);

	if(this.mode == "login") {
		this.check.hide();
	} else {
		this.check.show();
	}
	push();
	fill(this.color1);
	textSize(90);
	textAlign(CENTER);
	text("Welcome to Shotz", width/2, 115);
	pop();

	push();
	fill(this.color1);
	textSize(40);
	textAlign(LEFT, BOTTOM);
	text("Username", this.x - 5, height/3 - 15);
	text("Password", this.x - 5, height/3 + 135)
	if(this.mode == "register") {
		text("Confirm", this.x - 5, height/3 + 285)
	}
	if(this.fail == true) {
		textAlign(CENTER);
		fill(this.color2);
		text(this.error, width/2, height/2);
	}
	pop();

	this.login.draw();
	this.register.draw();

	if(this.mode == "register") {
		this.login.y = height/2 + 350;
	} else {
		this.login.y = height/2 + 150;
	}

}

controls(mode) {
    if (mode === 'keyPress') {
	if(keyCode == 13 && this.mode == "login") {
		this.loginsubmit();
	}
        if(keyCode == 13 && this.mode == "register") {
                this.registersubmit();
        }
    } else if (mode === 'mousePress') {
	//use this
	if(this.login.hover() == true && this.mode == "login") {
		this.loginsubmit();
	}

	if(this.login.hover() == true && this.mode == "register") {
		this.mode = "login";
	}

	if(this.register.hover() == true && this.mode == "register") {
		this.registersubmit();
	}
        if(this.register.hover() == true && this.mode == "login") {
                this.mode = "register";
        }

    } else if (mode === 'mouseClick') {
    }
}

registersubmit() {
if(this.password.value() == this.check.value() && this.password.value().length > 5) {
        var data = {
                username: this.username.value(),
                password: this.password.value()
        	}
        socket.emit('register', data);
        }
        else {
	        this.fail = true;
        	this.error = "The username is already taken,\nthe passwords didn't match\nor the password is too short";
	}
}

loginsubmit() {
var data = {
        username: this.username.value(),
        password: this.password.value()
}
socket.emit('login', data);
}

handleLogin(data) {
if(data == true) {
	game.screen.username.remove();
	game.screen.password.remove();
	game.screen.check.remove();
	game.screen = new Start_menu();
	this.fail = false;
} else {
	this.fail = true;
	this.error = "Login not successfull\n wrong passowrd\n or wrong username";
}
}

handleRegister(data) {
if(data == true) {
	this.password.value('');
	this.username.value('');
	this.check.value('');
	this.fail = false;
	this.mode = "login";
} else {
	this.fail = true;
	this.error = "This username already taken\nplease choose a different one";
}
}


back() {
	console.log("Err");
}


}
