let canvas = document.getElementById('background');
let ctx = canvas.getContext('2d');

let setupCanvas = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

setupCanvas();