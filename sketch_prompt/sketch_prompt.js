// Global variables
var scale = 0.5;
var modelName;
var model;

// Create the canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
document.body.appendChild(canvas);

// Track pen status
var pen;
var x, y;
var r, g, b;
var color;

// Cross browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.mozRequestAnimationFrame;

// Draw models
function drawPath(strokePath) {
  console.log('dx: ' + strokePath.dx);
  console.log('dy: ' + strokePath.dy);
  console.log('pen: ' + strokePath.pen);
  if (pen == 'down') {
    context.beginPath();
    context.lineWidth = '2';
    context.strokeStyle = color;
    context.moveTo(x, y);
    context.lineTo(strokePath.dx * scale + x, strokePath.dy * scale + y);
    context.stroke();
  } else if (pen == 'up') {
    context.beginPath();
    context.lineWidth = '2';
    context.strokeStyle = 'rgba(0, 0, 0, 0)';
    context.moveTo(x, y);
    context.lineTo(strokePath.dx * scale + x, strokePath.dy * scale + y);
    context.stroke();
  }
  x += strokePath.dx * scale;
  y += strokePath.dy * scale;
  pen = strokePath.pen;
  if (pen != 'end') {
    requestAnimationFrame(main);
  } else {
    getModel(prompt('What do you want to draw? (Enter \'done\' to exit)'));
  }
}

// Handle sketch results
function getSketch(error, result) {
  if (error) {
    console.error(error);
    alert('Unable to draw ' + modelName + '.');
    getModel(prompt('What do you want to draw? (Enter \'done\' to exit)'));
    return;
  }
  drawPath(result);
}

// Model is ready
function modelReady() {
  pen = 'down'
  x = 75 + (Math.random() * (canvas.width - 150));
  y = 75 + (Math.random() * (canvas.height - 150));
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
  color = 'rgba(' + r + ',' + g + ',' + b + ',1)';
  model.reset();
  requestAnimationFrame(main);
}

// Create a new SketchRNN instance
function getModel(m) {
  modelName = m.toLowerCase();
  if (modelName == 'done') {
    return;
  }
  model = ml5.sketchRNN(modelName.split(' ').join('_'), modelReady);
}

// Main drawing loop
function main() {
  model.generate(getSketch);
}

getModel(prompt('What do you want to draw?'));
