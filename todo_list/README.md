# Családi feladatok dokumentáció
## Sós Krisztián Dávid, ED7Q9D

#### Követelményanalízis

##### Követelmények összegyűjtése

###### Funkcionális elvárások

Az alkalmazás segítségével a családtagok üzenni tudnak egymásnak, feladatot tudnak hagyni egymásra. A családtag, miután azonosította magát a bejelentkezéssel, láthatja a feladatok listáját, ezeket szerkesztheti, törölheti, és újat adhat hozzá. A feladatokhoz csak a családtagok férhetnek hozzá.

###### Nem funkcionális elvárások

Az alkalmazás legyen lényegre törő, felhasználóbarát, stabil, gyors és biztonságos.

##### Használatieset-modell

![](http://kepfeltoltes.hu/151111/10132739171_www.kepfeltoltes.hu_.png)

###### Szerepkörök

- Mindenki: Csak a főoldalt láthatja. Elnavigálhat a bejelentkezés fülre, ahol hitelesítheti magát.
- Családtag: Teljes jogosultságot kap: láthatja a feladatok listáját, új feladatot adhat hozzá, szerkesztheti és törölheti a meglévő feladatokat.

#### Tervezés

##### Folyamatok meghatározása

![](http://kepfeltoltes.hu/151111/2678167612_www.kepfeltoltes.hu_.png)

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

###### Adatmodell

![](http://kepfeltoltes.hu/151111/13235185743_www.kepfeltoltes.hu_.png)

###### Adatbázisterv

![](http://kepfeltoltes.hu/151111/11313560784_www.kepfeltoltes.hu_.png)

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

#### Felhasználói dokumentáció

Szükségesek:

- modern böngésző
- Internet kapcsolat

A látogató, ha a család része, akkor jelentkezzen be. Ha ez megtörtént, hozzáférhet a feladatok listájához. A családtag az egyes feladatokat szerkesztheti az űrlapon keresztül, és törölheti is. Új feladatot létrehozni is lehet, itt meg kell adni a leírást, a helyszínt, és a fontosságot.
