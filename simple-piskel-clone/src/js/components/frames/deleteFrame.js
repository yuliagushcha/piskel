import {frameNumber, frameStyle, parent} from './activeFrame';
import {canvas, ctx} from '../canvas/canvasInit';
import {animationBackground} from './speedRange';

function deleteFrame(event) {
  if (event.target.classList.contains('delete') && parent.children.length > 1) {
    if(event.target.parentNode.classList.contains('activeLayer')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    event.target.parentNode.parentNode.remove();
    frameNumber();
    animationBackground();
    frameStyle();
  }
}

parent.addEventListener("click", deleteFrame);
