class LevelOverlay {
constructor() {
}

draw() {
push();
rectMode(CENTER);
fill(0);
rect(width/2, 40, 300, 20, 5);
rectMode(CORNER);
fill(230,40,40);
rect(width/2 - 148, 32, map(game.screen.ship.PlayerHP, 0, 3 + game.screen.skillPointsHP, 0, 296), 16, 5);
pop();

push();
textSize(32);
fill(game.screen.color2);
textAlign(LEFT);
text("Score: " + game.screen.score, 20, 40);
text("Wave: " + game.screen.wave, 20, 80);
pop();
}

}
