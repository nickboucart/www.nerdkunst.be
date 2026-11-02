---
title: "Game of Life: sporen en kleur"
date: '2026-11-02'
tags:
 - tutorial
 - p5
 - patronen
 - cellulaire automaten
image: game-of-life-kleur.png
description: We laten de dode cellen van Conway's Game of Life langzaam vervagen, eerst in grijswaarden en daarna in kleur.
draft: false
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';

    let sketch1 = `let cols = 40;
let rows = 40;
let cellSize = 10;
let rooster;
let spoor;

function setup() {
  createCanvas(400, 400);
  noStroke();
  rooster = maakRooster(true);
  spoor = maakRooster(false);
}

function draw() {
  // het spel zelf gaat traag vooruit...
  if (frameCount % 8 == 0) {
    rooster = volgendeGeneratie();
  }
  // ...maar het spoor vervaagt bij elk beeldje
  werkSpoorBij();
  tekenRooster();
}

function maakRooster(willekeurig) {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = willekeurig ? floor(random(2)) : 0;
    }
  }
  return nieuw;
}

function werkSpoorBij() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (rooster[x][y] == 1) {
        spoor[x][y] = 1;
      } else {
        spoor[x][y] = spoor[x][y] * 0.9;
      }
    }
  }
}

function tekenRooster() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // spoor 1 geeft donkergrijs (30), spoor 0 geeft wit (255)
      fill(255 - spoor[x][y] * 225);
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
}`

    let sketch2 = `let cols = 40;
let rows = 40;
let cellSize = 10;
let rooster;
let spoor;

function setup() {
  createCanvas(400, 400);
  noStroke();
  colorMode(HSB, 360, 100, 100); // tint, verzadiging, helderheid
  rooster = maakRooster(true);
  spoor = maakRooster(false);
}

function draw() {
  if (frameCount % 8 == 0) {
    rooster = volgendeGeneratie();
  }
  werkSpoorBij();
  tekenRooster();
}

function maakRooster(willekeurig) {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = willekeurig ? floor(random(2)) : 0;
    }
  }
  return nieuw;
}

function werkSpoorBij() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (rooster[x][y] == 1) {
        spoor[x][y] = 1;
      } else {
        spoor[x][y] = spoor[x][y] * 0.9;
      }
    }
  }
}

function tekenRooster() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let s = spoor[x][y];
      // levend (s = 1) is cyaan, en tijdens het vervagen schuift de tint naar paars
      let tint = lerp(300, 180, s);
      // de helderheid daalt met het spoor, tot de cel zwart is
      fill(tint, 80, s * 100);
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
}`

    let sketch3 = `let cols = 40;
let rows = 40;
let cellSize = 10;
let rooster;
let spoor;
let leeftijd; // hoeveel generaties een cel al leeft
let tint;     // de tint die een cel het laatst had toen ze nog leefde

function setup() {
  createCanvas(400, 400);
  noStroke();
  colorMode(HSB, 360, 100, 100);
  rooster = maakRooster(true);
  spoor = maakRooster(false);
  tint = maakRooster(false);
  leeftijd = maakRooster(false);
  // cellen waarmee we beginnen zijn 1 generatie oud
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      leeftijd[x][y] = rooster[x][y];
    }
  }
}

function draw() {
  if (frameCount % 8 == 0) {
    rooster = volgendeGeneratie();
  }
  werkSpoorBij();
  tekenRooster();
}

function maakRooster(willekeurig) {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = willekeurig ? floor(random(2)) : 0;
    }
  }
  return nieuw;
}

function werkSpoorBij() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (rooster[x][y] == 1) {
        spoor[x][y] = 1;
        // jonge cellen zijn rood, oude cellen worden geel, groen en blauw
        tint[x][y] = min(leeftijd[x][y], 30) * 8;
      } else {
        spoor[x][y] = spoor[x][y] * 0.9;
      }
    }
  }
}

function tekenRooster() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let s = spoor[x][y];
      fill(tint[x][y], 80, s * 100);
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
  let nieuweLeeftijd = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    nieuweLeeftijd[x] = [];
    for (let y = 0; y < rows; y++) {
      let levend = rooster[x][y] == 1;
      let buren = telBuren(x, y);

      if (levend && (buren == 2 || buren == 3)) {
        nieuw[x][y] = 1;
        nieuweLeeftijd[x][y] = leeftijd[x][y] + 1; // een jaartje ouder
      } else if (!levend && buren == 3) {
        nieuw[x][y] = 1;
        nieuweLeeftijd[x][y] = 1; // pasgeboren
      } else {
        nieuw[x][y] = 0;
        nieuweLeeftijd[x][y] = 0;
      }
    }
  }
  leeftijd = nieuweLeeftijd;
  return nieuw;
}`
</script>

Dit is het derde en laatste deel in onze reeks rond Conway's Game of Life. In de [eerste tutorial](/posts/game-of-life) bouwden we het spel zelf: een rooster, het tellen van buren en de regels voor de volgende generatie. In de [tweede tutorial](/posts/game-of-life-interactief) maakten we het interactief en leerden we beroemde patronen kennen zoals de blinker en de glider.

Er is één ding dat ons nog stoort: een cel is **plots** zwart of **plots** wit. Je ziet daardoor wel dat een glider beweegt, maar niet waar hij zonet nog was. In deze tutorial laten we gestorven cellen langzaam vervagen, zodat bewegende figuren een staart krijgen. We doen dat eerst in grijswaarden. Daarna brengen we kleur in het spel.

## Een spoor bijhouden

Het idee is simpel: naast het rooster met levende en dode cellen houden we een tweede rooster bij met een getal tussen 0 en 1 per cel: het **spoor**. Voor een levende cel is het spoor altijd 1. Sterft de cel, dan wordt het spoor bij elk beeldje een stukje kleiner, tot het bijna 0 is. Zo kunnen we aan de kleur van een cel zien hoe lang geleden ze nog leefde.

Waarom een apart rooster? Omdat `rooster` enkel nullen en enen mag bevatten: de regels van het spel hangen ervan af. Het spoor is **enkel voor het oog**. Het heeft geen invloed op het spel zelf. Daarom blijven `telBuren()` en `volgendeGeneratie()` onaangeroerd.

Het vervagen doen we met een vermenigvuldiging: `spoor = spoor * 0.9`. Bij elk beeldje verliest het spoor dus 10%. Na 10 beeldjes blijft er ongeveer een derde over, na 20 beeldjes nog 12%. Dat is een zachte, exponentiële afname. Met een getal dichter bij 1 (bijvoorbeeld 0.97) vervaagt een cel trager en zijn de staarten langer.

## Grijswaarden

Omdat het spoor tussen 0 en 1 ligt, kunnen we het gemakkelijk omzetten naar een grijswaarde: `255 - spoor * 225`. Bij spoor 1 krijgen we 30 (donkergrijs, zoals de levende cellen vroeger) en bij spoor 0 krijgen we 255 (wit).

Er is nog een kleine aanpassing: vroeger berekenden we elk beeldje een nieuwe generatie met `frameRate(8)`. Nu willen we een vloeiende overgang, dus laten we `draw()` op de normale snelheid lopen. Het spoor vervaagt bij elk beeldje, en pas om de 8 beeldjes berekenen we een nieuwe generatie met `frameCount % 8 == 0`. Die truc kenden we al uit de vorige tutorial.

Kijk eens naar de glider-achtige figuren die over het rooster schuiven. Ze trekken een grijze staart achter zich aan, en blinkers worden grijze "ademende" vlekjes. Herlaad de sketch via de play-knop voor een nieuw willekeurig rooster.

<P5 code={sketch1} />

## Kleur met HSB

Grijswaarden zijn mooi, maar met kleur kunnen we veel meer. In P5 kan je zeggen hoe je een kleur beschrijft met `colorMode()`. De standaardmanier is RGB (rood, groen, blauw), maar voor onze toepassing is **HSB** handiger: `colorMode(HSB, 360, 100, 100)`. Een kleur bestaat dan uit:

- **H**ue, de tint, van 0 tot 360 graden op het kleurenwiel (0 is rood, 120 is groen, 240 is blauw)
- **S**aturation, de verzadiging, van 0 (grijs) tot 100 (volle kleur)
- **B**rightness, de helderheid, van 0 (zwart) tot 100 (helder)

Dat past perfect bij ons spoor. De helderheid laten we gewoon meedalen met het spoor: `s * 100`. Een gestorven cel wordt dus langzaam zwart. Daarnaast laten we de tint meeveranderen met `lerp(300, 180, s)`. De functie `lerp` geeft een getal tussen 300 en 180 afhankelijk van `s`: bij `s = 1` is dat 180 (cyaan), bij `s = 0` is dat 300 (paars). Een cel die net gestorven is, is dus nog helder blauwgroen, en tijdens het vervagen schuift ze via blauw naar paars en zwart.

Omdat zwarte cellen nu "uit" zijn, ziet het geheel eruit als een lichtgevend neonschilderij op een donkere achtergrond.

<P5 code={sketch2} />

## Kleur volgens leeftijd

Tot nu toe zeggen de kleuren iets over hoe lang een cel **dood** is. We kunnen ze ook iets laten zeggen over hoe lang een cel al **leeft**. Daarvoor houden we een derde rooster bij, `leeftijd`, met het aantal generaties dat een cel al levend is.

In `volgendeGeneratie()` passen we dat aan:
- overleeft een cel, dan wordt `leeftijd` 1 groter
- wordt een cel geboren, dan begint haar `leeftijd` op 1
- sterft een cel (of blijft ze dood), dan gaat `leeftijd` naar 0

De tint van een levende cel volgt uit haar leeftijd: `min(leeftijd, 30) * 8`. Jonge cellen zijn rood (tint 0), en naarmate ze ouder worden schuiven ze via oranje, geel en groen naar blauw (tint 240). Met `min(..., 30)` zorgen we dat de tint niet blijft doorlopen voorbij blauw: elke cel van 30 generaties of ouder is gewoon blauw.

Een gestorven cel heeft geen leeftijd meer, maar we willen toch dat ze in haar laatste kleur wegvervaagt. Daarom bewaren we in het rooster `tint` de laatste tint van elke cel zolang ze nog leefde. Zodra de cel sterft, verandert die tint niet meer, en vervaagt enkel de helderheid via het spoor.

Het resultaat is verrassend: de stabiele stillevens kleuren langzaam blauw, terwijl de actieve, chaotische zones vol rood en oranje zitten. Je ziet in één oogopslag waar er nog iets gebeurt, en waar het spel tot rust gekomen is. Een glider blijft hierbij warm van kleur, want hij bestaat voortdurend uit jonge cellen.

<P5 code={sketch3} />

## Conclusie

Met één extra rooster en een vermenigvuldiging per beeldje maakten we van een zwart-wit spel een levend schilderij. We zagen dat het handig is om wat we **tonen** te scheiden van wat het spel **berekent**. Daardoor konden we kleur toevoegen zonder één regel van het spel aan te passen.

Mogelijke ideetjes voor uitbreidingen:
- speel met de vervagingsfactor `0.9` voor kortere of langere staarten
- laat de tint van een levende cel afhangen van het aantal buren
- combineer het spoor met de interactie uit de [tweede tutorial](/posts/game-of-life-interactief): teken je beginpatroon en kijk hoe het kleurt
- maak een groter rooster met kleinere cellen en bewaar een screenshot als kunstwerk
- probeer eens andere regels: laat een dode cel al geboren worden met 3 of 6 buren

Daarmee sluiten we onze Game of Life-reeks af. Wil je helemaal van voren af aan beginnen, dan vind je het begin in de [eerste tutorial](/posts/game-of-life). Veel kleurplezier!
