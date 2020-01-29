import {activeColor, prevColor} from '../tool/toolColor';
import {ctx, canvas} from '../canvas/canvasInit';
import {layer} from '../frames/speedRange';

const btnCreate = document.querySelector('.createButton');
btnCreate.onclick = function() {
  localStorage.clear();
}

const frameList = document.querySelector('.gifLayersList')
btnCreate.onclick = function() {
  console.log(frameList.children.length);  
  while (frameList.children.length > 1) {
    frameList.removeChild(frameList.lastChild);
    console.log(frameList.children.length);  
  }
  localStorage.clear();
  frameList.firstElementChild.firstElementChild.classList.add('activeLayer');
  const canvas2 = document.querySelector('.canvas2');
  const ctx2 = canvas2.getContext('2d');
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const ctxLayer = layer.getContext('2d');
  ctxLayer.clearRect(0, 0, layer.width, layer.height);
  activeColor.value = '#498498';
  prevColor.value = '#750076';
}


