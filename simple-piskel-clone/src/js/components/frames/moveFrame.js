import {frameNumber, frameStyle} from './activeFrame';
import {animationBackground} from './speedRange';

function moveFrame(event) {
  if (!event.target.classList.contains('move')) return;
  let t = event.target.parentNode;
  event.target.onmousedown = function () {
    t.style.position = "absolute";
    t.style.zIndex = 100;
    t.parentNode.classList.add('gifLayerContainerActive');

    function moveAt(event) {
      t.style.top = event.pageY - t.offsetHeight / 2 - t.parentNode.offsetTop + 'px';
      t.style.left = '-3px'
    }
    document.onmousemove = function (event) {
      moveAt(event);
    }
  }
  t.onmouseup = function () {
    const blockContainer = document.querySelectorAll('.gifLayersContainer');
    blockContainer.forEach(item => {
      let y = t.offsetTop + t.parentNode.offsetTop;
      let y1 = item.offsetTop;

      if(y > parent.offsetHeight) {
        t.parentNode.appendChild(t);
        t.style.top = '0px';
        t.style.left = '0px'
      }

      if (y > y1 - 50 && y < y1 + 50) {
        let parent1 = item;
        let child1 = item.firstElementChild;
        let parent0 = t.parentNode;
        let child0 = t;
        t.style.top = '0px';
        t.style.left = '0px'

        parent1.appendChild(child0);
        parent0.appendChild(child1);

        parent0.classList.remove('gifLayerContainerActive');
      } else {
        t.parentNode.appendChild(t);
        t.parentNode.classList.remove('gifLayerContainerActive');
      }
    });
    t.style.zIndex = 1;

    document.onmousemove = null;
    t.onmouseup = null;

    frameNumber();
    animationBackground();
    frameStyle();
  }
}

parent.addEventListener("mouseover", moveFrame);
