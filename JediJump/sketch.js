let jediImg;
let stormTrooperImg;
let jedi;

function preload() {
  jediImg = loadImage('luke.jpg');
  stormTrooperImg = loadImage('stormTrooper.png');
}

function setup() {
  // put setup code here
  createCanvas(850, 450);
  jedi = new Jedi();
}

function keyPressed() {
  if (key == ' ') {
    jedi.jump();
  }
}

function draw() {
  // put drawing code here
  background(200);
  jedi.show();
  jedi.move();
}
