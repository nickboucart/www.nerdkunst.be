
---
title: Je sketches klaarmaken om te presenteren
date: '2025-01-05'
tags:
 - tutorial
 - p5
 - presentatie
image: variatie-truchet.png
description: In dit artikel bespreek ik enkele ideetjes om je werk te presenteren.
draft: true
---

Vandaag een beetje een ander soort artikel. In plaats van een tutorial, wil ik het vandaag hebben over hoe je als kunstenaar je werk tentoon kan stellen. Ik sta eerst even stil bij wat generative art/generatieve kunst voor mij betekent. Vervolgens ga ik een aantal voorbeelden laten zien van hoe je je kusntwerken zou kunnen presenteren naar een groter publiek. Ik ga telkens vertrekken van de code uit de tutorial over [variaties op Truchet tegels](variatie-op-truchet-tegels).

## Generatieve Kunst
Generatieve kunst is kunst die door een computer gemaakt wordt. De kunstenaar bepaalt, aan de hand van code, hoe de computer die kunst moet genereren. Vaak zit er in generative kunst een factor **willekeurigheid** (randomness) die maakt dat de code elke keer weer een soortegelijk kunstwerk produceert, dat toch telkens anders is. Denk maar aan het patroon dat we maakten in de [10 print tutorial](10-print). 
Als je je werk tentoon wil stellen, stel je natuurlijk niet je algorithme tentoon, wel de uitkomst van het uivoeren van dat algorithme. 't Is een beetje zoals een klassieke schilder die uiteraard niet zijn verf en penselen toont, wel het uiteindelijke schilderij. Je moet je dan afvragen als kunstenaar wat je juist wil bekomen met je generatief werk:
- is je algorithme een middel om werk te genereren, en maak je zelf een selectie van de gegenereerde werken aan de hand van wat je zelf het mooiste of interessantste vindt?
- of wil je juist dat je publiek geconfronteerd wordt met het feit dat de werken gegenereerd worden, dat er een zekere willekeur in die werken zit en dat die telkens veranderen?

Voor mezelf vind ik vooral dat laatste het interessantst, al ben ik me er heel erg van bewust dat dat voor iedereen kan verschillen.

## Verschillende manieren om je kunst tentoon te stellen

### Het eindresultaat
Als je als kunstenaar vooral het eindresultaat, de gegenereerde beelden, in de kijker wil zetten, dan zal je vooral vaak je sketches willen laten lopen, en telkens je een interessant beeld krijgt, daar een print-screen of iets dergelijks van willen nemen. Eens je er een aantal hebt die je goed vindt, wordt dat een collage, of mogelijk zelfs een alleenstaand werk. Je zou zelfs kunnen kiezen om die afbeelding (in groot formaat) te printen.

Hieronder een voorbeeld van een "gallerij" van 2 beelden, waarbij de tekeningen _zorgvuldig_ gekozen werden door de artiest.

<ExampleImages images={[
{'fileName': 'lijnenspel1.png', 'title': 'Lijnenspel 1.0'},
{'fileName': 'lijnenspel2.png', 'title': 'Lijnenspel 2.0'},
]
} />

### Live-gegenereerde kunst
Je zou er ook voor kunnen kiezen om te werken met beelden die rechtstreeks gegenereerd worden op je tentoonstelling. In plaats van tekeningen op te hangen, zal je dan beeldschermen of projectoren hangen die live gegenereerd worden. Als je, zoals hier op nerdkunst, vaak met P5 werkt, dan zal je dus op die beeldschermen een html-pagina tonen die je sketch inlaadt en het eindresultaat, liefst full-screen, toont, al dan niet met een regelmatige refresh geregeld een ander beeld te tonen. Deze aanpak kan ook leuk zijn om kunstwerken waar beweging in zit, zoals onze [Maurer rozen](maurer-roses), te tonen. Met deze aanpak heb je dus een beeldscherm nodig dat ofwel zelf, ofwel via een computer, het beeld kan renderen.

In zo'n setup is het handig dat je je code zodanig schrijft, dat er geen hardgecodeerde hoogte en breedte in zitten. Zo zal je kunstwerk zich qua afmetingen automatisch aanpassen aan grootte van het scherm. Dat is niet zo moeilijk: P5js heeft de ```windownHeight``` en ```windowWith``` variabelen die de grootte van het window aangeven. Als je die variabelen gebruikt om een canvas aan te maken, kom je al een heel eind.


<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';

 let sketch1 = `var tegelsPerRij = 10;
var grootteTegel;
var xOffset;
var yOffset;

function setup() {
  createCanvas(400, 400);
  grootteTegel = width / tegelsPerRij;
  xOffset = random(grootteTegel)
  yOffset = random(grootteTegel)
  noLoop();
}

function draw() {
  rood = random(0,255);
  groen = random(0,255);
  blauw = random(0,255);
  background(rood, groen, blauw);
  complementaireKleur = berekenComplementaireKleur(rood, groen, blauw);
  noFill();
  strokeWeight(8);
  stroke(complementaireKleur);
  for (var x = 0; x < tegelsPerRij; x++) {
    for (var y = 0; y < tegelsPerRij; y++) {
      tegel = random([tile1, tile2]);
      tegel(x * grootteTegel, y * grootteTegel, grootteTegel);
    }
  }
}

function tile1(x, y, breedte) {
  push();
  translate(x, y);
  beginShape();
  vertex(breedte/2,0);
  quadraticVertex(xOffset, yOffset, breedte, breedte/2);
  endShape();
  beginShape();
  vertex(breedte/2, breedte)
  quadraticVertex(xOffset, yOffset, 0, breedte/2)
  endShape();
  pop();
}

function tile2(x, y, breedte) {
  push();
  translate(x, y);

  beginShape();
  vertex(0, breedte/2);
  quadraticVertex(xOffset, yOffset, breedte/2, 0);
  endShape();
  beginShape();
  vertex(breedte, breedte/2)
  quadraticVertex(xOffset, yOffset, breedte/2, breedte)
  endShape();
  pop();
}

function berekenComplementaireKleur(rood, groen, blauw) {
  complementairRood = 255-rood;
  complementairGroen = 255-groen;
  complementairBlauw = 255-blauw;
  return color(complementairRood, complementairGroen, complementairBlauw)
}`
</script>