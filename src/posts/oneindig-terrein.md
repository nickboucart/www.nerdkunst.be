---
title: "Oneindig Terrein"
date: "2024-08-17"
tags: ['p5', 'perlin noise', 'game design', 'tutorial']
image: "landschap.png"
description: "Een tutorial waarin we oneindig terrein genereren met perlin noise en p5js."
draft: false
---
Stel: je wil een game bouwen in de stijl van [1942](https://en.wikipedia.org/wiki/1942_(video_game)), waar een vliegtuigje over een landschap vliegt. Dan zou het toch cool zijn dat die achtergrond er tegelijk wat realistisch uitziet, en toch voldoende varieert. En dan liefts zonder dat je daar zelf graphics voor moet maken.

In deze tutorial gaan we aan de slag met __Perlin Noise__, en gaan we een dynamisch gegenereerd landschap maken. Zo'n landschap zou iets kunnen zijn voor in een game.

<!--more-->

## Perlin Noise
[Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise) is een vorm van randomness die wat natuurlijker aanvoelt. In p5js is er de ```noise``` functie, die 1, 2 of 3 argumenten aanneemt en een getal tussen 0 en 1 teruggeeft. Specifiek voor de noise-functie is dat voor naburige inputwaarden, de functie naburige getallen teruggeeft. Een klassieke random functie zou willekeurige getallen teruggeven. 

We gaan deze eigenschap gebruiken een landschap te genereren.

## Een procedureel landschap in zwart-wit
We gaan beginnen met het inkleuren van een canvas in grijswaarden afkomstig uit de noise-functie. We zetten een canvas op, en kleuren elke pixel in met ```noise(x,y)```.

<P5 code={sketch1} />

## Ombouwen tot landschap 
Zeg, zo cool is dat grijs landschap nu ook weer niet he... Waar zijn de meren, de woestijnen, de bossen of de bergen? Awel, we gaan daar eens werk van maken.

We gaan de sketch hierboven aanpassen, vooral dan de code dat de kleur van de pixels bepaald. In plaats van de noise-waarde om te zetten naar een grijswaarde, gaan we die waarde gebruiken om specifieke kleuren te kiezen, die elk staan voor ofwel water, bos, woestijn of grasland.


<P5 code={sketch2} />

## Een scrollend landschap

We hebben nu een coole sketch geschreven die een landschap genereerd. Maar wat als we een 1942 effect willen? In het spel 1942 vliegt een vliegtuig op grote hoogte, en scrolt het landschap beneden het vliegtuig langzaam voorbij. Hou zouden we dat effect proberen benaderen?

De oplossing ligt bij, hoe raad je het, de noise functie! Als we de y-waarde die we meegeven aan de noise-functie, zachtjes veranderen met de tijd, krijg je een scrollend effect. We gebruiken de frameCount variabele hiervoor.

<P5 code={sketch3} />

## Conclusie
In deze tutorial zijn we aan de slag gegaan met Perlin Noise, en maakten we aan procedureel landschap. Mogelijke verbeteringen zouden nog kunnen zijn:
- nog iets meer terreintypes
- wat spelen met de zoomfactor en de verschillende waarden voor de terreintypes
- luisteren op de pijltjestoetsen en het landschap laten scrollen in een andere richting.


<script lang="ts">
import P5 from "$lib/components/P5.svelte"

let sketch1 = `// deze parameter gaan we gebruiken om ervoor te zorgen dat de noise-waarden genoeg in mekaars buurt liggen.
let zoom = 0.1;

function setup() {
  createCanvas(600, 600);
  // we laden alle pixels in geheugen.
  loadPixels();
  noLoop();
}

function draw() {
  background(220);
  for (let x = 0 ; x < width; x++) {
    for (let y = 0 ; y < height; y++) {
// noise geeft getal tussen 0 en 1, dat we omzetten naar een grijswaarde tussen 0 en 255
// door de x en y waarden te vermendigvuldigen met de zoom-factor, heb je controle over hoe gevarieerd het landschap zal worden. Pas gerust de waarde eens aan en run opnieuw.
      let kleur = map(noise(x*zoom, y*zoom), 0,1, 0, 255);
      set(x, y, kleur);
    }
  }
  updatePixels();
   
}`

let sketch2 = `let zoom = 0.01;

let water;
let zand;
let gras;
let bos;

function setup() {
  colorMode(RGB);
  createCanvas(500, 500);
  zand = color(215, 192, 158);
  water = color(30, 176, 251);
  bos = color(2, 166, 155);
  gras = color(22, 181, 141);
  // we laden alle pixels in geheugen.
  loadPixels();
  noLoop();
}

function draw() {
  background(220);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // noise geeft getal tussen 0 en 1, dat we omzetten naar een grijswaarde tussen 0 en 255
      let kleur = noise(x * zoom, y * zoom);
      if (kleur < 0.3) {
        set(x, y, water);
      } else if (kleur < 0.4) {
        set(x, y, zand);
      } else if (kleur < 0.6) {
        set(x, y, gras);
      } else {
        set(x, y, bos);
      }
    }
  }
  updatePixels();
}`

let sketch3 = `let zoom = 0.01;

let water;
let zand;
let gras;
let bos;

function setup() {
  colorMode(RGB);
  createCanvas(500, 500);
  zand = color(215, 192, 158);
  water = color(30, 176, 251);
  bos = color(2, 166, 155);
  gras = color(22, 181, 141);
  // we laden alle pixels in geheugen.
  loadPixels();
}

function draw() {
  background(220);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // noise geeft getal tussen 0 en 1, dat we omzetten naar een grijswaarde tussen 0 en 255
      let kleur = noise(x * zoom, y * zoom - frameCount/ 50);
      if (kleur < 0.3) {
        set(x, y, water);
      } else if (kleur < 0.4) {
        set(x, y, zand);
      } else if (kleur < 0.6) {
        set(x, y, gras);
      } else {
        set(x, y, bos);
      }
    }
  }
  updatePixels();
}`


</script>

