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

    const sketch1 = `
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`

</script>

Een tijdje terug hadden we hier al 

<P5 code={sketch1} />