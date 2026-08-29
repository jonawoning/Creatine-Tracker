# Creatine Tracker (React + Vite + Tailwind, PWA)

## 1. Vereisten
- [Node.js](https://nodejs.org) (LTS-versie) op je Windows-pc.

## 2. Lokaal draaien (om te testen)
```
npm install
npm run dev
```
Open de getoonde `localhost`-link in je browser.

## 3. Productie-build maken
```
npm run build
```
Dit genereert een map `dist/` met de volledig statische site, inclusief de
service worker voor offline gebruik.

## 4. Op je iPhone zetten
De app moet ergens bereikbaar zijn via **https** voordat je hem op je iPhone kunt
installeren (PWA's vereisen https, behalve op `localhost`). Makkelijkste opties,
allebei gratis:

**Optie A — Vercel**
1. Maak een gratis account op vercel.com
2. Sleep de projectmap (of koppel een GitHub-repo) en deploy
3. Open de gegeven `https://...vercel.app` link op je iPhone in Safari

**Optie B — Netlify**
1. Maak een gratis account op netlify.com
2. Sleep de `dist/`-map (na `npm run build`) in Netlify Drop (app.netlify.com/drop)
3. Open de gegeven link op je iPhone in Safari

## 5. Installeren als app-icoon
1. Open de link in **Safari** op je iPhone (moet Safari zijn, niet Chrome)
2. Tik op het deel-icoon (vierkant met pijl omhoog)
3. Kies **"Zet op beginscherm"**
4. Je krijgt nu een eigen icoon dat fullscreen opent, zonder Safari-balken

## Offline gebruik
Na de eerste keer openen worden alle bestanden (HTML/CSS/JS) automatisch
gecached door de service worker. Daarna werkt de app ook zonder internet —
je invoer wordt lokaal opgeslagen in `localStorage` op je telefoon, dus je
hebt geen server of account nodig.

**Let op:** als je de site herbouwt en opnieuw deployt, moet je de app op je
telefoon één keer openen met internet zodat de nieuwe versie gecached wordt.

## Projectstructuur
```
src/
  App.jsx              hoofdcomponent + navigatie tussen tabs
  useCreatineStore.js  logica voor opslag en streak-berekening
  components/
    Home.jsx           "Vandaag"-scherm met status en knoppen
    Logbook.jsx         kalenderweergave per maand
    NavBar.jsx          onderste tabbalk
```
