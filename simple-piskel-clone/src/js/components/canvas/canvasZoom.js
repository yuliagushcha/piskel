import {canvas} from './canvasInit';

function mouseWheelHandler(e) {
  e = window.event;
  let delta = Math.max(-1, Math.min(1, e.wheelDelta));
  canvas.style.width = Math.max(32, Math.min(1000, canvas.offsetWidth + (32 * delta))) + "px";
  canvas.style.height = Math.max(32, Math.min(1000, canvas.offsetHeight + (32 * delta))) + "px";
  return false;
}

const canvasContainer = document.querySelector('.canvasContainer');
canvasContainer.addEventListener('mousewheel', mouseWheelHandler);
canvas.addEventListener('mousewheel', mouseWheelHandler);
