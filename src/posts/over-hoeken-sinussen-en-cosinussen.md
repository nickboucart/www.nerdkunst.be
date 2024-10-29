---
title: "Over Hoeken, Sinussen en Cosinussen"
date: "2024-03-03"
tags: ["tutorial", "meetkunde", "sinus", "cosinus"]
image: "sinus-cosinus.png"
description: "Een interactieve visualisatie van hoeken, sinussen en cosinussen"
draft: false
---
We duiken vandaag wat in de meetkunde, en meerbepaald sinussen en cosinussen. We gaan hier niet de ganse theorie uitwerken, we zullen vooral focussen om het praktisch gebruik van beide functies, want je zal ze vaak nodig hebben. Telkens je iets wil bouwen waar cirkels inzitten, of iets ronddraait, is de kans groot dat je ergens de coördinaten van een punt op die cirkel nodig hebt. En daar kunnen die sinus- en cosinus-beesten ons mee helpen.

<!--more-->
## De basis
We gaan beginnen met een assenkruis te tekenen in het midden van ons canvas, en een cirkel met middelpunt in het punt (0,0), met een straal van 125. Vanuit het midden trekken we een lijn onder een hoek van 30 graden. We noemen die hoek α. Het punt waar die lijn de cirkel snijdt, is een heel belangrijk punt: om de coördinaten van dat punt te bepalen, hebben we de cosinus en sin van de hoek α nodig. Om de x-coördinaat van dat punt te berekenen, moeten we de straal van de cirkel (in deze sketch 125) vermenigvuldigen met de cosinus van de hoek α. (groen op de tekening) Voor de y-coördinaat gebruiken we de sinus. (blauw op de tekening.) In de meetkunde zegt men ook soms: we projecteren het punt op de x-as en de y-as. De sinus en cosinus van een hoek is altijd een getal tussen -1 en 1.

<P5 code={sketch1} />

## Een beetje actie graag: wat als dat punt nu eens zou ronddraaien?
Laat ons nu even kijken hoe cosinus en sinus veranderen, afhankelijk van de hoek. We gaan onze sketch wat aanpassen en laten bewegen. We gaan langzaam de hoek laten varieren, zodat het punt op de cirkel ronddraait. We zien dan ook de groene en blauwe lijn veranderen. De groene lijn laat zien hoe de cosinus tussen -straal en +straal op de x-as gaat, de blauwe lijn doet hetzelfde langs de y-as. Dat heel regelmatig op en neergaan heet trouwens **de harmonische beweging**. Je vindt dat ook terug in de beweging van slingers en massa's die op en neer gaan aan een veer.

<P5 code={sketch2} />

## Conclusie.
In deze post hebben we even gespeeld met hoeken, sinussen en cosinussen. 't Was zeker niet de bedoeling om een ganse les goniometrie of driehoeksmeetkunde te geven, wel om een geheugensteuntje te zijn wanneer je de volgende keer de coördinaten van een punt op een cirkel nodig hebt.

<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `let straal = 125;
let hoek = 30;

function setup() {
  angleMode(DEGREES);
  createCanvas(400, 400);
  background(255);
  // maak de oorsprong gelijk aan het midden van het canvas
  translate(width / 2, height / 2);
  // dit draait de y-as, die in standaard p5js van boven naar beneden loopt, zodat die nu van beneden naar boven loopt
  scale(1, -1);
  noFill();
  circle(0, 0, 2 * straal);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  fill("black");
  circle(1, 0, 1);
  circle(0, 1, 1);

  let x = straal * cos(hoek);
  let y = straal * sin(hoek);

  circle(x, y, 5);
  fill(230);
  line(0, 0, x, y);
  arc(0, 0, 100, 100, 0, 30);
  
  strokeWeight(2);
  stroke("green");
  line(0, y, x, y);
  stroke("blue");
  line(x, 0, x, y);


  // beetje prutsen om de teksten niet ondersteboven en op de juiste plaats te krijgen
  push();
  fill("black");
  stroke("black");
  strokeWeight(0.8);
  scale(1, -1);
  text("(0,0)", 10, 20);
  text(" (125, 0)", 125, -10);
  text(" (0, 125)", 10, -125);
  stroke("green");
  text("straal*cos(α)", 25, -70);
  stroke("blue");
  text("straal*sin(α)", 130, -35);
  stroke("black");
  textSize(20);
  text("x-as", width / 2 - 50, 20);
  text("y-as", 10, -height / 2 + 50);
  text("α", 50 * cos(-hoek / 2), 50 * sin(-hoek / 2));
  pop();
}

function draw() {}`

let sketch2 = `let straal = 125;
let hoek = 0;

function setup() {
  angleMode(DEGREES);
  createCanvas(400, 400);

}

function draw() {
  background(255);
  // maak de oorsprong gelijk aan het midden van het canvas
  translate(width / 2, height / 2);
  // dit draait de y-as, die in standaard p5js van boven naar beneden loopt, zodat die nu van beneden naar boven loopt
  scale(1, -1);
  noFill();
  circle(0, 0, 2 * straal);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
  fill("black");
  circle(1, 0, 1);
  circle(0, 1, 1);

  let x = straal * cos(hoek);
  let y = straal * sin(hoek);

  circle(x, y, 5);
  fill(230);
  line(0, 0, x, y);
  arc(0, 0, 100, 100, 0, hoek);
  
  push();
  strokeWeight(4);
  stroke("green");
  line(0, straal, x, straal);
  stroke("blue");
  line(straal, 0, straal, y);
  drawingContext.setLineDash([5,5]);
  strokeWeight(1);
  line(x,y, straal, y);
  stroke("green");
  line(x,y, x, straal);
  pop();
  
  hoek += 1;
}`

</script>