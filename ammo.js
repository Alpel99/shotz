class Ammo {
constructor(d, a, c) {
    this.amount = d;
    this.damage = a;
    this.color = c;
}
decrease() {
    this.amount--;
}
}