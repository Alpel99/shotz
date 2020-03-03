# shotz
Shotz game (more complex shooter)

https://trello.com/b/2Vm2EXmP/shotz

## Goals:
* shooter gameplay
* different levels with different gameplay etc
* exp for each level
* levelups -> skillpoints for skilltree -> each ship own skilltree
* different item drops from each level -> usable in all levels (through some sort of quickslot bar)
* inventory page
* different ships with different uses (glasscannon, tank, utility)


## long time goals:
* auto idling
* authentication
* hack protection
* pvp
* premium
* support
* user page with statistics
* rankings
* designs for each ship (just change one specific triangle every time)


## Update Jan 03.03.2020
- Ship.collides() hinzugefügt = check, ob Ship mit Gegner kollidiert ist.

- EMP eingefügt (wie in Trello beschrieben, mit Ship.emp() und Enemy.push()) - dazu
  habe ich die enemy location auf Vector umgestellt (this.pos.x, statt this.x) und
  das update dieser location aufgeräumt. Die Taste "R" löst den emp() nicht direkt aus,
  sondern setzt ship.empActive auf true. Der Rest passiert dann automatisch.

- PowerUp-Prototyp eingefügt:
    Einziges Augenmerk bisher auf Funktionalität und Skalierbarkeit - nicht beachtet wurden:
        * Balancing  
        * Kreativität (sowohl der PUs, als auch der Darstellung der Pickups)  
        * Dropwahrscheinlichkeit PUs zu hoch (besser überprüfbar, während dev -
          aktuell Enemy.dropChance = 0.9 = 90%)  
        * Bisher nur Stat-Ups, keine komplexeren (deshalb bisher überall in
          powerups.js mods:null)  

    Programmablauf PU:
        0. Alle Powerups werden als Objekt in powerups.js gespeichert (bisher 5)  
        1. On Enemy-kill (per Bullet oder Crash): Check ob random(1) > Enemy.dropChance  
        2. Falls Check erfolgreich: game.choosePowerUp() - nimmt ein zufälliges PU
           aus powerups-Objekt in powerups.js und fügt es ship.mods[] als type:'pickup' hinzu  
        3. In Ship.update() wird geprüft, ob ein 'pickup'-Objekt in Ship.mods
           enthalten ist - wenn ja: mod.draw()  
        4. mod.draw() verweist an game.drawPickup(), das auch die Logik zum
           Einsammeln und MouseOver enthält (und, perspektivisch, das timeout)  
        5. Wenn Spieler ein pickup einsammelt, wird mod.onPickup() ausgelöst
           (Stat+ oder dauerhaftes Mod an Ship.mods senden)  

    Vorteile:
        * Weitere PowerUps können in einem einheitlichen Format, an einer zentralen
          Stelle ohne zusätzliche Logik eingefügt werden  
        * Sobald ein neues PU auf diese Weise eingefügt wurde, wird es automatisiert
          mit in den Prozess (Programmablauf) einbezogen  
        * Skalierbar (auch komplexere PUs in diesem Format möglich)  

    Was fehlt:
        * Fix Health-bar und MaxHealth des Schiffes
        * Balancing der PUs (dropChance vs. Effektstärke)
        * Überarbeitung des Löschens von PUs beim Einsammeln - bisher verschwinden
          vereinzelt pickups, wenn zuvor mehrere auf dem Screen waren (evtl. uuid
          für PUs erstellen, damit eindeutiger Zugriff möglich ist?!)
        * Lösung für Timeout finden (Entfernen des Pickups vom Screen, wenn
          Spieler es zu lange nicht einsammelt - 5Sek?)
