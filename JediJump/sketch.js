let soundClassifier;
let pewpewImg;
let stormTrooperImg;
let jediImg;
let pewpews = [];
let stormTrooper;
let jedi;
let count;
let gameOver;

function preload() {
  const options = { probabilityThreshold: 0.85 };
  //soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  pewpewImg = loadImage('pewpew.png');
  stormTrooperImg = loadImage('stormTrooper.png');
  jediImg = loadImage('jedi.png');
  gameOver = loadImage('gameOver.png');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth - 100, windowHeight - 100);
  frameRate(30);
  stormTrooper = new StormTrooper();
  jedi = new Jedi();
  count = 0;
  //soundClassifier.classify(gotCommand);
}

function gotCommand(error, result) {
  if (error) {
    console.error(error);
  }
  if (result[0].label == 'up') {
    jedi.jump();
  }
}

function keyPressed() {
  if (key == ' ') {
    jedi.jump();
  }
}

function draw() {
  // put drawing code here
  count--;
  if (random(1) < 0.2) {
    if (count <= 0) {
      pewpews.push(new PewPew());
      count = 35;
    }
  }
  background(200);
  for (let pewpew of pewpews) {
    pewpew.move();
    pewpew.show();
    if (jedi.hits(pewpew)) {
      console.log('game over');
      image(gameOver, 0, 0, width, height);
      noLoop();
      return;
    }
  }
  stormTrooper.show();
  jedi.show();
  jedi.move();
}
