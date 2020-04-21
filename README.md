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


## Update Jan 21.04.2020
* Screenshake-Effekt hinzugefügt (vorerst nur bei Minen-Explosion)
* game.removeFromList(list,element)-Funktion hinzugefügt zum Löschen von Objekten
    aus Listen und an allen relevanten Stellen impementiert
* Mine überarbeitet - jetzt wird nur noch die Mine gelöscht, die tatsächlich explodiert ist,
    auch wenn mehrere Minen auf dem Spielfeld liegen
* enemy.empActive entfernt - nun wird geprüft, ob die Druckwelle in enemy.pushes-Array
    vermerkt ist. Das ist allgemeiner und so kann auch die Mine die Druckwelle verarbeiten
* PowerUp ExplosionsradiusUP eingefügt.
