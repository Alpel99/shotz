class Ammo {
constructor(a, b) {
    this.amount = b;
    this.damage = a;
}
decrease() {
    this.amount--;
}
}