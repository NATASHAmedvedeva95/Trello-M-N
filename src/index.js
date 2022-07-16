// Data Block
let tasksArrayJSON = localStorage.getItem("notes") || "[]";
let tasksArray = JSON.parse(tasksArrayJSON);
let currentTaskNumberJSON = localStorage.getItem("currentTaskNumber") || "";
let currentTaskNumber = currentTaskNumberJSON;

// End Data Block

////number of li elements
let p = document.querySelector(".todo");
p.innerText = currentTaskNumber;
////////end

/// Start create <li></li> elements from tasksArray
const liElements = tasksArray.map((element) => {
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
// END Create UL list with tasks

// FUNCTION create LI elements
function createLiElement({ id, title, description, user, time}) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");

  const titleElement = content.querySelector(".title");
  titleElement.innerText = title;

  const descripton = content.querySelector(".task_li_textarea");
  descripton.innerText = description;

  const userInput = content.querySelector('.task_li_span_user');
  userInput.innerText = user;

  const addTime = content.querySelector('.task_li_span_time');
  addTime.innerText = time;
 
  li.id = id;
  return li;
}
// END FUNCTION

// FUNCTION create NEW LI elements WITH NEW ARRAY DATA
function addNewList(data) {
  list.innerHTML = "";

  const liElements = data.map((element) => {
    return createLiElement(element);
  });

  //create Ul elements
  createUlList(liElements);
}
// END FUNCTION

// FUNCTION change current numbers of task in ul list
function changeCurrentNumbers() {
  let p = document.querySelector(".todo");

  p.innerText = tasksArray.length;
}

//// END FUNCTION

// HUNDLERS

/// 1. Open/closed modal window by click

let modaleWindow = document.getElementById("modale");
let container = document.querySelector(".container");
let wrapperModal = document.querySelector(".block_wrapper");
let textAreaElement = document.querySelector(".form_textarea");
let titleElement = document.querySelector(".form_input");
let userElement = document.getElementById('select_user');
let timeElement = document.querySelector('.task_li_span_time');
const confirmBtn = document.querySelector(".confirm-btn");
const btnCancel = document.querySelector(".cancel-btn");
btnCancel.addEventListener("click", () => modalWindow.close());

const modalWindow = {
  _confirmHandler: () => {},

  show(cb = () => {}, data = {}) {
    const { title, description, user, time} = data;
    container.classList.add("container_modal");
    wrapperModal.classList.add("block_wrapper_modal");
    modaleWindow.classList.remove("modal_window");

    textAreaElement.value = description || "";
    titleElement.value = title || "";
    userElement.options[userElement.selectedIndex].value = user || "" ;
    timeElement = time;

    this._confirmHandler = function () {
      const title = titleElement.value;
      const description = textAreaElement.value;
      const user = userElement.options[userElement.selectedIndex].value;
      const time = timeElement;

      const result = cb({ title, description, user, time });
      if (result && !result.isError) {
        this.close();
      }
    }.bind(modalWindow);

    confirmBtn.addEventListener("click", this._confirmHandler), { once: true };
  },
  close() {
    window.addEventListener(
      "keydown",
      function (event) {
        if (event.keyCode == 27) {
          modalWindow.close();
        }
      },
      { once: true }
    );
    confirmBtn.removeEventListener("click", this._confirmHandler);
    container.classList.remove("container_modal");
    wrapperModal.classList.remove("block_wrapper_modal");
    modaleWindow.classList.add("modal_window");
  },
};

// EVENT START

const addBtn = document.querySelector(".btn_add");
addBtn.addEventListener("click", () => modalWindow.show(({ title, description, user }) =>{
    const result = {};
    if (description.length === 0 || title.length === 0 || user.length === 0) {
      alert("tap some note text");
      result.isError = true;
      return result;
    }
    // присваивание массиву id, заголовка, содержимого
    let options = {
      hour: "numeric",
      minute: "numeric",
    };
    addArrayElement(tasksArray, crypto.randomUUID(), title, description, user, new Date ().toLocaleString("ru", options));
    // поместить элементы в массив с индексом элементов
    mapElement();
    //
    localStorage.setItem("notes", JSON.stringify(tasksArray));
    localStorage.setItem("currentTaskNumber", tasksArray.length);

    addNewList(tasksArray);
    changeCurrentNumbers();

    return result;
  }));

function mapElement() {
  tasksArray.map((element, index) => {
    element["index"] = index;
  });
}

function addArrayElement(arr, id, title, description, user, time) {
  arr.push({
    id: id,
    title: title,
    description: description,
    user: user,
    time: time
  });
}

function addClickUl() {
  const target = event.target;
  const currentId = target.offsetParent.id;

  if (target.className === "btn_delete") {
    const indexArray = tasksArray.findIndex(({ id }) => id === currentId);
    tasksArray.splice(indexArray, 1);
    addNewList(tasksArray);
    changeCurrentNumbers();
  }
  if (target.className === "btn_edit") {
    const indexArray = tasksArray.findIndex(({ id }) => id === currentId);
    modalWindow.show(
      ({ title, description, user, time}) => {
        const result = {};
        if (description.length === 0 || title.length === 0 || user.length === 0) {
          alert("tap some note text");
          result.isError = true;
          return result;
        }
        const task = tasksArray[indexArray];
        task.title = title;
        task.description = description;
        task.user = user;
        task.time = time;
    
        localStorage.setItem("notes", JSON.stringify(tasksArray));
        localStorage.setItem("currentTaskNumber", tasksArray.length);
    
        addNewList(tasksArray);
    
        return result;
      },
      tasksArray[indexArray]
    );
  }
  localStorage.setItem("notes", JSON.stringify(tasksArray));
  localStorage.setItem("currentTaskNumber", tasksArray.length);
}

list.addEventListener("click", addClickUl);

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


// создание users
const API = "https://62d2ff0881cb1ecafa6906af.mockapi.io/api/v1/";
const getAllUser = async () => {
  const resp = await fetch(`${API}/users`);
  const json = await resp.json();
document.body.append(JSON.stringify(json));
};

const addUser = async (tasksArray) => {

  const resp = await fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    userInput: JSON.stringify(tasksArray)
  });
  
  return await resp.json();
};

getAllUser();
