import {canvas, ctx, x1, y1} from '../canvas/canvasInit';
import {currentTool} from './toolInit';
import {currentColor} from './toolColor';

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];  // impossible color
  } else {
    const offset = (y * imageData.width + x) * 4;
    return imageData.data.slice(offset, offset + 4);
  }
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = color[3];
}

function colorsMatch(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

function floodFill(ctx, x, y, fillColor) {
  // read the pixels in the canvas
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // get the color we're filling
  const targetColor = getPixel(imageData, x, y);

  // check we are actually filling a different color
  if (!colorsMatch(targetColor, fillColor)) {

    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const curColor = getPixel(imageData, x, y);
      if (colorsMatch(curColor, targetColor)) {
        setPixel(imageData, x, y, fillColor);
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }

    // put the data back
    ctx.putImageData(imageData, 0, 0);
  }
}

function hexToRgbA(hex){
  let c = hex.substring(1).split('');
  if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c = '0x' + c.join('');
  return [(c>>16)&255, (c>>8)&255, c&255, 255];
}

function bucket() {
  if (currentTool() !== 'bucket') return;
  if (event.ctrlKey) {
    ctx.fillStyle = currentColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    let rgbColor = hexToRgbA(currentColor());
    floodFill(ctx, x1, y1, rgbColor);
  }
}

canvas.addEventListener('mousedown', bucket);
