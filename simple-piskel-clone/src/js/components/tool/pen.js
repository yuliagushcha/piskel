import {currentTool} from './toolInit';
import {currentColor} from './toolColor';
import {canvas, ctx, isDrawing, x1, y1, scale} from '../canvas/canvasInit';
import {boxSize} from '../canvas/toolSize';

export let canvasCopy = canvas;
export const startLine = {};

canvas.addEventListener('mousedown', () => {
  ctx.fillStyle = currentColor();
  canvasCopy = ctx.getImageData(0, 0, canvas.width, canvas.height);
  startLine.x = x1;
  startLine.y = y1;
});

export function drawLine(x1, y1, x2, y2) {
  let size = boxSize();
  let deltaX = Math.abs(x2 - x1);
  let deltaY = Math.abs(y2 - y1);
  let signX = x1 < x2 ? 1 : -1;
  let signY = y1 < y2 ? 1 : -1;
  let error = deltaX - deltaY;
  ctx.fillRect(x2, y2, size, size);
  while (x1 != x2 || y1 != y2) {
    ctx.fillRect(x1, y1, size, size);
    let error2 = error * 2;
    if (error2 > -deltaY) {
      error -= deltaY;
      x1 += signX;
    }
    if (error2 < deltaX) {
      error += deltaX;
      y1 += signY;
    }
  }
}

function pen(event) {
  if (currentTool() !== 'pen' || !isDrawing) return;
  const endLine = {};
  endLine.x = Math.floor(event.offsetX / scale() / boxSize()) * boxSize();
  endLine.y = Math.floor(event.offsetY / scale() / boxSize()) * boxSize();
  drawLine(startLine.x, startLine.y, endLine.x, endLine.y);
  startLine.x = endLine.x;
  startLine.y = endLine.y;
}

canvas.addEventListener('mousemove', pen);


