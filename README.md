# Jobs - een jobtracking applicatie

Handig om bij te houden waar je op gereageerd hebt en wat de status van een aanvraag is.

Je moet eerst inloggen zodat je je eigen gegevens kunt beheren:
- op een test account met test data: test@test.com / &8uBv58pSc
- met Github
- met Google

Functionaliteit:
- Voeg een nieuwe job toe
- Sorteer op datum, bedrijf, locatie en status
- Houd de feedback van de sollicitatie bij

Gebruikte techniek: Angular 20+ Signals, Angular Material, TailwindCSS, Angular Router en RxJs

## Demo modus
Om de webapp te kunnen tonen zonder je eigen data te moeten prijsgeven is er een dummy account met dummy data. Log daarvoor in met het `test@test.com` e-mailadres

## Genereren van dummy data met faker-js
Om de dummy data te genereren voor het test account is gebruik gemaakt van [faker-js](https://fakerjs.dev/guide/). Het werkt heel simpel: om testdata te genereren in de database voer je het script uit in `/Users/marcbakker/Projecten/www/jobs/generateData.js`. Configuratie (zoals dummy tekst en aantal jobs) vind je in de code.

## Gebruik content-security-policy
In develop is het mogelijk om CSP headers toe te voegen aan een HTTP respons. Daarvoor moet je een Express server starten. Deze dient als proxy en voegt de CSP header met directives toe. Met de node server (`ng serve`) kan dat namelijk niet (met `/proxy-conf.js` ook niet).
Er is verder niks gewijzigd aan de Angular app zelf omdat CSP puur een backend feature is - aan de frontend is het de browser die de directives opvolgt, niet Angular. Omdat de app in develop correct functioneert met de csp directives moet het ook in productie werken wanneer deze directives toegevoegd worden aan de webserver.

Start de Express proxy server op met `node apps/jobs/csp-proxy.js`
Vervolgens roep je de app aan op `localhost:3001`. De proxy stuurt door naar `localhost:4200` en voegt de csp headers toe aan de respons.
note: 
Om `login met Github` te laten werken was het nodig om in `apps/jobs/csp-proxy.js`
```
crossOriginOpenerPolicy: {
      policy: "same-origin-allow-popups", // anders gaat het login met Github niet werken, omdat die een popup opent
    }
```
toe te voegen. CSP heeft geen invloed op de inloggen met Github functionaliteit.