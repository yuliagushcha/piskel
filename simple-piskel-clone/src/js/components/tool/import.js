import {ctx, canvas} from '../canvas/canvasInit';
import {animationBackground} from '../frames/speedRange';
import {layer, fpsRange} from '../frames/speedRange';
import {addFrame} from '../frames/addFrame';
import {frameCreate} from '../frames/activeFrame';

// import image from computer
function importImage(event) {
  const image = event.target.files[0];
  if (!image) return;
  const readerImage = new FileReader();
  readerImage.onload = function(event) {
    const loadImageUrl = event.target.result;
    var loadImage = new Image();
    loadImage.src = loadImageUrl;
    loadImage.onload = function() {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(loadImage, 0, 0, canvas.width, canvas.height);
      frameCreate();
      animationBackground();
    };
  };
  readerImage.readAsDataURL(image);
}

const importImageBtn = document.querySelector('.importImage');
importImageBtn.addEventListener('change', importImage, false);

// restore the state of elements from a piskel file
function readPiskelFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const contents = event.target.result;
    importDataFromPiskel(contents);
  };
  reader.readAsText(file);
}

function importDataFromPiskel(contents) {
  const fps = contents.split('fps":').pop().split(',')[0];
  const size = contents.split('height":').pop().split(',')[0];
  const frameCount = contents.split('frameCount\\":').pop().split(',')[0];
  const imageUrl = contents.split('base64PNG\\":\\"').pop().split('\\"')[0];
  const canvas2 = document.querySelector('.canvas2');

  fpsRange.value = fps;
  const fpsValue = document.querySelector('.fpsValue');
  fpsValue.innerText = fps;

  canvas.width = canvas.height = size;
  canvas2.width = canvas2.height = size;
  layer.width = layer.height = size;
  const resizeInput = document.getElementsByName('resize');
  resizeInput.forEach(input => {
    input.checked = false;
    if(input.value == size) {
      input.checked = true;
    }
  });

  const saveCanvasImage = new Image();
  saveCanvasImage.src = imageUrl;
  saveCanvasImage.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(saveCanvasImage, size * (frameCount - 1), 0, size, size, 0, 0, size, size);
    frameCreate();
    animationBackground();
  }

    if(frameCount > 1) {
    const framesParent = document.querySelector('.gifLayersList');

    for(let i = 0; i < frameCount-1; i++) {
      const canvas2 = framesParent.lastElementChild.firstElementChild.firstElementChild;
      const ctx2 = canvas2.getContext('2d');
      const framesImage = new Image();
      framesImage.src = imageUrl;
      framesImage.onload = function() {
        ctx2.drawImage(saveCanvasImage, size * i, 0, size, size, 0, 0, size, size);
      }
      addFrame();
    }
  }
}

const importPiskelBtn = document.querySelector('.importPiskelFile');
importPiskelBtn.addEventListener('change', readPiskelFile, false);
