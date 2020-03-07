// Hier werden alle PowerUps in einem Objekt gesammelt

const powerups = [
    {
        name: 'hpUP',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'hpUP',
            type: 'pickup',
            description: 'Erhöht die Lebenspunkte des Schiffs um 2.',
            onPickup: (pu) => {
                game.screen.ship.PlayerHP += 2;
                game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
            },
            draw: (x, y, pu, ts) => {
                let content = () => {
                    textSize(25);
                    text("HP+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, content, ts);
            }
        },
        mod: null
    },
    {
        name: 'damageUP',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'damageUP',
            type: 'pickup',
            description: 'Erhöht den Schaden des Schiffes um 2.',
            onPickup: (pu) => {
                game.screen.ship.PlayerDMG += 2;
                game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
            },
            draw: (x, y, pu) => {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    // Aktuelle nur kurze Textzüge, kann aber durch komplexere Grafiken ersetzt werden.
                    textSize(20);
                    text("DMG+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, content);
            }
        },
        mod: null
    },
    {
        name: 'SpeedUP',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'SpeedUP',
            type: 'pickup',
            description: 'Erhöht die Bewegungsgeschwindigkeit des Schiffes.',
            onPickup: (pu) => {
                game.screen.ship.PlayerSPD += 0.5;
                game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
            },
            draw: (x, y, pu) => {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(20);
                    text("SPD+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, content);
            }
        },
        mod: null
    },
    {
        name: 'BulletspeedUP',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'BulletspeedUP',
            type: 'pickup',
            description: 'Erhöht Projektilgeschwindigkeit und Reichweite.',
            onPickup: (pu) => {
                game.screen.ship.bulletspeed += 0.1;
                game.screen.ship.PlayerRNG += 50;
                game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
            },
            draw: (x, y, pu) => {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(25);
                    text("BS+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, content);
            }
        },
        mod: null
    },
    {
        name: 'shotDelayDOWN',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'shotDelayDOWN',
            type: 'pickup',
            description: 'Erhöht die Feuerrate.',
            onPickup: (pu) => {
                game.screen.ship.shotDelay *= 0.95;
                // console.log(pu.pickup);
                // console.log(game.screen.ship.mods[game.screen.ship.mods.indexOf(pu.pickup)]);
                // console.log(game.screen.ship.mods.indexOf(pu.pickup));
                game.screen.ship.mods.splice(game.screen.ship.mods.indexOf(pu.pickup), 1);
            },
            draw: (x, y, pu) => {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(20);
                    text("RoF+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, content);
            }
        },
        mod: null
    },
]
