const options = { probabilityThreshold: 0.95 };
const soundClassifier = ml5.soundClassifier('SpeechCommands18w',
  options, getCommand);
var outputElement = document.createElement("output");

function getCommand() {
  document.body.appendChild(outputElement);
  soundClassifier.classify(getResult);
}

function getResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  outputElement.innerHTML = result[0].label;
}
