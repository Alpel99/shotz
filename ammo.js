class Ammo {
constructor(d, a, c) {
    this.amount = a;
    this.damage = d;
    this.color = c;
}
decrease() {
    this.amount--;
}
}