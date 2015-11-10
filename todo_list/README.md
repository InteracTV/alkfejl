# Családi feladatok dokumentáció
## Sós Krisztián Dávid, ED7Q9D

#### Követelményanalízis

##### Követelmények összegyűjtése

###### Funkcionális elvárások

Az alkalmazás segítségével a családtagok üzenni tudnak egymásnak, feladatot tudnak hagyni egymásra. A családtag, miután azonosította magát a bejelentkezéssel, láthatja a feladatok listáját, ezeket szerkesztheti, törölheti, és újat adhat hozzá. A feladatokhoz csak a családtagok férhetnek hozzá.

###### Nem funkcionális elvárások

Az alkalmazás legyen lényegre törő, felhasználóbarát, stabil, gyors és biztonságos.

##### Használatieset-modell

###### Szerepkörök

- Mindenki: Csak a főoldalt láthatja. Elnavigálhat a bejelentkezés fülre, ahol hitelesítheti magát.
- Családtag: Teljes jogosultságot kap: láthatja a feladatok listáját, új feladatot adhat hozzá, szerkesztheti és törölheti a meglévő feladatokat.

#### Tervezés

##### Architektúra terv

###### Oldaltérkép

Publikus:

- Főoldal
- Bejelentkezés

Családtag

- Főoldal
- Bejelentkezés / Kijelentkezés
- Feladatok listája
    + új feladat
    + feladat szerkesztése
    + feladat törlése

###### Végpontok

- GET /: főoldal
- GET /login: bejelentkezés
- POST /login: bejelentkezési adatok felküldése
- GET /tasks/list: feladatok listája
- GET /tasks/new: új feladat felvitele
- POST /tasks/new: új feladat felvitele, adatok küldése
- GET /tasks/id: feladat adatai
- POST /tasks/id/comment: új megjegyzés


