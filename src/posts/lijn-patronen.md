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
    import ExampleImages from '$lib/components/ExampleImages.svelte';

    let sketch1 = `
let lengteStreepje = 20;

function setup() {
  createCanvas(400, 400);
  background(230);
  let aantalStreepjesPerLijn = width / lengteStreepje;
  stroke(0);
  noFill();
  for (x = 0; x < aantalStreepjesPerLijn; x++) {
    for (y = 0; y < aantalStreepjesPerLijn; y++) {
      rect(x * lengteStreepje, y * lengteStreepje, lengteStreepje);
    }
  }
}`
let sketch2= `
let lengteStreepje = 20;

function setup() {
  createCanvas(400, 400);
  background(230);
  // omdat ons canvas vierkant is, zijn er evenveel streepjes
  // in horizontale en in vertikale richting
  let aantalStreepjesPerLijn = width / lengteStreepje;
  
  noFill();
  for (x = 0; x < aantalStreepjesPerLijn; x++) {
    for (y = 0; y < aantalStreepjesPerLijn; y++) {
    stroke(0);
     //rect(x * lengteStreepje, y * lengteStreepje, lengteStreepje);
      if (y % 2 == 0 ) { // een even rij, dus horizontaal streepje
        line(x * lengteStreepje, y * lengteStreepje + lengteStreepje / 2,  x*lengteStreepje + lengteStreepje, y * lengteStreepje + lengteStreepje / 2);
      }
      else {
                line(x * lengteStreepje+lengteStreepje/2, y * lengteStreepje,  x * lengteStreepje+lengteStreepje/2, y * lengteStreepje + lengteStreepje);
      }
    }
  }
}

function draw() {}`

let sketch3 = `
let lengteStreepje = 20;
let hoek;

function setup() {
  createCanvas(400, 400);
  background(230);
  angleMode(DEGREES);
  hoek = random(0, 180);
  // omdat ons canvas vierkant is, zijn er evenveel streepjes
  // in horizontale en in vertikale richting
  let aantalStreepjesPerLijn = width / lengteStreepje;

  noFill();
  for (x = 0; x < aantalStreepjesPerLijn; x++) {
    for (y = 0; y < aantalStreepjesPerLijn; y++) {
      stroke(0);

      if (y % 2 == 0) {
        // een even rij, dus horizontaal streepje
        push();
        translate(
          x * lengteStreepje + lengteStreepje / 2,
          y * lengteStreepje + lengteStreepje / 2
        );
        rotate(hoek);
        line(
          -lengteStreepje/2,
          0,
          lengteStreepje/2,
          0
        );
        pop();
      } else {
        push();
        translate(
          x * lengteStreepje + lengteStreepje / 2,
          y * lengteStreepje + lengteStreepje / 2
        );
        rotate(hoek);
        line(0, -lengteStreepje / 2, 0, lengteStreepje / 2);
        pop();
      }
    }
  }
}

function draw() {}`

let sketch4= `
let lengteStreepje = 20;
let hoek1;
let hoek2;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  hoek1 = random(0, 180);
  hoek2 = random(0, 180);
}

function draw() {
  background(230);
  // omdat ons canvas vierkant is, zijn er evenveel streepjes
  // in horizontale en in vertikale richting
  let aantalStreepjesPerLijn = width / lengteStreepje;

  noFill();
  for (x = 0; x < aantalStreepjesPerLijn; x++) {
    for (y = 0; y < aantalStreepjesPerLijn; y++) {
      stroke(0);

      if (y % 2 == 0) {
        // een even rij, dus horizontaal streepje
        push();
        translate(
          x * lengteStreepje + lengteStreepje / 2,
          y * lengteStreepje + lengteStreepje / 2
        );
        rotate(hoek1);
        line(-lengteStreepje / 2, 0, lengteStreepje / 2, 0);
        pop();
      } else {
        push();
        translate(
          x * lengteStreepje + lengteStreepje / 2,
          y * lengteStreepje + lengteStreepje / 2
        );
        rotate(hoek2);
        line(0, -lengteStreepje / 2, 0, lengteStreepje / 2);
        pop();
      }
    }
  }
  hoek1 += 1;
  hoek2 -= 1;
}`


</script>

In deze tutorial gaan we aan de slag met het tekenen van lijnen, om zo patronen te maken. Op't eerste gezicht een beetje saai zal je denken. Ja, misschien wel, al hoop ik met dit artikel aan te tonen dat lijnen ook heel spannende patronen kunnen opleveren ;)

<!--more-->

## Een eerste paar patronen.
We zullen beginnen met een aantal eenvoudige dingen. Laat ons eerst ons canvas denkbeeldig indelen volgens vierkanten. Vervolgens tekenen we binnen de eerste rij vierkanten, telkens een lijntje dat het vierkant horizontaal mooi doormidden snijdt, en bij de volgende rij maken we daar een verticaal lijntje van.
We zullen eerst, om het wat visueel te maken, de vierkanten tekenen in een lichte kleur, alsof het "hulplijnen" zijn. We gebruiken een variabele ```lengteStreepje``` om de lengte van de streepjes te bepalen. Speel gerust eens met de waarde van deze variabele, en je zal grotere of kleinere vierkantjes zien verschijnen.



<P5 code={sketch1} />

Laat ons nu de vierkanten vervangen door lijntjes, op de even rijen een horizontale lijn, op de oneven rijen een verticale lijn. Om te testen of we te maken hebben met een even of een uneven rij, kunnen we de ```y``` variabele in de binnenste ```for-loop``` delen door 2, en de rest van die deling bekijken. Is die 0, dan is het een even rij, bij 1 is dat een oneven rij. De rest van een deling bereken je in Javascript door ```y % 2``` te doen.

Het resultaat van ons werk zie je hieronder.

<ExampleImages images="{[{fileName: 'lijnpatroon1.png', title: 'een eenvoudig lijnpatroon'}]}" />

<P5 code={sketch2} />

## Interessantere streepjes.
Toegegeven, het patroon hierboven is relatief simpel. Laat ons proberen dat wat interessanter te maken. Wat als we de vertikale streepjes eens onder een willekeurgie hoek zetten. Het leuke daaraan is dat we dan telkens we de sketch runnen, we een andere tekening krijgen.

Om dat te doen, introduceren we een extra variabele die we willekeurig invullen met een getal tussen 0 en 180. Om het vertikale streepjes te draaien, kunnen we het canvas draaien met de ```rotate()``` functie. Door die functie tussen een ```push()``` en een ```pop()``` aan te roepen, zorgen we ervoor dat het canvas telkens op zijn originele positie komt te staan. Al is het jammer genoeg zo simpel niet. Als we enkel rotate() aanroepen, draaien we het ganse canvas, en komen de lijntjes __scheef__ te staan. We moeten eigenlijk elk lijntje draaien rond zijn middelpunt. We moeten dus voor elk lijntje het canvas eerst opschuiven naar dat middelpunt, en dan pas draaien. Hieronder zie je de code om dit te doen. En terwijl we dat doen, kunnen we ineens de horizontale streepjes draaien, om het nog spannender te maken.

Hierbij een voorbeeld van zo'n patroon. Soms krijg je zelfs een optische illusie: het lijkt wel of de foto scheef staat.

<ExampleImages images="{[{fileName: 'lijnpatroon2.png', title: 'Lijnpatroon met hoeken'}]}" />


<P5 code={sketch3} />

## Nog een laatste ideetje.

Wat als we nu eens wat beweging toevoegen? We zouden die lijntjes traag kunnen laten draaien, zodat het patroon iets hypnotisch krijgt.

Om dat te doen, zullen we de code die de lijntjes tekenen, moeten verhuizen naar de draw() functie. Ook het hertekenen van de achtergrond gaan we bij elke draw() moeten doen, en de hoek waarover we alles roteren, passen we ook telkens een klein beetje aan.

<P5 code={sketch4} />

## Conclusie
In dit artikel hebben we gespeeld met lijnen en patronen. Hoewel het effect simpel is, zijn we wel op een optische illusie gebotst. Op 't einde hebben we zelfs wat beweging toegevoegd. Laat de verschillende sketches zeker verschillende keren lopen, om telkens een ander effect te zien. Dat is de kracht van ```random()```.

Enkele suggesties om hierop verder te bouwen:
- voeg 2 sliders toe waarin de gebruiker zelf de 2 hoeken kan instellen, zodat de gebruiker impact heeft op het patroon.
- voeg kleur toe aan de lijntjes, eventueel met een contrasterende achtergrond.