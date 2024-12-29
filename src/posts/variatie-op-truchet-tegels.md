
---
title: Een variatie op de Truchet Tegels
date: '2024-12-28'
tags:
 - lijnenspel
 - tutorial
 - p5
 - truchet
image: variatie-truchet.png
description: In deze korte tutorial bouwen we een variatie op de Truchet Tegels.
draft: false
---

In deze korte tutorial gaan we bouwen we verder op het artikel over [Truchet tegels](truchet-tegels). In plaats van te werken met mooi ronde bogen, gaan we die bogen wat "oprekken" of in een deukje zetten.


## Tegels met uitgerokken bogen
In het artikel over Truchet tegels maakten we tegels door per tegel, 2 kwart cirkels te maken. We zouden nu die cirkels niet mooi rond kunnen maken, maar wat uitrekken, of wat induwen. 
Dat kunnen we als volgt doen: we kiezen een willekeurig punt binnen de tegel (we gebruiken voor alle tegels hetzelfde punt). Dat punt gaan we gebruiken om onze bogen naartoe te laten trekken. In P5 is er een functie [quadraticVertex()](https://p5js.org/reference/p5/quadraticVertex/) die exact dat doet. Speel zeker even met de voorbeelden in de documentatie die achter de vorige link zit.
Om die ```quadraticVertex()``` functie te gebruiken, moeten we ook werken met ```beginShape()``` en ```endShape()```, en met een startpunt dat we aanmaken met de ```vertex()``` functie.

Hieronder de code. Als je goed kijkt, herken je veel code uit [Truchet tegels](truchet-tegels), ik heb enkel de functies aangepast die de tegels zelf maken.

<P5 code={sketch1} />
Druk gerust verschillende keren op het play icoon, en zie hoe je telkens het patroon ziet veranderen!


## Conclusie
In deze korte tutorial maakten we een variatie op de Truchet tegel, door de boogjes op de tegels wat uit te rekken en/of in te duwen. Het resultaat lijkt wel wat op de tegels van de vorige keer, en ook weer niet.

Veel tegelplezier!





<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';
     import { CirclePlay } from 'lucide-svelte';

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