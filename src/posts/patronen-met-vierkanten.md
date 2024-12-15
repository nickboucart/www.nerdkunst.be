---
title: "Patronen Met Vierkanten"
date: "2024-02-28"
tags: ['patronen', 'vierkanten']
image: "vierkanten.png"
description: "Een tutorial waarin we vierkanten inkleuren. We gebruiken willekeurige kleuren, kleurenpaletten en perlin noise."
draft: false
---
In deze tutorial gaan we aan de slag met patronen die bestaan uit vierkanten. Meer interesse in patronen met lijntjes? Kijk snel naar het [patronen met lijnen](/posts/lijn-patronen) artikel.   

## Een canvas vol vierkanten
Voor we volop gaan experimenteren met kleuren en groottes, en zo de Mondriaan in ons loslaten, bouwen we eerst aan de basis: we plaatsen een aantal vierkanten op een regelmatige manier op het canvas. We maken dat aantal vierkant aanpasbaar met een variabele, zo kunnen we eens we de code hebben snel wat experimenteren met een interessante grootte voor de vierkanten. Voorlopig kleuren we de vierkanten in met een lichtgrijze tint, en tekenen we de lijnen van de vierkantjes in het wit. In de code hieronder zal je ook zien dat we ```rectMode(CENTER)``` gebruiken: in comibinatie met de ```square()``` betekent dat dat we voor elk vierkant enkel het middelpunt van het vierkant moeten aangeven en de grootte van 1 zijde. Speel gerust even met de parameter ```vierkantenPerRij```, je zit direct dat de grootte van de vierkanten veranderen.

Hieronder zie je het resultaat.

<P5 code={sketch1} />

## En nu met kleurtjes.
Je kan onze vierkanten nauwelijks kunst noemen, zo zonder kleur. Laat ons daarom de vierkanten willekeurig inkleuren. Een van de manieren om met kleur om te gaan, is om een kleur uit te drukken met RGB-waarden. RGB staat voor Rood-Groen-Blauw. Door elk van de 3 primaire kleuren een waarde tussen 0 en 255 te geven, maak je een kleur. Zo staat rgb(255, 0, 0) voor rood.
We gaan de computer voor elk vierkantje 3 willekeurige getallen tussen 0 en 255 laten kiezen en het vierkant dan met die kleur vullen.

Dat ziet er dan zo uit:

<P5 code={sketch2} />

Hoewel we nu iets interessanter gemaakt hebben, er zit immers al kleur is, kan ik het niet echt mooi of interessant noemen. 't Is wat te chaotisch, niet? Dat komt omdat we al die kleuren op een hoopje gooien: die passen niet altijd mooi bij mekaar, en het geheel is een kakafonie. Dat kan je op 2 manieren oplossen:
- ofwel gebruiken we een beperkt aantal kleuren, die wel mooi bij mekaar passen. Dat noemen we een **kleurenpallet**.
- ofwel gaan we toch voor willekeurige kleuren, maar zorgen we dat de variatie in kleur tussen naburige vierkanten niet te groot is.

## Inkleuren met een kleurpallet
Een kleurpallet bestaat typisch uit een aantal kleuren die mooi bij mekaar passen. Vaak zijn het designers die zo'n kleurcombinaties maken en online tonen. Kijk bijvoorbeeld eens op https://colorhunt.co. Zoek daar een kleurpallet dat je wel leuk vindt, en maak dan een *array* aan met die kleuren. In de voorgaande sketch vervang je dan de code die de random RGB waarden maakt door het willekeurig kiezen van een kleur uit de kleurenlijst. Elke keer je nu je code uitvoert, krijg je een variatie op hetzelfde thema :)


<P5 code={sketch3} />

Volgens mij is het resultaat nu al veel mooier om naar te kijken. Wil je meer variaties, dan maak je een lijst van kleurlijstjes, en kies je eerst random een pallet en dan per vierkant random een kleur uit het gekozen pallet.

## Willekeurig naburige kleuren kiezen.
Een andere aanpak om de vierkanten in te kleuren, is door gebruik te maken van **Perlin Noise**. Perlin noise is een algoritme om willekeurige getallen te genereren, op basis van 1, 2 of 3 inputs. De ```noise()``` functie geeft steeds een getal tussen 0 en 1. Wanneer je de noise functie 2x na mekaar aanroept met een getal dat dicht bij mekaar ligt, zal de output van die functie ook dichtbij mekaar liggen. 
Die eigenschap kunnen we gebruiken voor onze vierkanten: vierkanten die dicht bij mekaar liggen, willen we een kleur geven die in de buurt ligt van de naburige vierkanten, terwijl de variatie in kleur van verder af liggende vierkanten, groter mag zijn.

We zullen dit eerst al eens proberen te implementeren door onze vierkanten in te vullen met een grijswaarde. Een grijswaarde is een getal tussen 0 en 255, waarbij 0 zwart is, en 255 wit. Door de noise functie aan te roepen op basis van de index van het vierkant, zal je zien dat noise(2,3) en noise(2,4) grijswaarden opleveren die dichter bij mekaar liggen dan bijvoorbeeld noise(2,3) en noise(23, 18). Je zal in de code zien dat we ook de ```map()``` functie gebruiken. Dit doen we omdat de noise() functie een getal tussen 0 en 1 teruggeeft, terwijl we voor de grijswaarde een waarde tussen 0 en 255 nodig hebben. Map() doet deze omzetting, volgens het regeltje van 3, voor ons. We gebruiken ook ```floor()``` om een afronding naar beneden te doen, omdat grijswaarden geen comma-getallen mogen zijn. Het bepalen van de kleur wordt dan:
```
let kleur = floor(map(noise(x, y), 0,1,0,255));
```
Wanneer je dat toevoegt, krijg een een canvas in uiteenlopende grijstinten. Door de x en y te vermenigvuldigen met een klein getal, zal de variatie kleiner worden, en krijg je een minder chaotisch pallet.

Hieronder zie je het resultaat. Speel zeker ook eens met al dan niet tekenen van de buitenlijntjes van de vierkanten, zonder buitenlijntjes (```noStroke()```) krijg je precies een camouflage-effect.

<P5 code={sketch4} />

We kunnen nu dezelfde techniek gebruiken om in plaats van te werken met grijstinten, te werken met kleuren. We zouden bijvoorbeeld willekeurig een waarde voor rood en blauw kunnen kiezen, en groen via de noise functie laten variëren. Telkens je nu het script laat lopen, krijg je een variatie met andere kleuren. Hoe cool is dat? ;) 

<P5 code={sketch5} />

## Conclusie
In deze tutorial hebben we wat gespeeld met vierkanten en kleuren. We hebben gezien dat random en kleuren niet zo goed samenwerken: dat geeft vaak een te chaotisch patroon. Door kleurpaletten te gebruiken, krijg je tekeningen die mooier zijn qua kleuren. Door perlin noise te gebruiken, kan je toch iets volledig random doen, terwijl je toch de chaos van teveel kleuren onder controle houdt.

<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `let vierkantenPerRij = 25;
let canvas = 450;

function setup() {
  createCanvas(canvas, canvas);
  rectMode(CENTER);
  background(0);
  stroke(255);
  fill(230);
  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}

function draw() {}`

let sketch2 = `let vierkantenPerRij = 25;
let canvas = 450;

function setup() {
  createCanvas(canvas, canvas);
  rectMode(CENTER);
  background(0);
  stroke(255);

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let rood = random(0,255);
      let groen = random(0,255);
      let blauw = random(0,255);
      fill(rood, groen, blauw);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}

function draw() {}`

let sketch3 = `let colors = ["#fff9db", "#ffec99", "#ffd43b", "#fab005", "#f08c00"];

let vierkantenPerRij = 25;
let canvas = 450;

function setup() {
  createCanvas(canvas, canvas);
  rectMode(CENTER);
  background(0);
  stroke(255);

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let kleur = random(colors);
      fill(kleur);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}

function draw() {}`

let sketch4 = `let vierkantenPerRij = 25;
let canvas = 450;
let variatie = 0.4; //hoe groter dit getal, hoe groter de variatie

function setup() {
  createCanvas(canvas, canvas);
  rectMode(CENTER);
  background(0);
  stroke(255);
  //noStroke();

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let kleur = floor(map(noise(x*variatie, y*variatie), 0,1,0,255));
      fill(kleur);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}

function draw() {}`

let sketch5 = `let vierkantenPerRij = 25;
let canvas = 450;
let variatie = 0.4; //hoe groter dit getal, hoe groter de variatie

function setup() {
  createCanvas(canvas, canvas);
  rectMode(CENTER);
  background(0);
  stroke(255);
  //noStroke();
  let rood = floor(random(0,255));
  let blauw = floor(random(0,255));

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let groen = floor(map(noise(x*variatie, y*variatie), 0,1,0,255));
      fill(rood, groen, blauw);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}

function draw() {}`

 </script>