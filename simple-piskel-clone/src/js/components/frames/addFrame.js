import {frameNumber, frameStyle, parent} from './activeFrame';
import {canvas, ctx} from '../canvas/canvasInit';

export function addFrame() {
  const elem = parent.querySelector('.gifLayersContainer');
  const clone = elem.cloneNode(true);
  parent.appendChild(clone);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameNumber();
  frameStyle();
}

export const addFrameButton = document.querySelector('.addFrame');
addFrameButton.addEventListener("click", addFrame);
