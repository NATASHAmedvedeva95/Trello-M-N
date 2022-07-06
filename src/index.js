//// Data Block

let tasksArrayJSON = localStorage.getItem("notes") || "[]";
let tasksArray = JSON.parse(tasksArrayJSON);

//// End Data Block

/////// Start create <li></li> elements from tasksArray

const liElements = tasksArray.map(element => {
  return createLiElement(element);
});

/////// End create <li></li> elements from tasksArray

////// FUNCTION create Ul elements with liElements in function parameters

function createUlList(liElement) {
  const ul = document.querySelector(".block_item_todo");
  ul.append(...liElement);
  return ul;
}
////// END FUNCTION

//////// Create UL list with tasks

const list = createUlList(liElements);
console.log(list);

//////// END Create UL list with tasks

//////////// FUNCTION create LI elements

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

////// END FUNCTION

//////////// FUNCTION create NEW LI elements WITH NEW ARRAY DATA

function addNewList(data) {
  const liElements = data.map(element => {
    return createLiElement(element);
  });

  //create Ul elements

  createUlList(liElements);
}

////// END FUNCTION

////// HUNDLERS ////////

///// 1. Open modal window by click

let modaleWindow = document.getElementById("modale");

function openModaleWindow() {
  modaleWindow.classList.toggle("modal_window");
}

////// evente listeners open modale window

const addBtn = document.querySelector(".btn_add");
addBtn.addEventListener("click", openModaleWindow);

//////// 2. Add NEW LI ELEMENT

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
    id: crypto.randomUUID(),
    title: titleValue,
    description: textAreaValue
  });
  // tasksArray.push({ id: 0, title: titleValue, description: textAreaValue });
  // tasksArray.map((element, index) => (element["id"] = index));
  localStorage.setItem("notes", JSON.stringify(tasksArray));
  // console.log(localStorage);

  list.innerHTML = "";

  addNewList(tasksArray);
  textArea.value = "";
  title.value = "";
  modaleWindow.classList.toggle("modal_window");
}

////// evente listeners add new <li></li> element in <ul> list

const confirmBtn = document.querySelector(".confirm-btn");

confirmBtn.addEventListener("click", addNewLiElement);

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
