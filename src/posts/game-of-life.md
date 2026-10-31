---
title: "Conway's Game of Life: leven uit simpele regels"
date: '2026-10-31'
tags:
 - tutorial
 - p5
 - patronen
 - cellulaire automaten
image: game-of-life.png
description: We programmeren Conway's Game of Life en zien hoe uit vier simpele regels complex gedrag ontstaat.
draft: false
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';

    let sketch1 = `let cols = 20;
let rows = 20;
let cellSize = 20;
let rooster;

function setup() {
  createCanvas(400, 400);
  rooster = maakRooster();
  noLoop();
}

function draw() {
  background(220);
  tekenRooster(rooster);
}

// Maakt een 2D lijst (rijen binnen kolommen) en vult die willekeurig:
// 1 = levend, 0 = dood
function maakRooster() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = floor(random(2));
    }
  }
  return nieuw;
}

function tekenRooster(r) {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(r[x][y] == 1 ? 30 : 255);
      stroke(180);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}`

    let sketch2 = `let cols = 20;
let rows = 20;
let cellSize = 20;
let rooster;

function setup() {
  createCanvas(400, 400);
  rooster = maakRooster();
  noLoop();
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(12);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(rooster[x][y] == 1 ? 30 : 255);
      stroke(180);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);

      // toon het aantal levende buren in elke cel
      noStroke();
      fill(rooster[x][y] == 1 ? 255 : 0);
      text(telBuren(x, y), x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
    }
  }
}

function maakRooster() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = floor(random(2));
    }
  }
  return nieuw;
}

function telBuren(x, y) {
  let som = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx == 0 && dy == 0) continue; // de cel zelf telt niet mee

      // de modulo zorgt ervoor dat we aan de andere kant verder tellen
      let nx = (x + dx + cols) % cols;
      let ny = (y + dy + rows) % rows;
      som += rooster[nx][ny];
    }
  }
  return som;
}`

    let sketch3 = `let cols = 40;
let rows = 40;
let cellSize = 10;
let rooster;

function setup() {
  createCanvas(400, 400);
  frameRate(8);
  rooster = maakRooster();
}

function draw() {
  background(220);
  tekenRooster();
  rooster = volgendeGeneratie();
}

function maakRooster() {
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      nieuw[x][y] = floor(random(2));
    }
  }
  return nieuw;
}

function tekenRooster() {
  stroke(200);
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
  // we schrijven naar een nieuw rooster, zodat het oude intact blijft
  let nieuw = [];
  for (let x = 0; x < cols; x++) {
    nieuw[x] = [];
    for (let y = 0; y < rows; y++) {
      let levend = rooster[x][y] == 1;
      let buren = telBuren(x, y);

      if (levend && (buren == 2 || buren == 3)) {
        nieuw[x][y] = 1; // overleeft
      } else if (!levend && buren == 3) {
        nieuw[x][y] = 1; // wordt geboren
      } else {
        nieuw[x][y] = 0; // sterft of blijft dood
      }
    }
  }
  return nieuw;
}`
</script>

In deze tutorial programmeren we **"Conway's Game of Life"**, of in het Nederlands het "Spel van het Leven". De Britse wiskundige John Conway bedacht het in 1970. Het is een "nul-spelers spel": je kiest een beginsituatie, en daarna speelt het spel zichzelf. Je moet niets meer doen dan toekijken.

Het spel speelt zich af op een rooster van vierkante cellen. Elke cel is ofwel **levend** ofwel **dood**. Met slechts vier eenvoudige regels ontstaan er patronen die bewegen, die zich voortplanten en die soms eeuwig blijven doorgaan. Het is een mooi voorbeeld van hoe complexiteit uit eenvoud kan ontstaan, en daarom precies iets voor NerdKunst.

Op het einde van deze tutorial hebben we een werkende simulatie, vertrekkend van een willekeurig rooster.

## De regels

Elke cel heeft 8 buren: de cellen links, rechts, boven, onder en de 4 diagonalen. Bij elke stap (we noemen dat een _generatie_) bepaalt het aantal levende buren wat er met een cel gebeurt:

1. **Eenzaamheid:** een levende cel met minder dan 2 levende buren sterft.
2. **Overleven:** een levende cel met 2 of 3 levende buren blijft leven.
3. **Overbevolking:** een levende cel met meer dan 3 levende buren sterft.
4. **Geboorte:** een dode cel met precies 3 levende buren komt tot leven.

Dat mag je ook korter samenvatten: een levende cel blijft leven met 2 of 3 buren, een dode cel wordt levend met precies 3 buren. In alle andere gevallen is (of wordt) de cel dood. Dat korte stukje gaan we straks in code gieten.

Een belangrijk detail: alle cellen worden **tegelijk** bijgewerkt. De nieuwe toestand van een cel hangt enkel af van de vorige generatie, niet van cellen die al aangepast zijn. Daar komen we in stap 3 op terug.

## Het rooster tekenen

We beginnen met het rooster zelf. In P5 kunnen we een rooster voorstellen als een lijst van lijsten: `rooster[x][y]` is `1` als de cel op kolom `x` en rij `y` leeft, en `0` als ze dood is. Ons canvas is 400 x 400 pixels. Met 20 kolommen en 20 rijen is elke cel dus 20 pixels breed.

Met twee lussen in elkaar overlopen we alle cellen. Voorlopig vullen we het rooster willekeurig met `floor(random(2))`, dat geeft ons met gelijke kans een 0 of een 1. Herlaad de pagina of druk op de play-knop om telkens een nieuw rooster te krijgen.

<P5 code={sketch1} />

## Buren tellen

Nu komt het hart van het spel: voor een gegeven cel tellen we hoeveel van haar 8 buren levend zijn. Omdat een levende cel `1` is en een dode cel `0`, kunnen we de waarden van de buren gewoon optellen. De twee lussen met `dx` en `dy` lopen elk van -1 tot en met 1, en zo komen we alle 9 cellen in het blokje van 3 x 3 rond onze cel tegen. De cel zelf (`dx` en `dy` allebei 0) slaan we over.

Er zit nog een addertje onder het gras: wat met cellen aan de rand van het rooster? Een cel in de linkerkolom heeft geen buur links van haar, en `rooster[-1]` bestaat niet. We kunnen twee dingen doen:

- de randen **negeren**: we beschouwen alles buiten het rooster als dood. Dat vraagt extra `if`-tests.
- het rooster laten **omwikkelen**: wat rechts uit het rooster verdwijnt, komt links terug binnen, en omgekeerd. Je speelt dan eigenlijk op het oppervlak van een donut (een _torus_, voor de wiskundigen onder ons).

We kiezen de tweede optie, want die is ook nog eens korter. Het trucje is de **modulo-operator** `%`. Met `(x + dx + cols) % cols` blijft de kolom altijd binnen 0 en `cols - 1`: als `x + dx` gelijk is aan -1, geeft dit `cols - 1`, en als het gelijk is aan `cols`, geeft dit 0. We tellen `cols` er eerst bij op, omdat `%` in Javascript voor negatieve getallen een negatief resultaat geeft.

In de sketch hieronder tonen we in elke cel het aantal levende buren. Probeer eens zelf een paar cellen na te tellen.

<P5 code={sketch2} />

## De volgende generatie

Nu we kunnen tellen, kunnen we de regels toepassen. We schrijven een functie `volgendeGeneratie()` die voor elke cel de regels bekijkt en het resultaat in een **nieuw** rooster bewaart.

Waarom een nieuw rooster? Stel dat we de cellen rechtstreeks in het oude rooster zouden aanpassen. Wanneer we dan de volgende cel bekijken, zouden we haar buren tellen op basis van een mix van oude en nieuwe toestanden, en dat geeft een ander (fout) resultaat. Door naar een kopie te schrijven en die pas op het einde in de plaats van het oude rooster te zetten, werken alle cellen netjes tegelijk.

De regels uit het begin vertalen zich in drie gevallen:

```js
if (levend && (buren == 2 || buren == 3)) {
  nieuw[x][y] = 1; // overleeft
} else if (!levend && buren == 3) {
  nieuw[x][y] = 1; // wordt geboren
} else {
  nieuw[x][y] = 0; // sterft of blijft dood
}
```

In `draw()` tekenen we eerst het huidige rooster, en vervangen het daarna door de volgende generatie. Met `frameRate(8)` doen we dat 8 keer per seconde, zodat je het allemaal rustig kan volgen. Voor deze versie hebben we het rooster verfijnd tot 40 x 40 cellen van 10 pixels.

<P5 code={sketch3} />

Je ziet hoe het willekeurige begin na enkele generaties uiteenvalt: veel cellen sterven, en er blijven kleine stabiele figuurtjes over, andere knipperen heen en weer, en af en toe schuift er iets over het rooster. Die figuurtjes zijn geen toeval, ze volgen uit de regels. Er zijn zelfs patronen die zich continu verplaatsen. Elke generatie ziet er hetzelfde uit, maar ze zijn een stukje opgeschoven.

## Conclusie

Met een rooster, een functie om buren te tellen en drie `if`-tests hebben we een volledig Game of Life gebouwd. Het is verbazend hoe weinig code er nodig is voor zoveel gedrag.

Mogelijke ideetjes om zelf mee te experimenteren:
- verander de kans waarmee een cel levend begint, zodat je met een dichter of ijler rooster start
- pas de getallen in de regels aan en kijk wat er gebeurt. Wat als een dode cel al met 2 buren tot leven komt?
- maak het rooster groter en de cellen kleiner
- laat de randen niet omwikkelen en kijk hoe het gedrag aan de randen verandert

In een volgende tutorial maken we het spel interactief, zodat je zelf de beginsituatie kan "schilderen" en bekende patronen als glider en blinker kan uitproberen. Tot dan: veel levensplezier!
