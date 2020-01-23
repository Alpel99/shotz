function keyPressed() {
if(keyCode === 81) {
    game.screen.back();
    try{
        game.screen.reset();
    } catch(error) {

    }
}
if((keyCode === 68  || keyCode === RIGHT_ARROW) && game.screen.name == "level_menu") {
    game.screen.page++;
}
if((keyCode === 65  || keyCode === LEFT_ARROW) && game.screen.name == "level_menu" && game.screen.page > 1) {
    game.screen.page--;
}
}