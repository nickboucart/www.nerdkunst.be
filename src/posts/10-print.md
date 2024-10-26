---
title: 10 Print
date: '2024-05-06'
tags:
 - lijnenspel
 - tutorial
 - p5
image: print10-size20.png
description: We maken een doolhof op basis van de print 10 one-liner
draft: false
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';

    const sketch1 = `
const size = 15;
let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
    background(0);
  
  }

function draw() {
  fill(230);
  stroke('white')
  strokeWeight(2);

      if (random(1) < 0.5) {
      line(x,y, x+size, y+size);
      }
      else {
        line(x, y+size, x+size, y);
      }
  x = x + size;
  if (x > width ) {
    x = 0;
    y = y + size;
  }
  if (y > height) {
    noLoop();
  }
}`

</script>

Een tijdje terug hadden we hier al [een post over lijnen](/posts/lijn-patronen.ml), in dit artikel gaan we opnieuw met lijnen aan de slag. We vertrekken van legendarische lijn code, ooit geschreven voor de Commodore 64, die misschien wel aan de wieg staat wat we vandaag computerkunst noemen.

## 1 lijn code, oneindig veel variarties.
Volgens [Wikepedia](https://en.wikipedia.org/wiki/One-liner_program) is de code hieronder 1 van de meest bekende one-liners in de geschiedenis van het programmeren. Er is zelfs een [volldig boek](https://10print.org/) aan gewijd.

```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```
Deze lijn BASIC code voor de Commodor 64 tekent willekeurig een ```/``` of een ```\``` op het scherm. Het effect dat je dan krijgt is een soort van doolhof zoals je dat kan zien bovenaan deze post.

In deze post bouwen we dat na in p5.js.

## 10 PRINT in p5.js
De code om dit algoritme in p5 na te bouwen is niet zo moeilijk: in gedachten verdelen we het canvas in vierkanten, en in elk vierkant tekenen we ofwel een lijn van linksboven naar rechtsonder, ofwel een lijn van rechtsboven naar linksonder. Dat doen we lijn per lijn, totdat het ganse scherm vol staat, en dan stoppen we.

Dat ziet er ongeveer uit als volgt:

<P5 code={sketch1} />

Het effect is dat je telkens een soort doolhof-ding krijgt. Ik moedig je aan om de ```size``` variabele eens wat groter of kleiner te maken, en telkens het effect te zien. Persoonlijk vind ik 20 wel een mooie waarde. Je kan ook spelen met het ```if`` statement hierboven. Door bijvoorbeeld te testen of het random getal kleiner is dan 0.3, krijgt het patroon weer een andere invulling.

<ExampleImages images="{[{fileName: 'print10-size20.png', title: 'print10 met size 20' }, {fileName: 'print10-size20-rand01.png', title: 'print10 met 0.1 als grens voor random'}]}"/>

## Nog variaties
Je kan op dit thema eindeloos variëren:
- je kan met kleuren werken, bijvoorbeeld met achtergrond en lijnen in complementaire kleuren
- je kan in een spiraal vanuit het midden werken, ipv. linksboven te beginnen
- je kan eindeloos blijven verder tekenen door terug naar boven te springen wanneer je aan het einde van het canvas bent, in plaats van te stoppen zoals nu.
- ...

## Conclusie.
In deze post zijn we vertrokken van een van de meest iconische one-liners ooit, de 10 PRINT. Deze code ligt mee aan de basis van het idee van programatische kunst, ik vond dat deze dus niet mocht ontbreken op nerdkunst!.