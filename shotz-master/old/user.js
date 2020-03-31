//let img_item;
class User {
//das lohnt sich nicht -> userdata als object vom server -> exp1 = userdata.exp1;
constructor() {
//get Serverdata
this.name = "testuser123";
this.id = Math.random().toString(10).substr(2, 5);
this.money = 100;

//img_item = createGraphics(50, 50);
//index, name, amount, damage, color, keyCode, activeTime, cooldown
this.items = [
new Item(1, "ammo1", 10000, 1, color(255), 49, 0, 0),
new Item(2, "ammo2", 0, 2, color(170, 20 ,20), 50, 0, 0),
new Item(3, "ammo3", 0, 3, color(0,255,0), 51, 0, 0),
new Item(4, "ammo4", 1000, 4, color(0), 52, 0, 0),
new Item(5, "ammo5", 1000, 2.5, color(255, 255, 75), 53, -1, 0),
new Item(6, "ISH", 10, 0, color(0, 255, 255), 69, 1, 120),
new Item(7, "EMP", 20, 0, color(255, 255, 200), 82, 0.2, 20),
new Item(8, "MINE", 100, 100, color(200, 0,0 ), 84, 0.2, 60),
new Item(9, "SPC", -1, 10, color(255, 255, 0), 70, 1, 60),
new Item(10, "DASH", -1, 10, color(255), 81, 0.2, 30)
];

this.skillpoints = 15;
this.skillup = {
    "active": 0,
    "Ship1": {
        "HP": 0,
        "DMG": 0,
        "SPD": 0,
        "RNG": 0,
        "BSPD": 0,
        "FR": 0,
        "SPC": 0,
        "DASH": 0,
        "LT": 0,
        "EXP": 0
    },
    "Ship2": {
        "HP": 0,
        "DMG": 0,
        "SPD": 0,
        "RNG": 0,
        "BSPD": 0,
        "FR": 0,
        "SPC": 0,
        "DASH": 0,
        "LT": 0,
        "EXP": 0
    }
}

var a = 400;
this.experience = {
    "Level1": {
        "exp": a,
        "lvl": 1
    },
    "Level2": {
        "exp": 0,
        "lvl": 1
    },
    "Level3": {
        "exp": 0,
        "lvl": 1
    },
    "Level4": {
        "exp": 0,
        "lvl": 1
    },
    "Level5": {
        "exp": 0,
        "lvl": 1
    }
}

this.ships = {
    "Ship1": {
        "color": color(255, 255, 255),
        "owned": true
    },
    "Ship2": {
        "color": color(255, 255, 255),
        "owned": false
    },
    "Ship3": {
        "color": color(255, 255, 255),
        "owned": false
    }
}

} // end Constructor

loadData(data) {
this.ships = {
    "Ship1": {
        "color": data.ships.Ship1.color,
        "owned": data.ships.Ship1.owned
    },
    "Ship2": {
        "color": data.ships.Ship2.color,
        "owned": data.ships.Ship2.owned
    },
    "Ship3": {
        "color": data.ships.Ship3.color,
        "owned": data.ships.Ship3.owned
    }
}
}
}
