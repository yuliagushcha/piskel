import {activeColor, prevColor} from '../tool/toolColor';
import {addFrame} from '../frames/addFrame';
import {ctx, setSizeCanvas} from '../canvas/canvasInit';
import {animationBackground} from '../frames/speedRange';
import {frameCreate} from '../frames/activeFrame';

window.onload = function() {
  if(localStorage.getItem('radioTool')) {
    const radioTool = localStorage.getItem('radioTool');
    document.querySelector('input[name="tool"][value="' + radioTool + '"]').setAttribute('checked','checked');
  }

  if(localStorage.getItem('radioResize')) {
    const radioResize = localStorage.getItem('radioResize');
    document.querySelector('input[name="resize"][value="' + radioResize + '"]').setAttribute('checked','checked');
    setSizeCanvas();
  }

  if(localStorage.getItem('activeColor')) {
    activeColor.value = localStorage.getItem('activeColor');
  }
  if(localStorage.getItem('prevColor')) {
    prevColor.value = localStorage.getItem('prevColor');
  }

  if(localStorage.getItem('url')) {
    const savedImage = new Image();
    savedImage.src = localStorage.getItem('url');
    savedImage.onload = function() {
      ctx.drawImage(savedImage, 0, 0);
      frameCreate();
      animationBackground();
    }
  }

    if(localStorage.getItem('framesLength')) {
    const framesLength = localStorage.getItem('framesLength');
    const framesParent = document.querySelector('.gifLayersList');

    for(let i = 0; i < framesLength-1; i++) {
      const canvas2 = framesParent.lastElementChild.firstElementChild.firstElementChild;
      const ctx2 = canvas2.getContext('2d');
      const framesImage = new Image();
      framesImage.src = localStorage.getItem(i);
      framesImage.onload = function() {
        ctx2.drawImage(framesImage, 0, 0);
      }
      addFrame();
    }
  }
}
