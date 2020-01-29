import {canvas, ctx, isDrawing, scale} from '../canvas/canvasInit';
import {currentTool} from './toolInit';
import {activeColor} from './toolColor';

function colorPicker() {
  if (currentTool() !== 'colorPicker' || !isDrawing) return;
  const x1 = Math.floor(event.offsetX / scale());
  const y1 = Math.floor(event.offsetY / scale());
  let pixel = ctx.getImageData(x1, y1, 1, 1);
  let data = pixel.data;
  // if color transparent
  if (data[3] === 0) return;
  let r = data[0].toString(16);
  r = r.length === 1 ? "0" + r : r;
  let g = data[1].toString(16);
  g = g.length === 1 ? "0" + g : g;
  let b = data[2].toString(16);
  b = b.length === 1 ? "0" + b : b;
  let hex = `#${r}${g}${b}`;
  activeColor.value = hex;
}

canvas.addEventListener('mousedown', colorPicker);
