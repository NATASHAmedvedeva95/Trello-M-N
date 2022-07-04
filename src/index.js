let ulArray = [];
ulArray = document.querySelector(".block_item_todo");

function addUl(ulArray = [], container) {
  let tasks = ulArray.map(task => addUlItem(task));
  container.innerHTML = "";
  container.append(...tasks);
  return container;
}

function addUlItem() {
  let list = document.querySelector(".");
}

//////Electro clock(shows the current time)

function update() {
  let watch = document.querySelector(".time-board p");
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  watch.innerText = `${hours} : ${minutes} : ${seconds} `;
}
function clockStart() {
  setInterval(update, 1000);
  update();
}
clockStart();
