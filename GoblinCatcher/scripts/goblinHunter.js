// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

// Goblin image
var goblinReady = false;
var goblinImage = new Image();
goblinImage.onload = function () {
  goblinReady = true;
};
goblinImage.src = "images/goblin.png";

// Game objects
var hero = {
  speed: 200 //movement in pixels per second
};
var goblin = {};
var goblinsCaught = 0;

// Keyboard controls
var keydowns = {};
addEventListener("keydown", function (e) {
  keydowns[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
  delete keydowns[e.keyCode];
}, false);

// Reset when hero catches goblin
var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  goblin.x = 32 + (Math.random() * (canvas.width - 64));
  goblin.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
  if (38 in keydowns) { // user pressing up
    if (!(hero.y < 0)) {
      hero.y -= hero.speed * modifier;
    }
  }
  if (40 in keydowns) { // user pressing down
    if (!(hero.y > (canvas.height - 32))) {
      hero.y += hero.speed * modifier;
    }
  }
  if (37 in keydowns) { // user pressing left
    if (!(hero.x < 0)) {
      hero.x -= hero.speed * modifier;
    }
  }
  if (39 in keydowns) { // user pressing right
    if (!(hero.x > (canvas.width - 32))) {
      hero.x += hero.speed * modifier;
    }
  }
  // Hero catches monster on collision
  if (
    hero.x <= (goblin.x + 32)
    && goblin.x <= (hero.x + 32)
    && hero.y <= (goblin.y + 32)
    && goblin.y <= (hero.y + 32)
  ) {
    ++goblinsCaught;
    reset();
  }
};

// Draw images and score
var render = function () {
  if (bgReady) {
    context.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    context.drawImage(heroImage, hero.x, hero.y);
  }
  if (goblinReady) {
    context.drawImage(goblinImage, goblin.x, goblin.y);
  }
  context.fillStyle = "rgb(250, 250, 250)";
  context.font = "24px Helvetica";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("Goblins caught: " + goblinsCaught, 32, 32);
};

// Main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;
  update(delta / 1000);
  render();
  then = now;
  requestAnimationFrame(main);
};

// Cross browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.mozRequestAnimationFrame;

// Start game
var then = Date.now();
reset();
main();
