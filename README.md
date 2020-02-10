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


## Update Jan 09.02.2020
* Controls handler eingefügt zur Steuerung aller Eingaben direkt am verantwortlichen Element
  control() wird in main.js durch die entsprechenden p5-EventHandler aufgerufen und die
  Funktionalität wird an das entsprechende Element delegiert -- Die Files keys.js
  und mouse.js sind überflüssig geworden und gelöscht
* Drawing level menu items fixed
* Screen-Dateien in den entsprechenden Ordner gelegt
* Bullet-Array vom Level ins Ship verlagert - Schüsse werden jetzt vom Ship ausgelöst

## Update Jan 10.02.2020
Bullet überarbeitet:
  * Funktion shoot() in ship.js eingeführt - jetzt lässt sich das shot delay millisekundenweise
    steuern (z.b. shoot(500); bedeutet 2 Schuss pro Sekunde)
  * Bullets haben jetzt vier Parameter:
     * Das Schiff, das den Schuss abgegeben hat (als Referenz)
     * Die Farbe der Bullet
     * Die Schussrichtung
     * Den Schuss-Startpunkt (falls ships später mehrere Kanonen haben)
  * Bulletanimation ist jezuz (mittels p5.deltaTime) unabhängig von Framerate (-> auch in ship- und enemy-Animation einfügen?!)
  * Laser (Bullet-Type) hinzugefügt

## TODO:
* Scaling by window.resize
* EnemyType "SpikeOrbitter" abgeschlossen (ohne extends Enemy)
