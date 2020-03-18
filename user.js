class User {
constructor() {

} // end Constructor

loadData(data) {
this.skillpoints = data.skillpoints;
this.money = data.money;
this.id = data.id;
this.name = data.name;

this.items = this.items = [
//index, name, amount, damage, color, keyCode, activeTime, cooldown
new Item(1, "ammo1", data.items.ammo1.amount, 1, color(255), data.items.ammo1.keyCode, 0, 0),
new Item(2, "ammo2", data.items.ammo2.amount, 2, color(170,20,20), data.items.ammo2.keyCode, 0, 0),
new Item(3, "ammo3", data.items.ammo3.amount, 3, color(0,255,0), data.items.ammo3.keyCode, 0, 0),
new Item(4, "ammo4", data.items.ammo4.amount, 4, color(0), data.items.ammo4.keyCode, 0, 0),
new Item(5, "ammo5", data.items.ammo5.amount, 2.5, color(255, 255, 75), data.items.ammo5.keyCode, -1, 0),
new Item(6, "ISH", data.items.ISH.amount, 0, color(0, 255, 255), data.items.ISH.keyCode, 1, 120),
new Item(7, "EMP", data.items.EMP.amount, 0, color(255, 255, 200), data.items.EMP.keyCode, 0.2, 20),
new Item(8, "MINE", data.items.MINE.amount, 100, color(200, 0,0 ), data.items.MINE.keyCode, 0.2, 60),
new Item(9, "SPC", -1, 10, color(255, 255, 0), data.items.SPC.keyCode, 1, 60),
new Item(10, "DASH", -1, 10, color(255), data.items.DASH.keyCode, 0.2, 30)
];

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
};

this.experience = {
    "Level1": {
        "exp": data.experience.Level1.exp,
        "lvl": data.experience.Level1.lvl
    },
    "Level2": {
        "exp": data.experience.Level2.exp,
        "lvl": data.experience.Level2.lvl
    },
    "Level3": {
        "exp": data.experience.Level3.exp,
        "lvl": data.experience.Level3.lvl
    },
    "Level4": {
        "exp": data.experience.Level4.exp,
        "lvl": data.experience.Level4.lvl
    },
    "Level5": {
        "exp": data.experience.Level5.exp,
        "lvl": data.experience.Level5.lvl
    }
};

//remove active, if !active = [0]
this.skillup = {
    "active": data.skillup.active,
    "Ship1": {
        "HP": data.skillup.Ship1.HP,
        "DMG": data.skillup.Ship1.DMG,
        "SPD": data.skillup.Ship1.SPD,
        "RNG": data.skillup.Ship1.RNG,
        "BSPD": data.skillup.Ship1.BSPD,
        "FR": data.skillup.Ship1.FR,
        "SPC": data.skillup.Ship1.SPC,
        "DASH": data.skillup.Ship1.DASH,
        "LT": data.skillup.Ship1.LT,
        "EXP": data.skillup.Ship1.EXP
    },
    "Ship2": {
        "HP": data.skillup.Ship2.HP,
        "DMG": data.skillup.Ship2.DMG,
        "SPD": data.skillup.Ship2.SPD,
        "RNG": data.skillup.Ship2.RNG,
        "BSPD": data.skillup.Ship2.BSPD,
        "FR": data.skillup.Ship2.FR,
        "SPC": data.skillup.Ship2.SPC,
        "DASH": data.skillup.Ship2.DASH,
        "LT": data.skillup.Ship2.LT,
        "EXP": data.skillup.Ship2.EXP
    }
};

this.activeShip = new Ship1(width/2, height/2);

} //end loadData

sendData() {
//making data ready to be shipped to the server
var data = {
	money: this.money,
	skillpoints: this.skillpoints,
	items: {
		ammo1: {
			amount: this.items[0].amount,
			keyCode: this.items[0].keyCode
		},
                ammo2: {
                        amount: this.items[1].amount,
                        keyCode: this.items[1].keyCode
                },
                ammo3: {
                        amount: this.items[2].amount,
                        keyCode: this.items[2].keyCode
                },
                ammo4: {
                        amount: this.items[3].amount,
                        keyCode: this.items[3].keyCode
                },
                ammo5: {
                        amount: this.items[4].amount,
                        keyCode: this.items[4].keyCode
                },
                ISH: {
                        amount: this.items[5].amount,
                        keyCode: this.items[5].keyCode
                },
                EMP: {
                        amount: this.items[6].amount,
                        keyCode: this.items[6].keyCode
                },
                MINE: {
                        amount: this.items[7].amount,
                        keyCode: this.items[7].keyCode
                },
                SPC: {
                        keyCode: this.items[8].keyCode
                },
                DASH: {
                        keyCode: this.items[9].keyCode
                }
	},
	ships: this.ships,
	experience: this.experience,
	skillup: this.skillup
}
return data;
} //end sendData

}
