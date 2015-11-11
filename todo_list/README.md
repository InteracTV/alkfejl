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

#### Implementáció

##### Fejlesztői környezet bemutatása

Fejlesztői környezet gyanánt a Cloud9 Web IDE-t használtam, egy account segítségével. Node.js workspace-ben fejlesztődött.

Használt API-k:
- Express
- Express-session
- Express-validator
- bcryptjs
- body-parser
- Chai
- Connect-flash
- Hbs
- Mocha
- Passport
- Passport-local

Adatbázis:
- Waterline

##### Könyvtárstruktúrában lévő mappák funkiójának bemutatása

- config: a Waterline konfigurációja
- controllers: vezérlő egységek
- models: modell egységek
- node_modules: használt API-k konfigurációja
- public: Bootstrap css, bootswatch témák, JQuery fájlok
- views: a megjelenítésért felelős fájlok (.hbs)


