let ulArray= [];
ulArray = document.querySelector('.block_item_todo');

function addUl(ulArray = [], container) {
  let tasks = ulArray.map((task) => addUlItem(task));
  container.innerHTML = "";
  container.append(...tasks);
  return container;
}



function addUlItem () {
  let list = document.querySelector('.');
}