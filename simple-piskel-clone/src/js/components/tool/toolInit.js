export function currentTool() {
  const toolInput = document.getElementsByName('tool');
  let currentToolValue;
  toolInput.forEach(tool => {
    if (tool.checked) {
      currentToolValue = tool.value;
    }
  });
  return currentToolValue;
}

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};