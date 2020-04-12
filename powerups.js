// Hier werden alle PowerUps in einem Objekt gesammelt

const powerups = [
    {
        name: 'hpUP',
        count: 'multiple',  // Wie oft kann es eingesammelt werden? unique/multiple
        pickup: {           // Alles zum sammelbaren Icon
            name: 'hpUP',
            type: 'pickup',
            description: 'Erhöht die Lebenspunkte des Schiffs um 2.',
            onPickup: function() {
                if(game.screen.ship.PlayerHP < game.screen.ship.maxHP) {
                    game.screen.ship.PlayerHP++;
                }
                game.deletePickUp(this);
            },
            draw: function(x, y, pu) {
                let content = () => {
                    textSize(25);
                    text("HP+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, this, content);
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
            onPickup: function() {
                game.screen.ship.PlayerDMG += 2;
                game.deletePickUp(this);
            },
            draw: function(x, y, pu) {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    // Aktuelle nur kurze Textzüge, kann aber durch komplexere Grafiken ersetzt werden.
                    textSize(20);
                    text("DMG+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, this, content);
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
            onPickup: function() {
                game.screen.ship.PlayerSPD += 0.5;
                game.deletePickUp(this);
            },
            draw: function(x, y, pu) {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(20);
                    text("SPD+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, this, content);
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
            onPickup: function() {
                game.screen.ship.bulletspeed += 0.1;
                game.screen.ship.PlayerRNG += 50;
                game.deletePickUp(this);

            },
            draw: function(x, y, pu) {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(25);
                    text("BS+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, this, content);
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
            onPickup: function() {
                game.screen.ship.shotDelay *= 0.95;
                game.deletePickUp(this);
            },
            draw: function(x, y, pu) {
                // hier wird das Aussehen des pickups (innerhalb des Vierecks) an game.drawPickup() übergeben
                let content = () => {
                    textSize(20);
                    text("RoF+", x+5, y+30);
                }
                game.drawPickup(x, y, pu, this, content);
            }
        },
        mod: null
    }
]
