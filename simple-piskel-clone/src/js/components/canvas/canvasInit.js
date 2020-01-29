import {boxSize} from './toolSize';

export const canvas = document.querySelector('.activeCanvas');
export const ctx = canvas.getContext('2d');
export let isDrawing = false;
export let x1, y1;

function resizeCanvas() {
  const resizeInput = document.getElementsByName('resize');
  let sizeCanvas;

  resizeInput.forEach(resize => {
    if (resize.checked) {
      sizeCanvas = resize.value;
    }
  });

  return sizeCanvas;
}

export function setSizeCanvas() {
  const newCanvas = document.createElement('canvas');
  const ctxTemp = newCanvas.getContext('2d');
  const canvas2All = document.querySelectorAll('.canvas2');
  const sizeCanvas = resizeCanvas();
  const deltaSize = (sizeCanvas - canvas.width) / 2;

  ctxTemp.drawImage(canvas, 0, 0);
  canvas.width = canvas.height = sizeCanvas;
  ctx.drawImage(newCanvas, deltaSize, deltaSize);

  canvas2All.forEach(canvas2 => {
    ctxTemp.drawImage(canvas2, 0, 0);
    canvas2.width = canvas2.height = sizeCanvas;
    const ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(newCanvas, deltaSize, deltaSize);
  });

  const layer = document.querySelector('.layer');
  layer.width = layer.height = sizeCanvas;
}

function showCanvasSize() {
  const showSize = document.querySelector('.canvasSize span');
  let sizeCanvas = resizeCanvas();
  showSize.innerText = `[${sizeCanvas}x${sizeCanvas}]`;
}

const resizeInput = document.getElementsByName('resize');
resizeInput.forEach(input => input.addEventListener("click", setSizeCanvas));
resizeInput.forEach(input => input.addEventListener("click", showCanvasSize));

export function scale() {
  let pos = canvas.offsetWidth / canvas.width;
  return pos;
}

canvas.addEventListener('mousemove', () => {
  let size = boxSize();
  x1 = Math.floor(event.offsetX / scale() / size) * size;
  y1 = Math.floor(event.offsetY / scale() / size) * size;
});

function showCoordinates() {
  const showCoordinates = document.querySelector('.coord span');
  showCoordinates.parentNode.style.opacity = '1';
  showCoordinates.innerText = `${x1}:${y1}`;
  canvas.addEventListener('mouseleave', () => showCoordinates.parentNode.style.opacity = '0');
}

canvas.addEventListener('mousemove', showCoordinates);
canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.parentNode.addEventListener('mouseleave', () => {
  isDrawing = false;
});


