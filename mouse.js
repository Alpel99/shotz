function mouseClicked() {
//start_menu
if(game.screen.name == "start_menu") {
    if(game.screen.level.checkHover() === true) {
        game.screen = new Level_menu();
        game.setup = false;
    } else
    if(game.screen.shop.checkHover() === true) {
        console.log("shop");
    } else
    if(game.screen.pvp.checkHover() === true) {
        console.log("pvp");
    } else
    if(game.screen.inventory.checkHover() === true) {
        console.log("inventory");
    } else
    if(game.screen.user.checkHover() === true) {
        console.log("user");
    } else
    if(game.screen.rankings.checkHover() === true) {
        console.log("rankings");
    } else
    if(game.screen.premium.checkHover() === true) {
        console.log("premium");
    }
} else

//Level_menu
if(game.screen.name == "level_menu") {
    if(game.screen.levels[0].checkHover() === true) {
        game.screen = new Level1();
        game.screen.setup();
    } else
    if(game.screen.levels[1].checkHover() === true) {
        console.log("Level2");
    } else
    if(game.screen.levels[2].checkHover() === true) {
        console.log("Level3");
    }
}


}