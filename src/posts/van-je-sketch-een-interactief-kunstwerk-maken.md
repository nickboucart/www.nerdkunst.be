---
title: "Van Je Sketch Een Interactief Kunstwerk Maken"
date: "2024-03-02"
tags: ["tutorial", "interactief"]
image: "vierkanten.png"
description: "Laat je gebruikers je kunstwerk beïnvloeden, zonder dat ze moeten coderen."
draft: false
---
Wanneer je even kijkt naar de code van het artikel over de [patronen met vierkanten](/patronen-met-vierkanten), dan zie je bovenaan de sketch een variabele ```vierkantenPerRij```. Als je wat wil experimenteren wat het effect is van meer of minder vierkanten, dan pas je snel die variabele aan en voert de sketch opnieuw uit. Zou het niet cool zijn dat de bewonderaars van je kunstwerk dat zelf kunnen aanpassen, zonder te coderen? Lees snel verder en leer hoe je dit kan doen.

## Interactiviteit toevoegen via sliders
We bouwen verder op de code uit het artikel over de [patronen met vierkanten](/patronen-met-vierkanten), en wel de laatste sketch op die pagina. We zullen eerst de gebruiker de mogelijkheid geven om de grootte van de vierkanten aan te passen. We gaan daarvoor de ```createSlider()```-functie gebruiken. Daarmee maak je een slider die je kan instellen tussen een begin- en eindwaarde. Het idee is dat we, telkens een gebruiker die slider aanpast, de vierkanten opnieuw getekend en ingevuld worden, nu met de nieuwe waarde. Om dat te doen, gaan we het tekenen van de vierkanten in de ```draw()```-functie. doen, ```noLoop()``` aanroepen om ervoor te zorgen dat we niet de ganse tijd nodeloos hertekenen, en ```redraw()``` aanroepen enkel wanneer de waarde van de slider veranderd wordt. De lijn waarin staat slider.input(redraw) zorgt daarvoor.

Bekijk het resultaat, en gebruik de slider even. Dat geeft een supercool zoom-effect. Dit toont nog eens de kracht van de ```noise()```-functie: wanneer die aangeroepen wordt met dezelfde parameters, geeft die dezelfde waarde terug, waardoor het lijkt dat we inzoomen.

<P5 code={sketch1} />

## Controleerbare chaos.
In de vorige sketch controleerden we enkel het aantal vierkanten. Laat ons nu ook nog een slider toevoegen waarmee we de hoeveelheid chaos kunnen veranderen, zodat onze bewonderaars zelf kunnen kiezen tussen een relatief egale tekening, of net 1 met veel kleurschakeringen.

Het principe hier is net hetzelfde als voorheen, dus 'k ga er weinig extra uitleg bij geven.

<P5 code={sketch2} />

## Conclusie
Stel je voor: je toont het resultaat van deze tutorial tijdens een tentoonstelling op een levensgroot touch screen. Bezoekers kunnen via de sliders het kunstwerk beïnvloeden, en kijken met open mond naar jouw steeds veranderende werk. En dat zonder 1 lijn code te veranderen. Dat hebben we vandaag toch weer mooi voor mekaar gekregen!

<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `let vierkantenPerRij;
let slider;
let canvas = 400;
let variatie = 0.4; //hoe groter dit getal, hoe groter de variatie

function setup() {
  createCanvas(canvas, canvas);
  let sliderTekst = createSpan("aantal vierkanten");
  sliderTekst.position(10, 30);
  slider = createSlider(5, 50, 25);
  slider.position(10, 50);
  rectMode(CENTER);
  noLoop();
  slider.input(redraw);
}

function draw() {
  background(0);
  stroke(255);
  vierkantenPerRij = slider.value();
  stroke(255);
  //noStroke();
  let rood = floor(random(0, 255));
  let blauw = floor(random(0, 255));

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let groen = floor(map(noise(x * variatie, y * variatie), 0, 1, 0, 255));
      fill(rood, groen, blauw);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}`

let sketch2 = `let vierkantenPerRij;
let slider;
let canvas = 400;
let chaos; //hoe groter dit getal, hoe groter de variatie

function setup() {
  createCanvas(canvas, canvas);
  let sliderTekst = createSpan("aantal vierkanten");
  sliderTekst.position(10, 30);
  slider = createSlider(5, 50, 25);
  slider.position(10, 50);
  let chaosTekst = createSpan("verander chaos");
  chaosTekst.position(200, 30);
  chaosSlider = createSlider(0, 100, 40);
  chaosSlider.position(200, 50);
  rectMode(CENTER);
  noLoop();
  slider.input(redraw);
  chaosSlider.input(redraw);
}

function draw() {
  background(0);
  stroke(255);
  vierkantenPerRij = slider.value();
  chaos = chaosSlider.value() / 100.0;
  print(chaos);
  stroke(255);
  //noStroke();
  let rood = floor(random(0, 255));
  let blauw = floor(random(0, 255));

  let grootteVierkant = canvas / vierkantenPerRij;
  for (var x = 0; x < vierkantenPerRij; x += 1) {
    for (var y = 0; y < vierkantenPerRij; y += 1) {
      let groen = floor(map(noise(x * chaos, y * chaos), 0, 1, 0, 255));
      fill(rood, groen, blauw);
      square(
        x * grootteVierkant + grootteVierkant / 2,
        y * grootteVierkant + grootteVierkant / 2,
        grootteVierkant
      );
    }
  }
}`

 </script>