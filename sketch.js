var axiom = "FX";
var sentence = axiom;
var restartButton;
var saveButton;
var canvas

var lblAngle;
var angleDeg = 45;
var angleRad;
var angleBox;

var genN;

var lblAxiom;
var axiomBox;

var lblTransform = [];
var transformBox = [];

var lblLength;
var lengthBox;
var startLength = 230;
var len = startLength;

var transp = 255;

var lblLog;
var lblBlank;

var rules = [];

var font;
var fontsize = 10;

var photo;

rules[0] = {
  a: "F",
  // b: "FF+[+F-F--F+F]-[-F+F+F--F]"
  b: "FF"
  // b: "FF+[+FF-F--F+F]-[-F+F+F--F]"
}

rules[1] = {
  a: "X",

  // b: "F-[[X]+X]+F[+FX]-X"
  b: "F+[[X]-X]-F[-FX]+X"
}

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  // font = loadFont('Opus Chords.otf');

  // load image
  photo = loadImage('images/volker_ketteniss_007.jpg');


}



function generate() {
  len *= 0.5;
  transp *= 0.85;


  if (len > 3) {
    var nextSentence = "";
    genN += 1;
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
  translate(width / 2, height);

  for (var i = 0; i < sentence.length; i++) {
    var n = 0.0
    var current = sentence.charAt(i);
    if (current == "F") {
      n = noise(i);
      stroke(n * 255, 255 - n * 200, random(100), transp);
      line(0, 0, 0, -len);
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

  angleDeg = angleBox.value();
  angleRad = radians(angleDeg);
  startLength = lengthBox.value();
  len = startLength;

  transp = 255;

  axiom = axiomBox.value();
  sentence = axiom;
  for (var i = 0; i < rules.length; i++) {
    rules[i].b = transformBox[i].value();
    createP(transformBox[i].value());
  }


  createP(axiom);
  turtle();
  genN = 0;

}


function setup() {

  canvas = createCanvas(photo.width / 2, photo.height / 2);
  canvas.parent('canvasp');
  canvas.mousePressed(generate);

  lblAngle = createP("Angle δ:");
  lblAngle.parent("navLeft");
  angleBox = createInput(angleDeg);
  angleBox.parent('navLeft');

  lblLength = createP("Start Length:");
  lblLength.parent("navLeft");
  lengthBox = createInput(startLength);
  lengthBox.parent("navLeft");

  lblAxiom = createP("Axiom ω:");
  lblAxiom.parent("navLeft");
  axiomBox = createInput(axiom);
  axiomBox.parent("navLeft");

  for (var i = 0; i < rules.length; i++) {
    lblTransform[i] = createP("p" + (i + 1) + ": " + rules[i].a + " → ");
    lblTransform[i].parent("navLeft");
    transformBox[i] = createInput(rules[i].b);
    transformBox[i].parent("navLeft");
  }

  lblBlank = createP(" ");
  lblBlank.parent("navLeft");

  restartButton = createButton("Re-initialise Model");
  restartButton.parent("navLeft");
  restartButton.style('font-size', '16px');
  restartButton.mousePressed(initFractal);

  lblBlank = createP(" ");
  lblBlank.parent("navLeft");
  lblBlank = createP(" ");
  lblBlank.parent("navLeft");

  saveButton = createButton("Save Image");
  saveButton.parent("navLeft");
  saveButton.style('font-size', '16px');
  saveButton.mousePressed(saveImage);
  // saveButton.width()

  background(25);
  angleRad = radians(angleDeg);

  initFractal();
}

// function updateLength() {
//   startLength = lengthBox.value();
// }


function saveImage() {
  var txtSpace = "     ";
  var txtLeft = "";
  var txtRight = "";

  // textFont(font);
  textSize(fontsize);
  fill(255);

  textAlign(LEFT);
  txtLeft = "n: " + genN + txtSpace;
  txtLeft += "δ: " + angleDeg + "º" + txtSpace;
  txtLeft += "ω: " + axiom + txtSpace;
  txtLeft += "l: " + startLength + txtSpace;
  text(txtLeft, 20, height - fontsize - 5);

  // text("n: " + genN + "     δ: " + angleDeg + "º     " + "ω: " + axiom + "     l: " + startLength, 20, height - fontsize - 5);

  textAlign(RIGHT);
  for (var i = 0; i < rules.length; i++) {
    txtRight += txtSpace + "p" + (i + 1) + ": " + rules[i].a + " → " + rules[i].b;
  }
  text(txtRight, width - 20, height - fontsize - 5);

  // text("p: F → " + rules[0].b, width - 20, height - fontsize - 5)

  saveCanvas(canvas, 'fractal', 'jpg');

}

function draw() {

  // background(220);

}