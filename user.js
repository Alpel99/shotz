let img_item;
class User {
//das lohnt sich nicht -> userdata als object vom server -> exp1 = userdata.exp1;
constructor() {
//get Serverdata
this.name = "testuser123";
this.id = Math.random().toString(10).substr(2, 5);
this.money = 100;
this.exp1 = 800;
this.exp2 = 0;
this.exp3 = 0;
this.lvl1 = 0;
this.lvl2 = 0;
this.lvl3 = 0;
this.ammo = [];
img_item = createGraphics(50, 50);
this.ammo[0] = new Ammo(1, 10000, color(255));
this.ammo[1] = new Ammo(2, 0, color(170, 20 ,20));
this.ammo[2] = new Ammo(3, 0, color(0,255,0));
this.ammo[3] = new Ammo(4, 1000, color(0));
this.ammo[4] = new Ammo(2.5, 1000, color(255,255,0));
this.ISH = new Item("ISH", 10);
this.EMP = new Item("EMP", 20);
this.MINE = new Item("MINE", 100);
this.slots = [];
this.slots[0] = new Slot(1, 1, 49, "ammo1", 0, 0);
this.slots[0].active = true;
this.slots[1] = new Slot(2, 2, 50, "ammo2", 0, 0);
this.slots[2] = new Slot(3, 3, 51, "ammo3", 0, 0);
this.slots[3] = new Slot(4, 4, 52, "ammo4", 0, 0);
this.slots[4] = new Slot(5, 5, 53, "ammoX", 0, 0);
this.slots[5] = new Slot(6, "E", 69, "ISH", 1, 120);
this.slots[6] = new Slot(7, "R", 82, "MINE", 0.2, 60);
this.slots[7] = new Slot(8, "T", 84, "EMP", 0.2, 120);
this.slots[8] = new Slot(9, "F", 70, "SPECIAL", 1, 60);
this.slots[9] = new Slot(10, "Q", 81, "JUMP", 0.1, 20);
this.skillpoints = 15;
this.skillup = {
    "Ship1": {
        "HP": 0,
        "DMG": 0,
        "SPD": 0,
        "RNG": 0,
        "BSPD": 0,
        "FR": 0,
        "SPC": 0,
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
        "LT": 0,
        "EXP": 0
    }
}
this.experience = {
    "Level1": {
        "exp": 0,
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

}
}
