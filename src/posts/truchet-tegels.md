---
title: Patronen maken met Truchet tegels
date: '2024-12-07'
tags:
 - lijnenspel
 - tutorial
 - p5
 - truchet
image: truchet-tegel.png
description: Tutorial waarin we met Truchet tegels allerhande patronen maken.
draft: false
---

In deze tutorial gaan we aan de slag met **"Truchet tegels"**. Truchet tegels of stempels zijn vierkante stempels die niet rotationeel symmetrisch zijn. Dat wil zeggen dat, wanneer je de tegels 180 graden draait, je niet dezelfde tekening krijgt. [Wikepedia](https://en.wikipedia.org/wiki/Truchet_tiles) heeft er een heel artikel aan gewijd. Door deze tegels naast mekaar te leggen, krijg je allerhande interessante figuren en patronen.


## Tegels met bogen
Laat ons beginnen met het maken van tegels waarop telkens 2 bogen staan, zoals diegene hieronder. Door de bogen telkens op het midden van een zijde van de tegel te laten starten en stoppen, zullen 2 tegels naast mekaar telkens mooi passen.

<ExampleImages images="{[
              {fileName: 'tile1.png', title: 'Truchet tegel'},
              {fileName: 'tile2.png', title: 'Complementaire Truchet tegel'}]}" />


Om zulke tegels te maken, zullen we de P5 functie ```arc``` gebruiken.

De code hieronder tekent de tegels. Ik maak een functie ```tile1()``` en ```tile2()``` om de tegels te maken. Je kan zelf even spelen met de code om het verschil tussen de tegels te zien.

<P5 code={sketch1} />

## Het canvas vullen met tegels.
Nu we weten hoe we zo'n tegels moeten maken, gaan we die tegels moeten leggen op ons canvas. We gaan daarvoor onze ```tile()`` functies wat moeten aanpassen: we gaan rekening moeten houden met de plaats waar de tegel op het canvas moet komen. De tegels gaan ook kleiner moeten zijn, nu beslaagt 1 tegel het ganse canvas.

We zullen eerst het canvas vullen met 5 tegels per rij, en 5 rijen. Aangezien ons canvas 400px x 400px is, zal elke tegel 400/5 = 80px breed zijn. We maken handig gebruik van de ```push()```, ```pop()``` en ```translate()``` functies van P5. Met ```translate(x,y)``` verschuiven we de oorsprong van ons canvas naar waar voorheen het punt (x,y) lag. Door push() en pop() te gebruiken, __onthouden__ we de oorspronkelijke oorsprong van ons canvas.

De code en het resultaat zien er als volgt uit. Pas gerust de code aan om de andere tile() functie te gebruiken.

<P5 code={sketch2} />

## Een snuifje willekeurigheid
Hoewel 't resultaat hierboven best al wel cool is, kan het nog toffer. Wat als we nu eens per tegel willekeurig kiezen of we tegel1 of tegel2 leggen? Benieuwd welke tekening we dan krijgen? Aan de slag.

In P5 heb je een ```random()```. We zouden die kunnen gebruiken om een willekeurig getal tussen 0 en 1 te laten genereren, en dan met if/then de tile1() of tile(2) functie aanroepen. Maar, als programmeur zijn we wat lui, en zouden we liever niet zoveel typen ;) Daarom gaan we dat anders doen. ```random()``` kan je ook gebruiken met een lijst als argument. De raondom() functie geeft dan een willekeurig element van die lijst terug. In javascript kan je functies ook gewoon als elementen in een lijst stoppen. Dus als je dat allemaal combineert, dan krijg je onderstaande code. 

<P5 code={sketch3} />

Zie je hoe het patroon nu een pak interessanter wordt? Soms heb je cirkels, dan weer golfpatronen. Telkens je op de startknop drukt, komt er een ander, gelijkaardig patroon.

## Nog enkele variaties
We hebben nu een goede basis om nog verder te experimenteren met Truchet tegels. We zouden bijvoorbeeld meer tegels per rij kunnen doen. Dat is makkelijk te implementeren, enkel de variabele tegelsPerRij aanpassen. Probeer het even met de code hierboven.

Een ander ding dat je zou kunnen doen, is werken met kleuren. In de vorige code was de achtergrond aan de saaie kant. We zouden nu een willekeurige achtergrondkleur kunnen zetten en de voorgrond invullen in de complementaire kleur. (kleuren zijn complementair aan mekaar wanneer ze samengevoegd wit geven, dus wanneer je de RGB waarden van beide kleuren optelt, kom je op (255, 255, 255) uit.)

Dat zou er dan zo kunnen uitzien. Probeer zeker meerdere keren deze sketch uit, je zal telkens een ander patroon en andere kleuren zien, elke tekening zal uniek zijn.

<P5 code={sketch4} />

## Conclusie
In deze tutorial hebben we met wat gespeeld met Truchet tegels. We keken eerst hoe we een individuele tegel moeten maken met de ```arc``` functie, om dan het ganse canvas op te vullen. Tot slot voegden we nog kleuren toe.

Mogelijke ideetjes voor uitbreidingen:
- je zou het aantal tegels per rij interactief kunnen maken met een slider, zodat een bewonderaar van het kunstwerk zelf kan instellen hoe fijn het patroon moet zijn.
- je zou het kunstwerk kunnen laten bewegen door de tegels 1 voor 1 te leggen
- ...

Veel tegelplezier!





<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';

 let sketch1 = `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);
  noFill();
  strokeWeight(4);
  tile2()
}

function tile1(){

  arc(0, 0, 400, 400, 0, PI/2);
  arc(width, height, 400, 400, PI, 3*PI/2)
}

function tile2(){
  arc(width, 0, 400, 400, PI/2, PI);
  arc(0, height, 400, 400, 3*PI/2, 0);
}`

let sketch2 = `var tegelsPerRij = 5;
var grootteTegel;


function setup() {
  createCanvas(400, 400);
  grootteTegel = width / tegelsPerRij;
  noLoop();
}

function draw() {
  background(220);
  noFill();
  strokeWeight(4);
  for(var x = 0; x < tegelsPerRij ; x++) {
    for(var y = 0; y < tegelsPerRij ; y++ ) {
       tile2(x*grootteTegel,y*grootteTegel, grootteTegel)
    }
  }
}

function tile1(x,y, breedte){
  push()
  translate(x,y)
  arc(0, 0, breedte, breedte, 0, PI/2);
  arc(breedte, breedte, breedte, breedte, PI, 3*PI/2)
  pop()
}

function tile2(x,y, breedte){
  push();
  translate(x,y);
  arc(breedte, 0, breedte, breedte, PI/2, PI);
  arc(0, breedte, breedte, breedte, 3*PI/2, 0);
  pop();
}`;

let sketch3 = `var tegelsPerRij = 5;
var grootteTegel;

function setup() {
  createCanvas(400, 400);
  grootteTegel = width / tegelsPerRij;
  noLoop();
}

function draw() {
  background(220);
  noFill();
  strokeWeight(4);
  for (var x = 0; x < tegelsPerRij; x++) {
    for (var y = 0; y < tegelsPerRij; y++) {
      tegel = random([tile1, tile2]);
      tegel(x * grootteTegel, y * grootteTegel, grootteTegel);
    }
  }
}

function tile1(x, y, breedte) {
  push();
  translate(x, y);
  arc(0, 0, breedte, breedte, 0, PI / 2);
  arc(breedte, breedte, breedte, breedte, PI, (3 * PI) / 2);
  pop();
}

function tile2(x, y, breedte) {
  push();
  translate(x, y);
  arc(breedte, 0, breedte, breedte, PI / 2, PI);
  arc(0, breedte, breedte, breedte, (3 * PI) / 2, 0);
  pop();
}
`;


let sketch4 = `var tegelsPerRij = 10;
var grootteTegel;

function setup() {
  createCanvas(400, 400);
  grootteTegel = width / tegelsPerRij;
  noLoop();
}

function draw() {
  rood = random(0,255);
  groen = random(0,255);
  blauw = random(0,255);
  background(rood, groen, blauw);
  complementaireKleur = berekenComplementaireKleur(rood, groen, blauw);
  noFill();
  strokeWeight(8);
  stroke(complementaireKleur);
  for (var x = 0; x < tegelsPerRij; x++) {
    for (var y = 0; y < tegelsPerRij; y++) {
      tegel = random([tile1, tile2]);
      tegel(x * grootteTegel, y * grootteTegel, grootteTegel);
    }
  }
}

function tile1(x, y, breedte) {
  push();
  translate(x, y);
  arc(0, 0, breedte, breedte, 0, PI / 2);
  arc(breedte, breedte, breedte, breedte, PI, (3 * PI) / 2);
  pop();
}

function tile2(x, y, breedte) {
  push();
  translate(x, y);
  arc(breedte, 0, breedte, breedte, PI / 2, PI);
  arc(0, breedte, breedte, breedte, (3 * PI) / 2, 0);
  pop();
}

function berekenComplementaireKleur(rood, groen, blauw) {
  complementairRood = 255-rood;
  complementairGroen = 255-groen;
  complementairBlauw = 255-blauw;
  return color(complementairRood, complementairGroen, complementairBlauw)
}`

</script>