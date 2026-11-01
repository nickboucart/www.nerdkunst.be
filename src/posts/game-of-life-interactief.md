---
title: "Game of Life: teken je eigen beginsituatie"
date: '2026-11-01'
tags:
 - tutorial
 - p5
 - patronen
 - cellulaire automaten
image: gol-glider-1.png
description: We maken Conway's Game of Life interactief, schilderen ons eigen startpatroon en ontdekken de beroemde figuren.
draft: false
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';

    let sketch1 = `let cols = 20;
let rows = 20;
let cellSize = 20;
let rooster;

function setup() {
  createCanvas(400, 400);
  rooster = maakLeegRooster();
}

function draw() {
  background(220);
  tekenRooster();
}

function maakLeegRooster() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = 0;
    }
  }
  return nieuw;
}

function tekenRooster() {
  stroke(180);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(rooster[x][y] == 1 ? 30 : 255);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  // van pixels naar de kolom en rij van een cel
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);

  // enkel doorgaan als we echt op een cel klikken
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    rooster[x][y] = 1 - rooster[x][y]; // 0 wordt 1, 1 wordt 0
  }
}`

    let sketch2 = `let cols = 20;
let rows = 20;
let cellSize = 20;
let rooster;
let bezig = false;

function setup() {
  createCanvas(400, 400);
  rooster = maakLeegRooster();
}

function draw() {
  background(220);
  tekenRooster();

  // elke 8 beeldjes (ongeveer 7 keer per seconde) een nieuwe generatie
  if (bezig && frameCount % 8 == 0) {
    rooster = volgendeGeneratie();
  }

  // een klein statuslabeltje linksboven
  noStroke();
  fill(255, 230);
  rect(0, 0, 100, 24);
  fill(bezig ? color(0, 140, 0) : color(200, 0, 0));
  textSize(14);
  text(bezig ? 'bezig' : 'gepauzeerd', 8, 17);
}

function maakLeegRooster() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = 0;
    }
  }
  return nieuw;
}

function tekenRooster() {
  stroke(180);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(rooster[x][y] == 1 ? 30 : 255);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function telBuren(x, y) {
  let som = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx == 0 && dy == 0) continue;
      let nx = (x + dx + cols) % cols;
      let ny = (y + dy + rows) % rows;
      som += rooster[nx][ny];
    }
  }
  return som;
}

function volgendeGeneratie() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      let levend = rooster[x][y] == 1;
      let buren = telBuren(x, y);

      if (levend && (buren == 2 || buren == 3)) {
        nieuw[x][y] = 1;
      } else if (!levend && buren == 3) {
        nieuw[x][y] = 1;
      } else {
        nieuw[x][y] = 0;
      }
    }
  }
  return nieuw;
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    rooster[x][y] = 1 - rooster[x][y];
  }
}

function keyPressed() {
  if (key == ' ') {
    bezig = !bezig;
    return false; // voorkomt dat de pagina naar beneden scrolt
  }
  if (key == 'c') {
    rooster = maakLeegRooster();
    bezig = false;
  }
}`
</script>

In de [vorige tutorial](/posts/game-of-life) programmeerden we Conway's Game of Life: een rooster van levende en dode cellen dat zichzelf bijwerkt volgens vier eenvoudige regels. Daar vertrokken we telkens van een **willekeurig** rooster. Dat is leuk om naar te kijken, maar je hebt er geen vat op. Wat als je zelf wil bepalen hoe het spel begint?

In deze tutorial maken we het spel interactief. We beginnen met een leeg rooster waarop je met de muis cellen aan- en uitzet, en daarna laat je het spel lopen. Vervolgens leren we enkele beroemde patronen kennen die je als oefening zelf kan natekenen. Als je de vorige tutorial nog niet gelezen hebt, loont het om dat eerst te doen. We hergebruiken er namelijk een groot deel van de code uit.

## Een leeg rooster en klikken

Eerst vervangen we het willekeurige rooster door een leeg rooster: alle cellen zijn `0`, dus dood. Daarna laten we de gebruiker cellen omschakelen door erop te klikken: een eerste klik maakt een cel zwart (levend), een tweede klik maakt ze weer wit (dood).

P5 roept de functie `mousePressed()` automatisch op bij elke muisklik. Daarin moeten we de positie van de muis, `mouseX` en `mouseY` in pixels, omzetten naar de kolom en de rij van een cel. Dat is een simpele deling door de grootte van een cel, afgerond naar beneden met `floor()`. Met een cel van 20 pixels breed hoort een klik op `mouseX = 57` bij kolom `floor(57 / 20) = 2`.

Om een cel om te schakelen gebruiken we een klein trucje: `1 - rooster[x][y]`. Is de cel `0`, dan krijgen we `1`. Is ze `1`, dan krijgen we `0`. Dat spaart ons een `if`-test uit.

We controleren ook of `x` en `y` binnen het rooster liggen. Een klik op een plek buiten het canvas kan anders een fout geven, omdat `rooster[-1]` niet bestaat.

Klik op de play-knop en probeer maar eens een paar cellen aan en uit te zetten. Er gebeurt voorlopig nog niets anders, want we hebben de regels nog niet toegevoegd.

<P5 code={sketch1} />

## Het spel laten lopen

Nu voegen we de regels van het spel weer toe: `telBuren()` en `volgendeGeneratie()` zijn exact dezelfde functies als in de vorige tutorial. Wat nieuw is, is dat we zelf bepalen **wanneer** het spel loopt. Daarvoor bewaren we in een variabele `bezig` of de simulatie loopt of gepauzeerd is.

- Met de **spatiebalk** schakel je tussen lopen en pauzeren. In `keyPressed()` draaien we `bezig` om. Met `return false` zorgen we dat de browser niet ook nog naar beneden scrolt.
- Met de toets **c** (van _clear_) maak je het rooster weer leeg.

Vroeger gebruikten we `frameRate(8)` om het spel te vertragen. Dat gaat hier niet, want dan zou ook het tekenen van je klikken 8 keer per seconde gebeuren, en dat voelt traag aan. Daarom laten we `draw()` op normale snelheid lopen en berekenen we maar **om de 8 beeldjes** een nieuwe generatie. Dat doen we met `frameCount % 8 == 0`. `frameCount` telt het aantal beeldjes sinds de start, en de modulo is precies bij elk achtste beeldje gelijk aan 0. Zo blijft het tekenen vlot en loopt het spel in een rustig tempo.

Een klein statuslabeltje linksboven toont of het spel bezig is. Je kan ook tijdens het lopen nog cellen aan- en uitzetten.

Let op: klik eerst eens op het canvas voor je de spatiebalk gebruikt. De sketch zit in een iframe en krijgt pas toetsenbordinvoer als je erin geklikt hebt. Je zet daarmee meteen een cel om, maar die kan je gewoon opnieuw aanklikken.

<P5 code={sketch2} />

## Beroemde patronen

Als je lang genoeg experimenteert, merk je dat sommige figuurtjes steeds opnieuw opduiken. Er bestaan hele catalogi van, en de liefhebbers hebben ze namen gegeven. We bekijken er drie families, elk met een voorbeeld.

### Stillevens

Een **stilleven** is een patroon dat nooit verandert. Elke levende cel heeft precies 2 of 3 buren (dus ze overleeft), en geen enkele dode cel in de buurt heeft precies 3 levende buren (dus er wordt niets geboren). Het eenvoudigste voorbeeld is het **blok**: 4 cellen in een vierkant. Elke cel heeft 3 levende buren. Een ander bekend stilleven is de **bijenkorf**, met 6 cellen.

<ExampleImages images="{[
              {fileName: 'gol-blok.png', title: 'Blok'},
              {fileName: 'gol-bijenkorf.png', title: 'Bijenkorf'}]}" />

### Oscillatoren

Een **oscillator** is een patroon dat na een aantal generaties weer in zijn beginstand staat. De bekendste is de **blinker**: 3 cellen op een rij. Na één generatie liggen ze verticaal, na nog één generatie weer horizontaal. Het patroon knippert dus met een periode van 2. De middelste cel heeft 2 buren en blijft leven, de twee uiteinden sterven door eenzaamheid, en de cellen boven en onder de middelste krijgen precies 3 buren en worden geboren.

<ExampleImages images="{[
              {fileName: 'gol-blinker-1.png', title: 'Blinker, generatie 0'},
              {fileName: 'gol-blinker-2.png', title: 'Blinker, generatie 1'}]}" />

### Ruimteschepen

Een **ruimteschip** is een patroon dat na een aantal generaties weer dezelfde vorm heeft, maar op een andere plek staat. Het beroemdste is de **glider** (zweefvlieger): 5 cellen die bij elke 4 generaties een stapje schuin opschuiven. Dit patroon werd zo iconisch dat het zelfs het embleem is geworden van de "hackercultuur".

<ExampleImages images="{[
              {fileName: 'gol-glider-1.png', title: 'Glider, generatie 0'},
              {fileName: 'gol-glider-2.png', title: 'Glider, generatie 4'}]}" />

Vergelijk beide afbeeldingen goed: het is exact dezelfde vorm, maar na 4 generaties is ze één cel naar rechts en één cel naar beneden verschoven.

## Aan de slag: oefeningen

Nu is het jouw beurt. In de sketch hieronder kan je alle figuren zelf natekenen en bekijken wat er gebeurt. Vergeet niet: klikken om een cel aan of uit te zetten, spatie om te starten of te pauzeren, `c` om te wissen.

<P5 code={sketch2} />

1. **Het blok.** Teken een blok en laat het spel lopen. Verandert er iets? Wat gebeurt er als je er één cel bij zet?
2. **De blinker.** Teken 3 cellen op een rij. Pauzeer op het juiste moment om beide standen te zien. Lukt het om een blinker te maken die verticaal begint?
3. **De glider.** Teken de glider en volg hem. Het rooster wikkelt om (dat zagen we in de vorige tutorial), dus een glider die rechts onderaan verdwijnt, komt linksboven weer binnen. Hoeveel generaties duurt het voor hij weer op de plek van vertrek staat?
4. **Botsingen.** Teken twee gliders die naar mekaar toe bewegen. Sommige botsingen laten niets over, andere geven een stilleven of zelfs nieuwe ruimteschepen. Probeer verschillende afstanden en richtingen. Een glider kan je spiegelen en draaien om hem in een andere richting te laten vliegen.
5. **Zelf ontdekken.** Teken willekeurige kleine figuurtjes van 4 of 5 cellen. Welke sterven meteen uit, en welke blijven lang in beweging? Sommige kleine beginfiguren leven verrassend lang door voor ze tot rust komen.

## Conclusie

Door onze simulatie interactief te maken, veranderden we van toeschouwer in speler. We tekenden het beginpatroon, bepaalden zelf wanneer het spel loopt, en leerden enkele beroemde figuren kennen: stillevens, oscillatoren en ruimteschepen. Dat is een mooie illustratie van hoe de regels uit de [eerste tutorial](/posts/game-of-life) heel verschillende "soorten leven" voortbrengen.

Mogelijke ideetjes voor uitbreidingen:
- laat de snelheid aanpassen met de pijltjestoetsen
- toon hoeveel generaties er al voorbij zijn
- bouw een "glider gun": een patroon dat zelf eindeloos gliders blijft uitsturen
- laat een patroon opslaan en terug inladen

In een volgende tutorial brengen we kleur in het spel en kijken we naar enkele variaties. Veel experimenteerplezier!
