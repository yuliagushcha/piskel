import {activeColor, prevColor} from '../tool/toolColor';
import {canvas} from '../canvas/canvasInit';
import {addFrameButton} from '../frames/addFrame';

const tool = document.getElementsByName('tool');
for (let i = 0; i < tool.length; i++) {
  tool[i].onclick = function() {
    localStorage.setItem('radioTool', this.value);
  }
}

const resize = document.getElementsByName('resize');
for (let i = 0; i < resize.length; i++) {
  resize[i].onclick = function() {
    localStorage.setItem('radioResize', this.value);
  }
}

activeColor.onchange = function() {
    localStorage.setItem('activeColor', activeColor.value);
  }
prevColor.onchange = function() {
    localStorage.setItem('prevColor', prevColor.value);
  }

canvas.onclick = function() {
  const url = canvas.toDataURL();
  localStorage.setItem('url', url);
}

function saveFrames() {
  const canvas2All = document.querySelectorAll('.canvas2');
  const framesLength = canvas2All.length;
  localStorage.setItem('framesLength', framesLength);

  for(let i = 0; i < framesLength; i++) {
      const framesUrl = canvas2All[i].toDataURL();
      localStorage.setItem(i, framesUrl);
    }
}

addFrameButton.addEventListener("click", saveFrames);
parent.addEventListener("click", saveFrames);
