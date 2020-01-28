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
this.ammo[1] = new Ammo(2, 300, color(120, 20 ,20));
this.ammo[2] = new Ammo(3, 10, color(0,255,0));
this.ammo[3] = new Ammo(4, 1000, color(0));

}

}