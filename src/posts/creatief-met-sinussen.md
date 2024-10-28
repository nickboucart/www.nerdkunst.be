---
title: Creatief Met Sinussen
date: '2024-03-06'
tags:
 - keltische kunst
 - tutorial
 - goniometrie
image: keltische-knoop.png
description: Van eenheidscirkel naar keltisch geïnspireerde vormen
draft: false
---

<script lang="ts">
    import P5 from '$lib/components/P5.svelte';

    let sketch1= `
let straal = 125;

function setup() {
  createCanvas(400, 400);
  background(220);
  colorMode(HSL);
}

function draw() {
  translate(width / 2, height / 2);

  let x = straal * cos(frameCount / 20);
  let y = straal * sin(frameCount / 20);

  noStroke();
  fill(frameCount % 360, 25, 50);
  circle(x, y, 10);
}`

const sketch2 = `
let straal = 125;

function setup() {
  createCanvas(400, 400);
  background(220);
  colorMode(HSL);
}

function draw() {
  translate(width / 2, height / 2);

  let x = straal * cos(frameCount / 45);
  let y = straal * sin(frameCount / 20);

  noStroke();
  fill(frameCount % 360, 75, 50);
  circle(x, y, 10);
}`

const sketch3= `
let straal = 125;
let factorX = 40;
let factorY = 50;
let sliderX;
let sliderY;

function setup() {
  createCanvas(400, 400);
  background(30);
  colorMode(HSL);
  sliderX = createSlider(20, 60, factorX);
  sliderX.input(nieuweInput);
  sliderX.position(10,10);
  sliderY = createSlider(20, 60, factorY);
  sliderY.input(nieuweInput);
  sliderY.position(10, 30);

  let sliderTekst = createP("Verander de vorm door de sliders te verschuiven.");
  sliderTekst.position(10, 40);
}

function draw() {
  translate(width / 2, height / 2);

  let x = straal * cos(frameCount / factorX);
  let y = straal * sin(frameCount / factorY);

  noStroke();
  fill(frameCount % 360, 60, 50);
  circle(x, y, 10);
}

function nieuweInput() {
  noLoop();
  factorX = sliderX.value();
  factorY = sliderY.value();

  background(30);
  loop();
}`
    </script>
In een [vorige post](/over-hoeken-sinussen-en-cosinussen) hebben we het gehad over hoeken, cosinussen en sinussen. Vandaag gaan we wat verder op dat thema en maken we allerhande goniometrische kunst.

<!--more-->
## Even herhalen.
Er was eens, de cirkel. Zoals aangegeven in [het dit artikel over hoeken](/over-hoeken-sinussen-en-cosinussen), kan je de coördinaten van de punten op een cirkel vinden door de cosinus en sinus te nemen van de hoek die dat punt op de cirkel maakt met de x-as. We kunnen deze eigenschap gebruiken om een cirkel te maken: in plaats van de ```circle```-functie te gebruiken, kan je ook een sketch maken die een hoek laat variëren van 0-360 graden, en dan op basis van die hoek bereken je de coördinaten van een punt op de cirkel. Je tekent dan een puntje op die plek. 
De volgende sketch toont dat. Om het ietsje interessanter te maken, geef ik de punten ook een kleurtje. 

<P5 code={sketch1} />

Als je de code bekijkt, zijn er paar dingetjes die opvallen: ik gebruik de ```frameCount``` variabele als hoek. Dat is keihandig: frameCount is een ingebouwde p5js variable die automagically verhoogd wordt telkens de draw()-functie wordt uitgevoerd. Ik had ook een variabele kunnen maken en die telkens op het einde van de draw()-functie verhogen, al doet p5js dat dus voor ons.
Een 2e ding dat je eens moet bekijken, zijn de lijnen

```javascript
  let x = straal * cos(frameCount / 20);
  let y = straal * sin(frameCount / 20);
```
Ik deel de frameCount door 20. Haal die deling zelf eens weg en bekijk het effect. Door de frameRate te delen door 20, gaat het getal waarvan we de cos() en sin() berekenen, trager omhoog, dus liggen opeenvolgende punten dichterbij mekaar. Dat geeft een leuker effect.

## Op zoek naar een interessanter effect.
Gekleurde cirkels tekenen is tof, maar ook rap saai, niet? Wat zou er gebeuren als we wat wat niet de sin() en cos() nemen van dezelfde hoek? Benieuwd wat dat gaat geven!!

<P5 code={sketch2} />

Hoe cool is dat? Door de frameCount te delen door verschillende getallen, krijg je een compleet ander effect. Uiteraard liggen de punten dan niet meer op een cirkel. De patronen die je nu krijgt, zien er geometrisch uit, en een pak interessanter. Experimenteer gerust met verschillende waarden.

## Van code naar interactief kunstwerk
Ik kan mij alvast een hele tijd amuseren met het opnieuw runnen van deze sketch, telkens met andere combinaties van waarden. Soms krijg je open figuren, soms gesloten, soms duurt het een tijdje voor het ganse patroon getekend is, soms is het eenvoudiger. Stel dat je nu deze sketch zou willen tentoonstellen, dan wil je natuurlijk dat de bezoekers eenvoudigweg zelf kunnen experimenteren met je kunst, door zelf waarden in te vullen. En liefst doen ze dat zonder te programmeren.
Daarom gaan we in de laatste stap van deze tutorial een aantal interactieve elementen toevoegen. Zo kunnen we de gebruiker toelaten zelf een waarde in te vullen voor die x en y factor (op basis van een slider bijvoorbeeld). We zouden de gebruiker ook het kleurpallet kunnen laten beïnvloeden.

In deze sketch voegen we 2 sliders toe die invloed hebben op de hoeken voor de x-coördinaat en de y-coördinaat. Bij gelijke waarden, krijg je een cirkel, afwijkende waarden geven interessantere tekeningen.

<P5 code={sketch3} />

## Conclusie.
In deze post bouwden we verder op sinussen en cosinussen. Wanneer je x- en y-coördinaten neemt op basis van verschillende hoeken, krijg je allerlei complexe, goniometrische figuren, waarvan er sommige doen denken aan keltisch symbolen. Experimenteer erop los en laat je verwonderen door de steeds veranderende tekeningen die je met een relatief simpele formule telkens weer bekomt.
