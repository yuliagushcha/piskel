import {boxSize} from '../canvas/toolSize';
import {canvas, ctx, isDrawing, scale} from '../canvas/canvasInit';
import {currentTool} from './toolInit';

function eraser(event) {
  if (currentTool() !== 'eraser' || !isDrawing) return;
  let size = boxSize();
  const x = Math.floor(event.offsetX / scale() / size) * size;
  const y = Math.floor(event.offsetY / scale() / size) * size;
  if (event.ctrlKey) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(x, y, size, size);
  }
}

canvas.addEventListener('mousedown', eraser);
canvas.addEventListener('mousemove', eraser);
