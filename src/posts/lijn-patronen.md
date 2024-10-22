---
title: Allemaal lijnen - patronen met lijnen
date: "2024-02-09"
draft: false
image: lijnpatroon2.png
description: Een p5js tutorial waarin we patronen maken met lijnen.
tags:
 - patronen
 - lijnen
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';

    const sketch1 = `
function setup() {
  createCanvas(400, 400);
  //efkes iet anders
}

function draw() {
  background(220);
}`
</script>

In deze tutorial gaan we aan de slag met het tekenen van lijnen, om zo patronen te maken. Op't eerste gezicht een beetje saai zal je denken. Ja, misschien wel, al hoop ik met dit artikel aan te tonen dat lijnen ook heel spannende patronen kunnen opleveren ;)

<P5 code={sketch1} />>

<!--more-->

## Een eerste paar patronen.
We zullen beginnen met een aantal eenvoudige dingen. Laat ons eerst ons canvas denkbeeldig indelen volgens vierkanten. Vervolgens tekenen we binnen de eerste rij vierkanten, telkens een lijntje dat het vierkant horizontaal mooi doormidden snijdt, en bij de volgende rij maken we daar een verticaal lijntje van.
We zullen eerst, om het wat visueel te maken, de vierkanten tekenen in een lichte kleur, alsof het "hulplijnen" zijn. We gebruiken een variabele ```lengteStreepje``` om de lengte van de streepjes te bepalen. Speel gerust eens met de waarde van deze variabele, en je zal grotere of kleinere vierkantjes zien verschijnen.

