const gui = new dat.GUI();

const canvasFPS = 20;
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

const setupCanvas = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

setupCanvas();

const waveform = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const linearFunction = {
  a: canvas.width * 0.25,
  b: 0.5,
  calcY: function(x) {
    return this.a + this.b  * x;
  }
}

// add editable properties to dat.gui
gui.add(waveform, 'y', canvas.height);
gui.add(waveform, 'length', -0.05, 0.05);
gui.add(waveform, 'amplitude', -400, 400);

let freqInterval = waveform.frequency;
function animate () {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, linearFunction.calcY(0)
    + Math.sin(0 * waveform.length + freqInterval)
    * waveform.amplitude);
  //ctx.lineTo(canvas.width, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, linearFunction.calcY(i)
      + Math.sin(i * waveform.length + freqInterval)
      * waveform.amplitude);
  }
  ctx.stroke();
  freqInterval += waveform.frequency;
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

// ----NOTES----
// linear function: y = f(x) = a + bx
