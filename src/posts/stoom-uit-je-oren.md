---
title: "Er komt stoom uit je oren!"
date: "2024-03-09"
tags: ['artificiële intelligentie', 'installatie', 'interactieve kunst', 'tutorial', 'ml5js', 'p5js']
image: "stoom-uit-oren.png"
description: "Gebruik een AI-model om lichaamshoudingen te herkennen"
draft: false
---
In een [vorige post](/posts/rook-simulatie) zag je hoe je een rooksimulatie kunt maken. In deze post gaan we daarop verderwerken: we gaan het spreekwoord "_er komt stoom uit zijn oren_" even heel letterlijk nemen :) We gaan daarvoor een AI-model gebruiken om beelden gemaakt met onze webcam te herkennen.

<!--more-->
## Posenet - herkennen van lichaamshoudingen
Uit het artikeltje over de rooksimulatie weten we hoe we rook kunnen laten opstijgen. In dat artikel lieten we die rook opstijgen vanaf de plaats waar je met de muis klikte. Dat gaan we wat moeten aanpassen: we willen immers de rook laten vertrekken vanaf de oren. Daartoe zullen we gebruik moeten maken van een webcam en van een AI-model dat houdingen van een lichaam kan herkennen. Gelukkig moeten we dat laatste niet zelf bouwen: er is een model _Posenet_ dat op basis van een foto 17 verschillende onderdelen van een lichaam kan herkennen. Denk aan dingen zoals neus, oren, linkerschouder, enz. Kijk zeker eens naar [dit artikel](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) voor wat extra uitleg. 

Gelukkig moeten we niet teveel dingen afweten van machine learning om dit model te kunnen gebruiken. Er bestaat een makkelijk te gebruiken bibliotheek (ml5.js)[https://learn.ml5js.org/#/] die het simpel maakt om dit AI-model te gebruiken.

## Aan de slag
Het eerste wat we moeten doen, is de webcam gebruiken in onze sketch. In p5js is kan dat gemakkelijk met de ```createCapture()```-functie. Die kan de beelden van je webcam vastpakken en je daarop laten werken. Hieronder zie je een sketch die het webcam beeld capteert en tekent op een canvas. __Let op__: je zal een popup krijgen die je vraagt of de webpagina je camera mag gebruiken. Hierop antwoord je best met ok, anders gaat het niet werken. Dat is een beveiling die deel uitmaakt van alle browsers.

<P5 code={sketch1} />

## En nu een sprankeltje AI erbij.
We gaan nu de ml5js bibliotheek mee laden in onze sketch. Als je deze tutorials zelf volgt binnen de editor op de p5js site, zal je in de ```index.html``` file van je project een extra lijntje moeten toevoegen binnen de ```<head>```tag. Dat gaat er zo ongeveer moeten uitzien (let vooral op de 2e ```<script>``` tag).

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
  <script src="https://unpkg.com/ml5@1/dist/ml5.min.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <meta charset="utf-8" />
</head>
<body>
  <script src="sketch.js"></script>
</body>
</html>
```

De volgende sketch toont hoe je die ml5js bibliotheek kan gebruiken. Het PoseNet AI model verwacht een beeld als input, en geeft als output een lijst van _poses_. Een _pose_ is een object dat een lichaamshouding weergeeft. PoseNet beschrijft een lichaamshouding aan de hand van 17 punten, zoals de neus, linkeroor, rechteroor, linker- en rechterschouder, enz. Voor elk van deze punten geeft PoseNet de coordinaten en een score tussen 0 en 1 om aan te gegven hoe waarschijnlijk het is dat dit punt ook daadwerkelijk klopt. 

<Image image={{fileName: 'https://docs.ml5js.org/assets/BodyPose-MoveNet-Keypoints.png', title: 'Overzicht van de 17 PoseNet keypoints' }} />



<P5 code={sketch2} htmlPage="ml5.html" />

## Stoom uit je oren.
Wohaa, hoe cool is dit allemaal? Dat is toch echt wel al knap, niet? Nu gaan we nog een stapje verder. We gaan de code uit onze rooksimulator mee in deze sketch copiëren, en in de plaats van die cickeltjes op de oren te plakken, laten we de rook vertrekken vanop die plaats. Je zal zien dat ik ook zijwind heb ingevoerd, dit om de rook wat meer in naar links en rechts te laten gaan. Door er een klein beetje random aan toe te voegen, geeft dat ook nog een extra organisch effect. Ik varieer ook de kleur van de individuele rookdeeltjes wat, zodat de rookwolk nog wat echter is.


<P5 code={sketch3} htmlPage="ml5.html" />

## Conclusie
In dit artikel hebben we artificiële intelligentie gebruikt om stoom uit onze oren te laten komen. Dat bleek eigenlijk niet eens zo moeilijk, als je het juiste AI model weet te gebruiken. Je zou hier nog op kunnen verder bouwen door bijvoorbeeld een grote kauwgombel te laten verschijnen en knappen, of door een sikje op het gezicht te plakken. Je zou ook een ander AI model kunnen gebruiken dat nog meer punten op het lichaam kan herkennen. De mogelijkheden zijn eindeloos. Veel plezier ermee!!

<script lang="ts">
import P5 from "$lib/components/P5.svelte"
import Image from "$lib/components/Image.svelte"

let sketch1 = `let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0);
}`

let sketch2 = `let video;
let pose;
let bodyPose;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function gotPoses(poses) {
  // poseNet kan poses van meerdere mensen op een beeld herkennen. We gebruiken enkel de eerste persoon
  if (poses.length > 0) {
    pose = poses[0];
  }
}

function draw() {
  image(video, 0, 0);
    if (pose) {

    let linkerOor = pose.left_ear;
    let rechterOor = pose.right_ear;
    fill('green');
    circle(linkerOor.x, linkerOor.y, 50);
    fill('blue');
    circle(rechterOor.x, rechterOor.y, 50);
    }
}`

let sketch3 = `let video;
let pose;
let bodyPose;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

class Deeltje {
  constructor(x, y, zijwind) {
    this.x = x;
    this.y = y;
    this.vy = -2;
    this.vx = zijwind + random(-0.5, 0.5);
    this.kleur = random(200,230);
    this.alpha = 255;
    this.straal = 5;
  }
  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.alpha -= 3;
    this.straal += 1;
  }
  show() {
    noStroke();
    fill(this.kleur, this.alpha);
    ellipse(this.x, this.y, this.straal);
  }
}

function setup() {
  createCanvas(640, 480);
  deeltjes = [];
  video = createCapture(VIDEO);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function gotPoses(poses) {
  // poseNet kan poses van meerdere mensen op een beeld herkennen. We gebruiken enkel de eerste persoon
  if (poses.length > 0) {
    pose = poses[0];
  }
}

function draw() {
  background(0);
  image(video, 0, 0);

  if (pose) {
    let linkerOor = pose.left_ear;
    let rechterOor = pose.right_ear;
    let deeltje = new Deeltje(linkerOor.x, linkerOor.y, 1);
    deeltjes.push(deeltje);
    deeltje = new Deeltje(rechterOor.x, rechterOor.y, -1);
    deeltjes.push(deeltje);
  }
  for (i = 0; i < deeltjes.length; i++) {
    deeltjes[i].show();
    deeltjes[i].update();
  }
}`
 </script>