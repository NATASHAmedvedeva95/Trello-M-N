// Data Block
let tasksArrayJSON = localStorage.getItem("notes") || "[]";
let tasksArray = JSON.parse(tasksArrayJSON);

// End Data Block

/// Start create <li></li> elements from tasksArray
const liElements = tasksArray.map(element => {
  return createLiElement(element);
});
/// End create <li></li> elements from tasksArray

// FUNCTION create Ul elements with liElements in function parameters
// удаление элементов по одному
function createUlList(liElement) {
  const ul = document.querySelector(".block_item_todo");
  ul.append(...liElement);
  return ul;
}
// END FUNCTION

// Create UL list with tasks
const list = createUlList(liElements);
// console.log(list);
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
  list.innerHTML = "";

  const liElements = data.map((element,index) => {
    console.log(element);
    element["id"] = index;
    return createLiElement(element);
  });

  //create Ul elements

  createUlList(liElements);
  console.log(liElements);
}

////// END FUNCTION

// HUNDLERS

/// 1. Open/closed modal window by click

let modaleWindow = document.getElementById("modale");
let container = document.querySelector(".container");
let wrapperModal = document.querySelector(".block_wrapper");

function stateModalWindow() {
  let textArea = document.querySelector(".form_textarea");
  let title = document.querySelector(".form_input");
  container.classList.toggle("container_modal");
  wrapperModal.classList.toggle("block_wrapper_modal");
  modaleWindow.classList.toggle("modal_window");
  textArea.value = "";
  title.value = "";
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
  if (textAreaValue.length === 0 || titleValue.length === 0) {
    alert("tap some note text");
    return;
  }
  tasksArray.push({
    // id: crypto.randomUUID(),
    id: 0,
    title: titleValue,
    description: textAreaValue
  });
  tasksArray.map((element, index) => {

    element["id"] = index;
    console.log(element["id"]);
    console.log(tasksArray);
  });

  // tasksArray.push({ id: 0, title: titleValue, description: textAreaValue });
  // tasksArray.map((element, index) => (element["id"] = index));
  localStorage.setItem("notes", JSON.stringify(tasksArray));
  // list.innerHTML = "";

  addNewList(tasksArray);
  textArea.value = "";
  title.value = "";
  stateModalWindow();
}

// evente listeners add new <li></li> element in <ul> list
// обработчики на добавление в ul и закрытие модального окна
const confirmBtn = document.querySelector(".confirm-btn");
const btnCancel = document.querySelector(".cancel-btn");
const ul = document.querySelector(".block_item_todo");
const li = document.querySelector(".li");

ul.onclick = function(event) {
  const target = event.target;
  const currentIndex = target.offsetParent.id;
  console.log(event);
  console.log(target);
  console.log(currentIndex);
  if (target.className === "btn_delete") {
    tasksArray.splice(currentIndex, 1);
    addNewList(tasksArray);
  }

 
  console.log(tasksArray);

  localStorage.setItem("notes", JSON.stringify(tasksArray));
};

confirmBtn.addEventListener("click", addNewLiElement);
btnCancel.addEventListener("click", stateModalWindow);

// выход из области модального окна, если нажата кнопка esc
window.addEventListener(
  "keydown",
  function(e) {
    if (e.keyCode == 27) {
      stateModalWindow();
    }
  },
  true
);
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
