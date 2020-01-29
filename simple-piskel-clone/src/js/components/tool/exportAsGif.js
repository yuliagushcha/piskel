/* eslint-disable no-undef */
import { fpsRange } from "../frames/speedRange";

const download = require('downloadjs');
const gifshot = require('gifshot');

const rangeSize = document.querySelector('.sizeRange');

export function valueImageSize() {
  const sizeValue = document.querySelector('.currentSize');
  sizeValue.innerText = rangeSize.value;
  return rangeSize.value;
}

rangeSize.addEventListener("input", valueImageSize);

function framesToImages() {
  const canvas2All = document.querySelectorAll('.canvas2');
  const images = [];
  canvas2All.forEach(canvas2 => {
    const canvasIn = document.createElement('canvas');
    const ctxIn = canvasIn.getContext('2d');

    const size = valueImageSize();
    canvasIn.width = size;
    canvasIn.height = size;
    ctxIn.fillStyle = 'rgba(225,225,225,0.1)';
    ctxIn.fillRect(0, 0, canvasIn.width, canvasIn.height);
    ctxIn.imageSmoothingEnabled = false;
    ctxIn.drawImage(canvas2, 0, 0, size, size).data.buffer;
    images.push(canvasIn.toDataURL());
  });
  return images;
}

const saveGif = document.querySelector('.gifSave');
saveGif.addEventListener('click', () => {
  gifshot.createGIF({
    images: framesToImages(),
    interval: 1 / fpsRange.value,
    gifWidth: valueImageSize(),
    gifHeight: valueImageSize(),
  }, (obj) => {
    if (!obj.error) {
      const image = obj.image;
      download(image, 'newGif.gif', 'gif');
    }
  });
});