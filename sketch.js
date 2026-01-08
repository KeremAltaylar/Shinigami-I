var inc = fxrandRange(0.7, 30, 0.1);
var scl = fxrandRange(20, 150, 1);
var magv = fxrandRange(0.1, 1, 0.1);
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var particles2 = [];
var flowfield;
var magv;
var cr = fxrandRange(70, 155, 1);
//var cg = random(0, 255);
var cg = fxrandRange(20, 50, 1);
var cb = fxrandRange(80, 100, 1);
var fr = fxrandRange(70, 155, 1);
//var cg = random(0, 255);
var fg = fxrandRange(10, 150, 1);
var fb = fxrandRange(10, 100, 1);
var sh = fxrandRange(10, 300, 1);
var sw = fxrandRange(10, 300, 1);
var conscol = 100;
var indexk = 0;
var baseCount1 = 1000;
var baseCount2 = 1000;
var initialArea;
var baseMagv;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  initialArea = windowWidth * windowHeight;
  baseMagv = magv;
  fr = createP("");
  flowfield = new Array(cols * rows);
  particles = [];
  for (i = 0; i < baseCount1; i++) {
    particles[i] = new Particle(
      cr - i / conscol,
      cb - i / conscol,
      cg - i / conscol,
      (fxrand() * windowWidth) / 2,
      (fxrand() * windowHeight) / 2,
      0.1
    );
  }
  particles2 = [];
  for (i = 0; i < baseCount2; i++) {
    particles2[i] = new Particle2(
      fr,
      fb,
      fg,
      (fxrand() * windowWidth) / 2,
      (fxrand() * windowHeight) / 2,
      0.1
    );
  }
  background(255);
}

function draw() {
  if (indexk > 600) {
    noLoop();
  }
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = xoff * yoff;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      xoff += inc;
      stroke(0, 130);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(0.1);
      // line(0, 0, scl, 0);
      // pop(); //fill(r);

      //rect(scl * x, scl * y, scl, scl);
    }
    yoff += inc;
    zoff += 0.0008;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  for (var i = 0; i < particles2.length; i++) {
    particles2[i].follow(flowfield);
    particles2[i].update();
    particles2[i].edges();
    particles2[i].show();
  }
  // push();
  // rectMode(RADIUS);
  // fill(255, 1 * sin(millis() * 1000));
  // noStroke();
  // rect(
  //   windowWidth / 2,
  //   windowHeight / 2,
  //   windowWidth / 2 - 30,
  //   windowHeight / 2 - 30
  // );
  // pop();
  indexk = indexk + 1;
  //console.log(indexk);
  // push();
  // fill(255);
  // noStroke();
  // ellipse(windowWidth / 2, windowHeight / 2, sw, sh);
  // pop();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  var newArea = windowWidth * windowHeight;
  var factor = newArea / initialArea;
  if (factor < 1) factor = 1;
  var speedScale = Math.sqrt(factor);
  magv = baseMagv * speedScale;

  var count1 = Math.min(Math.floor(baseCount1 * factor), 4000);
  var count2 = Math.min(Math.floor(baseCount2 * factor), 4000);

  particles = [];
  for (i = 0; i < count1; i++) {
    particles[i] = new Particle(
      cr - i / conscol,
      cb - i / conscol,
      cg - i / conscol,
      fxrand() * windowWidth,
      fxrand() * windowHeight
    );
    particles[i].maxspeed = 4 * speedScale;
  }
  background(255);
  particles2 = [];
  for (i = 0; i < count2; i++) {
    particles2[i] = new Particle2(
      fr,
      fb,
      fg,
      fxrand() * windowWidth,
      fxrand() * windowHeight,
      0.1
    );
    particles2[i].maxspeed = 1 * speedScale;
  }
  indexk = 0;
  loop();
}

function fxrandRange(min, max, step) {
  value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

window.$fxhashFeatures = {
  "Red Value": cr,
  "Green Value": cg,
  "Flow Magnitude": magv,
  "Blue Value": cb,
  "Flow Increase": inc,
  "Cell Scale": scl,
 };

function mousePressed() {
  indexk = 0;
  background(255);
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  flowfield = new Array(cols * rows);
  var newArea = windowWidth * windowHeight;
  var factor = newArea / initialArea;
  if (factor < 1) factor = 1;
  var speedScale = Math.sqrt(factor);
  magv = baseMagv * speedScale;
  var count1 = Math.min(Math.floor(baseCount1 * factor), 4000);
  var count2 = Math.min(Math.floor(baseCount2 * factor), 4000);
  particles = [];
  for (i = 0; i < count1; i++) {
    particles[i] = new Particle(
      cr - i / conscol,
      cb - i / conscol,
      cg - i / conscol,
      (fxrand() * windowWidth) / 2,
      (fxrand() * windowHeight) / 2,
      0.1
    );
    particles[i].maxspeed = 4 * speedScale;
  }
  particles2 = [];
  for (i = 0; i < count2; i++) {
    particles2[i] = new Particle2(
      fr,
      fb,
      fg,
      (fxrand() * windowWidth) / 2,
      (fxrand() * windowHeight) / 2,
      0.1
    );
    particles2[i].maxspeed = 1 * speedScale;
  }
  loop();
}
