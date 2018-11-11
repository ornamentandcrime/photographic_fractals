
var origX = 0.5;
var origXInput;
var origY = 1;
var origYInput;

var axiom;
var sentence;
var restartButton;
var saveButton;
var canvas

var lblAngle;

var angleDeg;
var angleRad;
var angleInput;

var genN;
var turtleCount;

var lblAxiom;
var axiomInput;

var lblTransform = [];
var transformBox = [];


var lengthInput;
var startLength = 230;
var len = startLength;
var dimLength = 0.5; // decrement of step length n+1
var dimLenInput;

var transp = 255;
var dimTransp = 0.85;
var dimTranspInput;

var lblLog;
var lblBlank;

var rules = [];

var font;
var fontsize = 10;

var photo;


// BRANCHING STRUCTURES
// --- A ---
// angleDeg = 25.7;
// axiom = "F";
// rules[0] = {
//   a: "F",
//   b: "F[+F]F[-F]F"
// }
// *********************


// BRANCHING STRUCTURES
// --- B ---
// angleDeg = 20;
// axiom = "F";
// rules[0] = {
//   a: "F",
//   b: "F[+F]F[-F][F]"
// }
// *********************


// BRANCHING STRUCTURES
// --- C ---
// angleDeg = 22.5;
// axiom = "F";
// rules[0] = {
//   a: "F",
//   b: "FF-[-F+F+F]+[+F-F-F]"
// }
// *********************


// BRANCHING STRUCTURES
// --- D ---
// angleDeg = 20;
// axiom = "X";
// rules[0] = {
//   a: "F",
//   b: "FF"
// }
// rules[1] = {
//   a: "X",
//   b: "F[+X]F[-X]+X"
// }
// *********************


// BRANCHING STRUCTURES
// --- E ---
// angleDeg = 25.7;
// axiom = "X";
// rules[0] = {
//   a: "F",
//   b: "FF"
// }
// rules[1] = {
//   a: "X",
//   b: "F[+X]F[-X]FX"
// }
// *********************


// BRANCHING STRUCTURES
// --- F ---
// angleDeg = 20;
// axiom = "X";
// rules[0] = {
//   a: "F",
//   b: "FF"
// }
// rules[1] = {
//   a: "X",
//   b: "F-[[X]+X]+F[+FX]-X"
// }
// *********************


// QUADRATIC KOCH ISLAND
// ---------
angleDeg = 90;
axiom = "F-F-F-F";  
rules[0] = {
  a: "F",
  b: "F-F+F+FF-F-F+F"
}

//  ***************************************************************************

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  // font = loadFont('Opus Chords.otf');

  // load background image
  photo = loadImage('images/L1007083.jpg');


}



function generate() {
  len *= dimLength;
  transp *= dimTransp;


  if (len > 3) {
    var nextSentence = "";
    genN += 1;
    turtleCount.html("🐢", true);

    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);
      var found = false;
      for (var j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          nextSentence += rules[j].b;
          found = true;
          break;

        }
      }
      if (!found) {
        nextSentence += current;
      }


    }

    sentence = nextSentence;
    createP(sentence);
    turtle();
  }
}

function turtle() {
  // background(0);
  origX = origXInput.value();
  origY = origYInput.value();

  translate(floor(width * origX), floor(height * origY));

  for (var i = 0; i < sentence.length; i++) {
    var n = 0.0
    var current = sentence.charAt(i);
    if (current == "F") {
      n = noise(i);
      stroke(n * 255, 255 - n * 200, random(100), transp);
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "f") {
      translate(0, -len);
    } else if (current == "+") {
      rotate(-angleRad);
    } else if (current == "-") {
      rotate(angleRad);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function initFractal() {
  background(25);
  image(photo, 0, 0, width, height);

  angleDeg = angleInput.value();
  angleRad = radians(angleDeg);
  startLength = lengthInput.value();
  len = startLength;
  dimLength = dimLenInput.value();
  dimTransp = dimTranspInput.value();

  transp = 255;

  axiom = axiomInput.value();
  sentence = axiom;
  for (var i = 0; i < rules.length; i++) {
    rules[i].b = transformBox[i].value();
    createP(transformBox[i].value());
  }


  createP(axiom);
  turtle();
  genN = 0;
  turtleCount.html("L-System Fractal Tree ");

}


function setup() {

  canvas = createCanvas(photo.width / 2, photo.height / 2);
  canvas.parent('canvasp');
  canvas.mousePressed(generate);

  turtleCount = select('#turtles');
  turtleCount.html("L-System Fractal Tree ");

  origXInput = select('#origX');
  origXInput.value(origX);
  origYInput = select('#origY');
  origYInput.value(origY);

  angleInput = select('#rotAngle');
  angleInput.value(angleDeg);

  lengthInput = select('#Length');
  lengthInput.value(startLength);
  dimLenInput = select("#dimLength");
  dimLenInput.value(dimLength);
  dimTranspInput = select("#dimTransp");
  dimTranspInput.value(dimTransp);

  axiomInput = select('#axiom');
  axiomInput.value(axiom);

  for (var i = 0; i < rules.length; i++) {
    lblTransform[i] = createElement("label", "p" + (i + 1) + ": " + rules[i].a + " → ");
    lblTransform[i].parent("navLeft");
    transformBox[i] = createInput(rules[i].b);
    transformBox[i].parent("navLeft");
  }

  lblBlank = createElement("label", " ");
  lblBlank.parent("navLeft");

  restartButton = createButton("Re-initialise Model");
  restartButton.parent("navLeft");
  restartButton.mousePressed(initFractal);

  lblBlank = createElement("label", " ");
  lblBlank.parent("navLeft");

  saveButton = createButton("Save Image");
  saveButton.parent("navLeft");
  saveButton.mousePressed(saveImage);

  background(25);
  angleRad = radians(angleDeg);

  initFractal();
}



function saveImage() {
  var txtSpace = "     ";
  var txtLeft = "";
  var txtRight = "";

  textSize(fontsize);
  // fill(255);
  fill(0,200,0);

  textAlign(LEFT);
  txtLeft = "n: " + genN + txtSpace;
  txtLeft += "δ: " + angleDeg + "º" + txtSpace;
  txtLeft += "ω: " + axiom + txtSpace;
  txtLeft += "d: " + startLength + txtSpace;
  text(txtLeft, 20, height - fontsize - 5);

  textAlign(RIGHT);
  for (var i = 0; i < rules.length; i++) {
    txtRight += txtSpace + "p" + (i + 1) + ": " + rules[i].a + " → " + rules[i].b;
  }
  text(txtRight, width - 20, height - fontsize - 5);

  saveCanvas(canvas, 'fractal', 'jpg');

}

function draw() {

  // background(220);

}