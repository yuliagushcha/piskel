import {currentTool} from './toolInit';
import {currentColor} from './toolColor';
import {canvas, ctx, scale} from '../canvas/canvasInit';

function oneColorBucket(event) {
  if (currentTool() !== 'oneColorBucket') return;
  ctx.fillStyle = currentColor();
  // determine color pixel under mouse
  let x = event.offsetX / scale();
  let y = event.offsetY / scale();
  let cellColor = ctx.getImageData(x, y, 1, 1).data.join(',');

  let width = canvas.width;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      if (ctx.getImageData(i, j, 1, 1).data.join(',') === cellColor) {
        ctx.fillRect(i, j, 1, 1)
      }
    }
  }
}


canvas.addEventListener('mousedown', oneColorBucket);