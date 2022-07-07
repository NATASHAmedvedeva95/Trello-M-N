// Data Block
let tasksArrayJSON = localStorage.getItem("notes") || "[]";
let tasksArray = JSON.parse(tasksArrayJSON);
// End Data Block
// решить вопрос с добавлением элементов сразу, а не после обновления страницы
// let number = document.querySelector('.block_item_todo_number');
// number.append(numberLists);
// console.log(tasksArray.length);
/// Start create <li></li> elements from tasksArray
const liElements = tasksArray.map(element => {
  return createLiElement(element);
});
/// End create <li></li> elements from tasksArray

// FUNCTION create Ul elements with liElements in function parameters
function createUlList(liElement) {
  const ul = document.querySelector(".block_item_todo");
  ul.append(...liElement);
  return ul;
}
// END FUNCTION

// Create UL list with tasks
const list = createUlList(liElements);
console.log(list);
// END Create UL list with tasks

// FUNCTION create LI elements
function createLiElement({ id, title, description }) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");

  const titleElement = content.querySelector(".title");
  titleElement.innerText = title;

  const descripton = content.querySelector(".task_li_textarea");

  descripton.innerText = description;

  li.id = id;

  return li;
}
// END FUNCTION

// FUNCTION create NEW LI elements WITH NEW ARRAY DATA
function addNewList(data) {
  const liElements = data.map(element => {
    return createLiElement(element);
  });

  //create Ul elements

  createUlList(liElements);
}

////// END FUNCTION

// HUNDLERS

/// 1. Open/closed modal window by click

let modaleWindow = document.getElementById("modale");
let container = document.querySelector('.container');
let wrapperModal = document.querySelector('.block_wrapper');

function stateModalWindow() {
  container.classList.toggle('container_modal');
  wrapperModal.classList.toggle('block_wrapper_modal');
  modaleWindow.classList.toggle("modal_window");
  // window.onbeforeunload = function() {
  //   return "Данные не сохранятся";
  // };
}
// evente listeners open modale window

const addBtn = document.querySelector(".btn_add");
addBtn.addEventListener("click", stateModalWindow);

// 2. Add NEW LI ELEMENT

function addNewLiElement() {
  let textArea = document.querySelector(".form_textarea");
  let textAreaValue = textArea.value;
  let title = document.querySelector(".form_input");
  let titleValue = title.value;
  let lists = document.querySelector('.block_item_todo');
  let numberLists = lists.childNodes.length+1;

  if (textAreaValue.length === 0 || titleValue.length === 0) {
    alert("tap some note text");
    return;
  }

  tasksArray.push({
    id: crypto.randomUUID(),
    title: titleValue,
    description: textAreaValue,
    number: numberLists
  });
  let number = document.querySelector('.block_item_todo_number');
  number.append(numberLists);
  // tasksArray.push({ id: 0, title: titleValue, description: textAreaValue });
  // tasksArray.map((element, index) => (element["id"] = index));
  localStorage.setItem("notes", JSON.stringify(tasksArray));
  // console.log(localStorage);

  list.innerHTML = "";

  addNewList(tasksArray);
  stateModalWindow();
  textArea.value = "";
  title.value = "";
  // localStorage.setItem("notes", JSON.stringify(tasksArray));
}

// evente listeners add new <li></li> element in <ul> list
// обработчики на добавление в ul и закрытие модального окна
const confirmBtn = document.querySelector(".confirm-btn");
const btnCancel = document.querySelector('.cancel-btn');

confirmBtn.addEventListener("click", addNewLiElement);
btnCancel.addEventListener("click", stateModalWindow);
// выход из области модального окна, если нажата кнопка esc
window.addEventListener("keydown", function(e){
        if (e.keyCode == 27) {
          stateModalWindow();
        }
    }, true);
// Electro clock(shows the current time)
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
