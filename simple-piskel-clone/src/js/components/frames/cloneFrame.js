import {frameNumber, frameStyle, parent} from './activeFrame';
import {animationBackground} from './speedRange';

function cloneFrame(event) {
  if (event.target.classList.contains('copy')) {
    const clone = event.target.parentNode.parentNode.cloneNode(true);
    const parentNode = event.target.parentNode.parentNode;
    const canvasParentNode = event.target.parentNode.querySelector('canvas');
    const canvasCloneElem = clone.querySelector('canvas');
    const ctxCloneElem = canvasCloneElem.getContext('2d');
    ctxCloneElem.drawImage(canvasParentNode, 0, 0);
    parent.insertBefore(clone, parentNode);
    frameNumber();
    animationBackground();
    frameStyle();
  }
}
parent.addEventListener("click", cloneFrame);

