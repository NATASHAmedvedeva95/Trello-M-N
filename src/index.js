// Data Block
let tasksArrayJSON = localStorage.getItem("notes") || "[]";
let tasksArray = JSON.parse(tasksArrayJSON);
let currentTaskNumberJSON = localStorage.getItem("currentTaskNumber") || "";
let currentTaskNumber = currentTaskNumberJSON;

// End Data Block

////number of li elements
// let p = document.querySelector(".todo");
// p.innerText = currentTaskNumber;
////////end

/// Start create <li></li> elements from tasksArray
// const liElements = tasksArray.map(element => {
//   return createLiElement(element);
// });
const liElementsTodo = tasksArray.filter(element => {
 
  if(element.state === "todo"){
    // console.log(element)
    // console.log(createLiElement(element))
    return element
  }
   
  
}).map(element => {
    return createLiElement(element);
});

const liElementsProgress = tasksArray.filter(element => {
 
  if(element.state === "inprogress"){
    // console.log(element)
    // console.log(createLiElement(element))
    return element
  }
   
  
}).map(element => {
    return createLiElement(element);
});



/// End create <li></li> elements from tasksArray

// Create UL list with tasks

const list = createUlList(liElementsTodo)
const progressList = createUlProgress(liElementsProgress)

// END Create UL list with tasks

// FUNCTION create Ul elements with liElements in function parameters
// удаление элементов по одному
function createUlList(liElement) {

  const ul = document.querySelector(".todoul");
  ul.append(...liElement);
  let p = document.querySelector(".todo");
  p.innerText = liElement.length;
  return ul;
  
}

// END FUNCTION



// FUNCTION create LI elements for todo list
function createLiElement({ id, title, description, user, time }) {
  const template = document.getElementById("template");
  const content = template.content.cloneNode(true);
  const li = content.querySelector("li");

  const titleElement = content.querySelector(".title");
  titleElement.innerText = title;

  const descripton = content.querySelector(".task_li_textarea");
  descripton.innerText = description;

  const userInput = content.querySelector(".task_li_span_user");
  userInput.innerText = user;

  const addTime = content.querySelector(".task_li_span_time");
  addTime.innerText = time;

  li.id = id;

  return li;
}
// END FUNCTION


// FUNCTION create NEW LI elements WITH NEW ARRAY DATA
function addNewList(data) {
  list.innerHTML = "";

  const liElements = data.map(element => {
    return createLiElement(element);
  });

  //create Ul elements
  createUlList(liElements);
}
// END FUNCTION

// FUNCTION create and fill ProgressList
function createUlProgress(liElement) {
  const progressUl = document.querySelector(".progressul");
  progressUl.innerHTML = "";
  progressUl.append(...liElement);
  changeCurrentNumbersProgress(liElement)
  return progressUl;
}
function changeCurrentNumbersProgress(arr) {
  let p = document.querySelector(".progress");

  p.innerText = arr.length;
}
function createProgressList() {

  const arrayProgress = tasksArray.filter(elem => {
    return elem.state === "inprogress";
  });
  
  const liElements = arrayProgress.map(element => {
    return createLiElement(element);
  });
  // console.log(arrayProgress)
  
  createUlProgress(liElements);
  changeCurrentNumbersProgress(arrayProgress)
}

// FUNCTION change current numbers of task in ul list
function changeCurrentNumbersTODO() {
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
let userElement = document.getElementById("select_user");
let timeElement = document.querySelector(".task_li_span_time");
const confirmBtn = document.querySelector(".confirm-btn");
const btnCancel = document.querySelector(".cancel-btn");
btnCancel.addEventListener("click", () => modalWindow.close());

const modalWindow = {
  _confirmHandler: () => {},

  show(cb = () => {}, data = {}) {
    const { title, description, user, time } = data;
    container.classList.add("container_modal");
    wrapperModal.classList.add("block_wrapper_modal");
    modaleWindow.classList.remove("modal_window");

    textAreaElement.value = description || "";
    titleElement.value = title || "";
    userElement.options[userElement.selectedIndex].value = user || "";
    timeElement = time;

    this._confirmHandler = function() {
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
      function(event) {
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
  }
};

// EVENT START

const addBtn = document.querySelector(".btn_add");
addBtn.addEventListener("click", () =>
  modalWindow.show(({ title, description, user }) => {
    const result = {};
    if (description.length === 0 || title.length === 0 || user.length === 0) {
      alert("tap some note text");
      result.isError = true;
      return result;
    }
    // присваивание массиву id, заголовка, содержимого
    let options = {
      hour: "numeric",
      minute: "numeric"
    };
    addArrayElement(
      tasksArray,
      crypto.randomUUID(),
      title,
      description,
      user,
      new Date().toLocaleString("ru", options),
      "todo"
    );
   

    localStorage.setItem("notes", JSON.stringify(tasksArray));
    localStorage.setItem("currentTaskNumber", tasksArray.length);

     // добавить новые карты и поместить элементы в массив с индексом элементов
   
    addNewList(mapElement());
    changeCurrentNumbersTODO();

    return result;
  })
);

function mapElement() {
  // tasksArray.map((element, index) => {
  //   element["index"] = index;
  // });
  const tasksArrayTodo = tasksArray.filter(element => {
 
    if(element.state === "todo"){

      return element
      // console.log(createLiElement(element))

    }
     
    
  })

  // console.log(tasksArrayTodo)

  return tasksArrayTodo
}

function addArrayElement(arr, id, title, description, user, time, state) {
  arr.push({
    id,
    title,
    description,
    user,
    time,
    state
  });
}

function addClickUl() {
  const target = event.target;
  const currentId = target.offsetParent.id;
  const indexArray = tasksArray.findIndex(({ id }) => id === currentId);

  if (target.className === "btn_delete") {

    tasksArray.splice(indexArray, 1);
    addNewList(tasksArray);
    changeCurrentNumbersTODO();
  }
  if (target.className === "btn_edit") {

    modalWindow.show(({ title, description, user, time }) => {
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
    }, tasksArray[indexArray]);
  }
  if (target.className === "form_btn") {
    tasksArray[indexArray].state = "inprogress";

    // console.log(tasksArray[indexArray].state);

    /////1ST FILTER BY 'TODO' STATE
    const arrayTodo = tasksArray.filter(elem => {
      return elem.state === "todo";
    });

    // console.log(arrayTodo);


    createProgressList()
    addNewList(arrayTodo);
    let p = document.querySelector(".todo");
    p.innerText = arrayTodo.length;
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

const API = "https://62d52802d4406e523554192d.mockapi.io";

const getAllUser = async () => {
  const resp = await fetch(`${API}/trello`);
  const json = await resp.json();


  // const jsonString = JSON.stringify(json);
  // console.log(`jsonString: ${jsonString}`)

  const select = document.querySelector("select");


  for (let k of json) {
    const option = document.createElement('option')
    option.id = k.id;
    option.value = k.name;
    option.innerHTML = k.name;
    select.appendChild(option);
 
  }

};

getAllUser();

const addUser = async (tasksArray) => {
  const resp = await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    userInput: JSON.stringify(tasksArray),
  });

  return await resp.json();
};
addUser();

