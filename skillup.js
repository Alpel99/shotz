class Skillup{
constructor(skill, base, incr, points, max, img) {
    this.skill = skill;
    this.base = base;
    this.increase = incr;
    this.points = points;
    this.maxpoints = max;
    this.image = img;
}

use() {
    this.skill = this.base + this.incr * this.points;
}

skillup() {
if(this.points < this.maxpoints) {
    this.points++;
}
}


}