---
title: "Maurer Roses in p5js"
date: "2024-06-22"
tags: ['p5', 'tutorial', 'wiskunde']
image: "maurer-rose.png"
description: "In deze tutorial maken we Maurer rozentekeningen"
draft: false
---
*Deze post werd geschreven tijdens CoderDojo Halle, in samenwerking met Liam.*

Een Maurer roos is een wiskundige formule voor het eerst beschreven door [Peter M. Maurer](https://en.wikipedia.org/wiki/Maurer_rose).
De formule voor zo'n roos is niet zo moeilijk. Ze gebruikt polaire coördinaten en wordt opgebouwd door 361 punten volgens de formule:
```
(sin(nk), k) (k = 0, d, 2d, 3d, ..., 360d)
```
waarbij d een positief getal is. d is uitgedrukt in graden.

## Aan de slag met p5js.

We zullen beginnen om het algoritme van hierboven in p5 te implementeren. Ik heb een functie gemaakt ```tekenRoos``` die de roos zelf tekent, en die als parameters n, d en een grijswaarde aanneemt.
Door gebruik te maken van ```beginShape```, ```endShape``` en ```vertex``` maken we een gesloten figuur met allemaal lijnen in de vorm van een roos.

<P5 code={sketch1} />

Hoe cool is dat? 
Door de variabelen n en d te wijzigen, en het script opnieuw te laten lopen, krijg je steeds een nieuwe roos.

## We maken er een eeuwigdurende rozentekenaar van.
We kunnen nu verder werken op dit. Stel dat we de waarden van d en n laten variëren, krijgen we telkens een andere tekening. Als we nu ook nog de grijswaarde zachten aanpassen van volldige gelijk aan de achtergrondkleur, tot bijna zwart, krijgen we een leuk effect waarbij er telkens een andere roos verschijnt.

<P5 code={sketch2} />

Uren kijkplezier gegarandeerd ;)


<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `let n = 7;
let d = 29;

function setup() {
  createCanvas(400, 400);
  background(200);
  noFill();
  strokeWeight(1);
  tekenRoos(n, d, 100);
  noLoop();

}

function draw() {
}

function tekenRoos(n, d, s) {
  translate(width / 2, height / 2);

  stroke(s);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = 200 * sin(n * k);
    let x = r * cos(k); // omzetten van polaire coördinaten naar x en y.
    let y = r * sin(k); // omzetten van polaire coördinaten naar x en y.

    vertex(x, y);
  }
  endShape();
}`

let sketch2 = `let n = 7;
let d = 29;
let strokeColor = 180;
let strokeColorChange = -1;

function setup() {
  createCanvas(400, 400);
  background(200);
  noFill();
  strokeWeight(1);
}

function draw() {
  background(200);

  if (strokeColor > 10 && strokeColor < 200) {
    strokeColor += strokeColorChange;
  } else {
    if (strokeColor > 10) {
      n = random(3, 25);
      d = random(3, 100);
    }
    strokeColorChange = -strokeColorChange;
    strokeColor += strokeColorChange;
  }

  tekenRoos(n, d, strokeColor);
}

function tekenRoos(n, d, s) {
  translate(width / 2, height / 2);

  stroke(s);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = 200 * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);

    vertex(x, y);
  }
  endShape();
}
`</script>