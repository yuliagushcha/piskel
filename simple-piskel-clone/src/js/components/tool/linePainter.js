import {currentTool} from './toolInit';
import {canvas, ctx, isDrawing, scale} from '../canvas/canvasInit';
import {boxSize} from '../canvas/toolSize';
import {drawLine, canvasCopy, startLine} from './pen';

function linePainter(event) {
  if (currentTool() !== 'linePainter' || !isDrawing) return;
  ctx.putImageData(canvasCopy, 0, 0);
  const endLine = {};
  endLine.x = Math.floor(event.offsetX / scale() / boxSize()) * boxSize();
  endLine.y = Math.floor(event.offsetY / scale() / boxSize()) * boxSize();
  drawLine(startLine.x, startLine.y, endLine.x, endLine.y);
}

canvas.addEventListener('mousemove', linePainter);