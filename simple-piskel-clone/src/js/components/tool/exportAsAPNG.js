/* eslint-disable no-undef */
import {valueImageSize} from './exportAsGif';
import {animationSpeed} from '../frames/speedRange';
const download = require('downloadjs');
const UPNG = require('upng-js');

function ArrayBufferData() {
  const data = [];
  const canvas2All = document.querySelectorAll('.canvas2');

  canvas2All.forEach(canvas2 => {
    const canvasIn = document.createElement('canvas');
    const ctxIn = canvasIn.getContext('2d');

    const size = valueImageSize();
    canvasIn.width = size;
    canvasIn.height = size;

    ctxIn.imageSmoothingEnabled = false;
    ctxIn.drawImage(canvas2, 0, 0, size, size);
    const partData = ctxIn.getImageData(0, 0, size, size).data.buffer;
    data.push(partData);
  });
  return data;
}

function saveImageAsApng() {
  const arrAnimationSpeed = new Array(ArrayBufferData().length);
  arrAnimationSpeed.fill(animationSpeed());
  const imageData = UPNG.encode(ArrayBufferData(), valueImageSize(), valueImageSize(), 0, arrAnimationSpeed);
  download(imageData, 'newAPNG.apng', 'apng');
}

const saveApng = document.querySelector('.apngSave');
saveApng.addEventListener('click', saveImageAsApng);