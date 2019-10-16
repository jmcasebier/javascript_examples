// Create a new SketchRNN instance
const model = ml5.sketchRNN('cat', modelReady);
const scale = 0.25;
var count = 100;

// Create the canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 120;
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
    count--;
    if (count > 0) {
      modelReady();
    } else {
      var br = document.createElement('br');
      document.body.appendChild(br);
      var output = document.createElement('code');
      output.innerHTML = 'drawing complete';
      document.body.appendChild(output);
    }
  }
}

// Handle sketch results
function getSketch(error, result) {
  if (error) {
    console.error(error);
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

// Main drawing loop
function main() {
  model.generate(getSketch);
}
