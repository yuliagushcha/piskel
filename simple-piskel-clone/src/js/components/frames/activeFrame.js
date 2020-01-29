import {canvas, ctx} from '../canvas/canvasInit';

export function frameNumber() {
  const frames = document.querySelectorAll('.preview');
  frames.forEach((frame, index) => {
    const frameNumber = frame.querySelector('.number');
    frameNumber.innerText = index + 1;
  });
}

export function frameStyle() {
  const frames = document.querySelectorAll('.preview');
  frames.forEach((frame, index) => {
    frame.classList.remove('activeLayer');
    if (index === frames.length - 1) {
      frame.classList.add('activeLayer');
    }
  });
}

export function frameCreate() {
  const frames = document.querySelectorAll('.preview');
  frames.forEach((frame) => {
    if (frame.classList.contains('activeLayer')) {
      const canvas2 = frame.querySelector('.canvas2');
      const ctx2 = canvas2.getContext('2d');
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      ctx2.drawImage(canvas, 0, 0);
    }
  });
}

canvas.addEventListener('mouseup', frameCreate);

function frameActivation(event) {
  if (event.target.classList.contains('canvas2')) {
    const frames = document.querySelectorAll('.preview');
    frames.forEach((frame) => {
      if (frame.classList.contains('activeLayer')) {
        frame.classList.remove('activeLayer');
      }
    });
    event.target.parentNode.classList.add('activeLayer');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(event.target, 0, 0);
  }
}

export const parent = document.querySelector('.gifLayersList');
parent.addEventListener("click", frameActivation);
