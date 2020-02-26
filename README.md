# shotz
Shotz game (more complex shooter)

https://trello.com/b/2Vm2EXmP/shotz

## Goals:
* :heavy_check_mark: shooter gameplay
* different levels with different gameplay etc
* :heavy_check_mark: exp for each level
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
* designs for each ship (just change one specific triangle color every time)


## Update Jan 10.02.2020
Bullet überarbeitet:
  * Funktion shoot() in ship.js eingeführt - jetzt lässt sich das shot delay millisekundenweise
    steuern (z.b. shoot(500); bedeutet 2 Schuss pro Sekunde)
  * Bullets haben jetzt vier Parameter:
     * Das Schiff, das den Schuss abgegeben hat (als Referenz)
     * Die Farbe der Bullet
     * Die Schussrichtung
     * Den Schuss-Startpunkt (falls ships später mehrere Kanonen haben)
  * Bulletanimation ist jetzt (mittels p5.deltaTime) unabhängig von Framerate (-> auch in ship- und enemy-Animation einfügen?!)
    Die Variable dt wird jetzt in main.js berechnet, die als Faktor zur Framerate-Kontrolle verwendet werden kann
  * Laser (Bullet-Type) hinzugefügt

  * Laser angepasst: dmg--, bulletspeed+++
  * shoots()-Funktion jetzt generischer für verschiedene Bullets und delays
  * Ship beispielhaft mit 3 verschiedenen Schüssen ausgestattet

## TODO:
* Scaling by window.resize
* EnemyType "SpikeOrbitter" abgeschlossen (ohne extends Enemy)
