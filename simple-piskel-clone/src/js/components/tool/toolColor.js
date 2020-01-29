export const activeColor = document.querySelector('.currentColor');
export const prevColor = document.querySelector('.previousColor');

// get current color
export function currentColor() {
  let activeColorValue;
  if(detectLeftButton()) {
    activeColorValue = activeColor.value;
  } else {
    activeColorValue = prevColor.value;
  }
  return activeColorValue;
}

// change current and prev colors
function changeColor() {
  let temp;
  temp = activeColor.value;
  activeColor.value = prevColor.value;
  prevColor.value = temp;
}

const changingColorArrow = document.querySelector('.changingColor');
changingColorArrow.addEventListener('click', changeColor);

// detect if the left and only the left mouse button is press
function detectLeftButton(event) {
  event = event || window.event;
  if ("buttons" in event) {
    return event.buttons == 1;
  }
  var button = event.which || event.button;
  return button == 1;
}

