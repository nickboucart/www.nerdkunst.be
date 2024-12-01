---
title: "Een coole simulatie van opstijgende rook"
date: "2024-02-07"
draff: false
image: "rook-simulatie.png"
description: "Een p5js tutorial waarin we een simulatie maken van opstijgende rook"
tags: ["p5js", "simulatie", "tutorial"]
---

In deze tutorial maken we een simulatie van een opstijgende rook. We zullen dat stap-voor-stap opbouwen, te beginnen met 1 enkel rokend deeltje, om dan meer rookdeeltjes toe te voegen. 


## Even iets over het rookeffect
Laten we eerst even bekijken wat een rookeffect is. Rook is een soort wolkje, dat langzaam opstijgt, eventueel wat gedragen door de wind, en dat terwijl het opstijgt zich uitspreidt en verdwijnt.

We gaan dus beginnen met het maken van 1 deeltje dat ergens willekeurig op het scherm verschijnt, en dat vervolgens traag omhoog gaat en uitwaaiert.

## Een eenvoudige  ```Deeltje```s klasse
Om dit te modelleren, introduceren we een Javascript klasse ```Deeltje```, die zal bijhouden waar het deeltje zich bevindt, in welke richting het beweegt en hoe de zichtbaarheid van dat deeltje is.

We zullen eerst beginnen met een heel eenvoudig deeltje: eentje dat enkel een x en y positie heeft, en dat langzaam naar boven gaat, telkens de ```draw()``` functie aangeroepen wordt door p5. 

<P5 code={sketch1} />

Probeer deze code al eens uit door op ```run``` te drukken. Als alles goed gaat, zie je een deeltje onderaan het zwarte canvas verschijn en nogal saai omhoog gaan. Het lijkt nog niet op echte rook. Om het wat meer op rook te laten gelijken, zou het rook deeltje niet alleen moeten opstijgen, maar ook uitwaaieren en gelijdelijk verdwijnen. Laat ons dat eens proberen.

## Een cooler rookdeeltje
In de vorige sketch houden we in de ```Deeltje``` klasse enkel de positie van het deeltje bij. De kleur en de grootte van het deeltje, zitten hardgecodeerd in de ```Deeltje.update()``` functie. Laten we dat veranderen, en ervoor zorgen dat bij elke update, het deeltje een beetje groter wordt, en een beetje doorschijnender. in p5.js maak je iets doorschijnend door de __alpha__ waarde van een kleur aan te passen. De alpha waarde van een kleur is een getal tussen 0 en 255: bij 255 is de kleur ondoorzichtig, en 0 is de kleur volledig doorzichtig.

Ok, let's do this!

<P5 code={sketch2} />

Door elke keer als de ```draw``` functie wordt aangeroepen, de alpha waarde een beetje te verlagen, en de straal van het deeltje wat te vergroten, krijgen we een effect waarbij het deeltje precies uitdooft. Hoe cool is dat?!

## Wat is er cooler dan 1 rookdeeltje? Veel rookdeeltjes!!
Zo 1 rookdeeltje is natuurlijk niet echt indrukwekkend, toch? 't Zou veel cooler zijn als er veel rookdeeltjes zijn. Stel nu dat telkens je in het canvas ergens klikt en sleept, er rookdeeltjes tevoorschijn zouden komen, die dan elk op hun buurt zo uitwaaieren en uitdoven. 

Om dat te doen, zullen we onze sketch wat moeten aanpassen: we gaan een ```array```, dat is Javascipts voor lijst, van deeltjes moeten bijhouden, waarbij we telkens de ```draw``` functie aangeroepen wordt, elk deeltje in die array moeten updaten en tekenen. Telkens we draggen met onze muis, stoppen we meer deeltjes in de array, waarbij die deeltjes verschijnen op de plaats waar onze muis is gezet. Dit laatste kunnen we doen via het implementeren van een ```mouseDragged()```.

Hieronder zie je de code. Probeer het gerust uit :)

<P5 code={sketch3} />

## Afwerking en de puntjes op de i
Onze sketch is bijna klaar. Er kan nog wel iets verbeteren, vind ik. Zo vind ik dat de deeltjes te groot worden, ze zouden iets compacter moeten zijn. En in het echt kringelt die rook niet recht naar boven, maar ook een beetje naar links en naar rechts. 
Een laatste ding dat we nog moeten aanpassen, is iets technischer: op dit moment blijven alle deeltjes in de deeltjeslijst zitten, ook als ze al lang niet meer op het scherm te zien zijn. We zouden die deeltjes het beste uit de lijst halen, zodat we daar verder niet meer moeten aan rekenen.

Om het uizicht van de rookdeeltjes realistischer te maken, zullen we ook een snelheid in de x richting introduceren, en die voor elk deeltje willekeurig tussen -1 en 1 maken. Zo gaan de deeltjes iets organischer bewegen. We gaan er ook voor zorgen dat de straal van het deeltje maximaal 30 groot kan zijn. Tot slot zullen we een ```isOnzichtbaar()``` methode implementern op het deeltje, en telkens wanneer een deeltje onzichtbaar geworden is, zullen we dat uit de lijst halen.

De code ziet er als volgt uit:

<P5 code={sketch4}/>


## Conclusie
In deze tutorial hebben we een rooksimulatie gemaakt. We maakten gebruik van Javascript klasses en arrays om de deeltjes na te bootsen. Om de rook nog realistischer te maken zou je:
- de deeltjes niet allemaal exact dezelfde grijstint te maken, maar een beetje variëren. Een echte rookwolk heeft ook vele tinten.
- een deeltje zelf iets donkerder kleuren binnenin en wat lichter aan de buitenkant.
- wind introduceren, waarbij de deeltjes een beetje naar 1 kant geblazen worden
- de deeltjes invullen met willekeurige kleuren om zo een soort vuurwerkachtig effect te maken.

<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `class Deeltje {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -2;
  }
  update() {
    this.y += this.vy;
  }
  show() {
    noStroke();
    fill(230);
    ellipse(this.x, this.y, 5)
  }
}

let deeltje;

function setup() {
  createCanvas(400, 400);
  deeltje = new Deeltje(200, 350);
}

function draw() {
  background(0);
  deeltje.show();
  deeltje.update();
}`

let sketch2 = `class Deeltje {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.kleur = 230;
    this.alpha = 255;
    this.straal = 5;
  }
  update() {
    this.y += this.vy;
    this.alpha -= 3;
    this.straal += 1;
    
  }
  show() {
    noStroke();
    fill(this.kleur, this.alpha);
    ellipse(this.x, this.y, this.straal)
  }
}

let deeltje;

function setup() {
  createCanvas(400, 400);
  deeltje = new Deeltje(200, 350);
}

function draw() {
  background(0);
  deeltje.show();
  deeltje.update();
}`

let sketch3 = `class Deeltje {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.kleur = 230;
    this.alpha = 255;
    this.straal = 5;
  }
  update() {
    this.y += this.vy;
    this.alpha -= 3;
    this.straal += 1;
    
  }
  show() {
    noStroke();
    fill(this.kleur, this.alpha);
    ellipse(this.x, this.y, this.straal)
  }
}

let deeltjes;

function setup() {
  createCanvas(400, 400);
  deeltjes = [];
}

function draw() {
  background(0);
  for (i = 0 ; i < deeltjes.length ; i++) {
    deeltjes[i].show();
    deeltjes[i].update();
  }
}

function mouseDragged() {
    deeltje = new Deeltje(mouseX, mouseY);
    deeltjes.push(deeltje);
 
}`

let sketch4 = `class Deeltje {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.kleur = 230;
    this.alpha = 255;
    this.straal = 5;
  }
  update() {
    this.y += this.vy;
    this.alpha -= 3;
    this.straal += 1;
    
  }
  show() {
    noStroke();
    fill(this.kleur, this.alpha);
    ellipse(this.x, this.y, this.straal)
  }
}

let deeltjes;

function setup() {
  createCanvas(400, 400);
  deeltjes = [];
}

function draw() {
  background(0);
  for (i = 0 ; i < deeltjes.length ; i++) {
    deeltjes[i].show();
    deeltjes[i].update();
  }
}

function mouseDragged() {
    deeltje = new Deeltje(mouseX, mouseY);
    deeltjes.push(deeltje);
 
}`


 </script>