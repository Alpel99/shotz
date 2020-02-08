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


## Update Jan 01.02.2020
* Wechsel von p5-cdn auf assets/p5.min.js -> funktioniert auch offline (Coding in S-Bahn möglich)
* Überarbeitung Enemy - ohne reset() - für einfachere Struktur, damit später einfacher neue Gegnertypen hinzugefügt werden können
* isHit()-Funktion eingefügt, zum einfachen und standardisierten Kollisions-Check (--> auch in ship.js einfügen)
* Player-Variablen aus Lvl nach ship ausgegliedert (da playerHP etc keine Lvl-Variable ist)
* Einige Verantwortlichkeiten zurechtgerückt (z.B. wave++, score++ aus bullet.js in level.js)
