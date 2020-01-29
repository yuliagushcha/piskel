import {canvas} from '../canvas/canvasInit';

export const layer = document.querySelector('.layer');
function valueFPS() {
  const fpsValue = document.querySelector('.fpsValue');
  fpsValue.innerText = fpsRange.value;
}

export const fpsRange = document.querySelector('.fpsRange');
fpsRange.addEventListener("input", valueFPS);

// run the animation in Full screen mode
function toggleFullscreen() {
  const layerWrapper = document.querySelector('.layerWrap');
  if (!document.fullscreenElement) {
    layerWrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const layerBtn = document.querySelector('.fullScreenButton');
layerBtn.addEventListener('click', toggleFullscreen);

let indexImage = 0;
let timer;

export function animationSpeed() {
  if(fpsRange.value == 0) return;
  let speed = 1000 / fpsRange.value;
  return speed;
}

export function animationBackground() {
  let speed = animationSpeed();
  const framesCanvas = document.querySelectorAll('.canvas2');
  const ctxLayer = layer.getContext('2d');
  ctxLayer.clearRect(0, 0, layer.width, layer.height);
  ctxLayer.drawImage(framesCanvas[indexImage = ++indexImage % framesCanvas.length], 0, 0);
  const canvasTemp = document.querySelectorAll('.canvas-temp');
  for(let i = 0; i < canvasTemp.length; i++) {
    ctxLayer.drawImage(canvasTemp[i], 0, 0);
  }
  if (timer) {
    clearInterval(timer);
  }
  timer = setTimeout(animationBackground, speed);
  if(fpsRange.value == 0) {
    clearInterval(timer);
  }
}

canvas.addEventListener('mouseup', animationBackground);
fpsRange.addEventListener("input", animationBackground);
