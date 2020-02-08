class User {
//das lohnt sich nicht -> userdata als object vom server -> exp1 = userdata.exp1;
constructor() {
//get Serverdata
this.money = 100;
this.exp1 = 800;
this.exp2 = 0;
this.exp3 = 0;
this.lvl1 = 0;
this.lvl2 = 0;
this.lvl3 = 0;
this.ammo = [];
this.ammo[0] = new Ammo(1, 100, color(255));
this.ammo[1] = new Ammo(2, 300, color(170, 20 ,20));
this.ammo[2] = new Ammo(3, 10, color(0,255,0));
this.ammo[3] = new Ammo(4, 1000, color(0));
this.ammo[4] = new Ammo(2.5, 1000, color(255,255,0));
this.slots = [];
this.slots[0] = new Slot(1, 1, "ammo1", 0, 0);
this.slots[1] = new Slot(2, 2, "ammo2", 0, 0);
this.slots[2] = new Slot(3, 3, "ammo3", 0, 0);
this.slots[3] = new Slot(4, 4, "ammo4", 0, 0);
this.slots[4] = new Slot(5, 5, "ammoX", 0, 0);
this.slots[5] = new Slot(6, "E", "ISH", 1, 30);
this.slots[6] = new Slot(7, "R", "MINE", 0.5, 15);
this.slots[7] = new Slot(8, "T", "SMB", 1, 30);
this.slots[8] = new Slot(9, "F", "SPECIAL", 1, 60);
}

}