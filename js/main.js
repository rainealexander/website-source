const gui = new dat.GUI();

const canvasFPS = 20;
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

const setupCanvas = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

setupCanvas();

// const waveform = {
//   y: canvas.height / 2,
//   length: -0.015,
//   amplitude: 100,
//   frequency: 0.015
// }

// const waveform2 = {
//   y: 0,
//   length: -0.016,
//   amplitude: 90,
//   frequency: -0.005
// }

function waveform() {
  this.y = randomInt(canvas.height / 2),
  this.length = randomInRange(-0.01, 0.016),
  this.amplitude = randomInRange(-120, 120),
  this.frequency = randomInRange(0, 0.012)
}

function linearFunction() {
  this.a = randomInRange(-10, 10),
  this.b = randomInRange(-2, 2),
  this.calcY = function(x) {
    return this.a + this.b  * x;
  }
}

let line1 = new linearFunction();
let line2 = new linearFunction();
let line3 = new linearFunction();

let waveform1 = new waveform();
let waveform2 = new waveform();
let waveform3 = new waveform();
console.log('waveform1: ',waveform1);
console.log('waveform2: ',waveform2);
console.log('waveform3: ',waveform3);

// add editable properties to dat.gui
// gui.add(waveform, 'y', canvas.height);
// gui.add(waveform, 'length', -0.05, 0.05);
// gui.add(waveform, 'amplitude', -400, 400);


let freqInterval = waveform1.frequency;
let freqInterval2 = waveform2.frequency;
let freqInterval3 = waveform3.frequency;
let yOffset = -100;
function animate () {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, line1.calcY(0)
    + Math.sin(0 * waveform1.length + freqInterval)
    * waveform1.amplitude + yOffset);
  //ctx.lineTo(canvas.width, canvas.height / 2);
  for (let i = 0; i < canvas.width + 1; i++) {
    ctx.lineTo(i, line1.calcY(i)
      + Math.sin(i * waveform1.length + freqInterval)
      * waveform1.amplitude + yOffset);
  }
  ctx.lineTo(canvas.width + 1, -1);
  ctx.lineTo(-1, -1);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fill();
  // ctx.stroke();
  freqInterval += waveform1.frequency;
  yOffset += 0.2;
  if (yOffset > canvas.height + 50) {
    yOffset = -200;
  }

  // waveform 2

  ctx.beginPath();
  ctx.moveTo(0, line2.calcY(0)
    + Math.sin(0 * waveform2.length + freqInterval2)
    * waveform2.amplitude + yOffset);
  //ctx.lineTo(canvas.width, canvas.height / 2);
  for (let i = 0; i < canvas.width + 1; i++) {
    ctx.lineTo(i, line2.calcY(i)
      + Math.sin(i * waveform2.length + freqInterval2)
      * waveform2.amplitude + yOffset);
  }
  ctx.lineTo(canvas.width + 1, -1);
  ctx.lineTo(-1, -1);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fill();
  // ctx.stroke();
  freqInterval2 += waveform2.frequency;
  yOffset += 0.5;
  if (yOffset > canvas.height + 50) {
    yOffset = -200;
  }

  // waveform 3
  // these need to go into an array soon
  // waveform 2

  ctx.beginPath();
  ctx.moveTo(0, line3.calcY(0)
    + Math.sin(0 * waveform3.length + freqInterval3)
    * waveform3.amplitude + yOffset);
  //ctx.lineTo(canvas.width, canvas.height / 2);
  for (let i = 0; i < canvas.width + 1; i++) {
    ctx.lineTo(i, line3.calcY(i)
      + Math.sin(i * waveform2.length + freqInterval3)
      * waveform3.amplitude + yOffset);
  }
  ctx.lineTo(canvas.width + 1, -1);
  ctx.lineTo(-1, -1);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fill();
  // ctx.stroke();
  freqInterval3 += waveform3.frequency;
  yOffset += 0.5;
  if (yOffset > canvas.height + 50) {
    yOffset = -200;
  }
}

animate();


const fpsInterval = (framesPerSecond) => {
  return Math.floor(1000 / framesPerSecond);
}

const drawBackground = () => {

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  //ctx.lineTo(canvas.width, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, canvas.height / 2
      + Math.sin(i * waveform.frequency) * waveform.amplitude);
  }
  ctx.stroke();



  return setInterval(() => {

  }, fpsInterval(canvasFPS));
};

let animationInterval = drawBackground();

window.addEventListener('resize', () => {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // stop animation
  clearInterval(animationInterval);

  // redraw canvas at new size
  setupCanvas();
  // animationInterval = drawBackground();
});

// radomization helper function
function randomInt(n) {
  return Math.floor(Math.random() * n);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// ----NOTES----
// linear function: y = f(x) = a + bx
