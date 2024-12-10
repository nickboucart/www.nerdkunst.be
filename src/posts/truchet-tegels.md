---
title: Patronen maken met Truchet tegels
date: '2024-12-07'
tags:
 - lijnenspel
 - tutorial
 - p5
 - truchet
image: print10-size20.png
description: Patronen maken met Truchet stempels
draft: true
---

In deze tutorial gaan we aan de slag met **"Truchet tegels"**. Truchet tegels of stempels zijn vierkante stempels die niet rotationeel symmetrisch zijn. Dat wil zeggen dat, wanneer je de tegels 180 graden draait, je niet dezelfde tekening krijgt. [Wikepedia](https://en.wikipedia.org/wiki/Truchet_tiles) heeft er een heel artikel aan gewijd. Door deze tegels naast mekaar te leggen, krijg je allerhande interessante figuren en patronen.


## Tegels met driehoeken
In een eerste oefening, gaan we aan de slag met tegels waarop een driehoek staat. Hieronder de code. 


<script lang="ts">
    import P5 from '$lib/components/P5.svelte';

    let sketch1 = `
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