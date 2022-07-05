
let taskArray = [
  // {id:0, title: 'run', description:"0 white"},
  // {id:1, title: 'run1', description:"1 white"},
  // {id:2, title: 'run2', description:"2 white"},
  // {id:3, title: 'run3', description:"3 white"}
];
console.log(taskArray);

// const LiElements = taskArray.map((element)=>{return createLiElement(element)});


function addUl(data = [], container) {
  let tasks = data.map((task) => addUlItem(task));
  container.innerHTML = '';
  container.append(...tasks);
  return container;
}

// function createUlList (LiElement) {
//   const ul = document.querySelector('.block_item_todo');
//   const ulButton = ul.lastElementChild;
//   for (let li in LiElement){ul.insertBefore(LiElement[li],ulButton)}
// }

// createUlList(taskArray);


function addUlItem ({id,title,description}) {
  const template = document.getElementById('template');
  const content = template.content.cloneNode(true);
  const li = content.querySelector('li');

  const titleElement = content.querySelector('.title');
  titleElement.innerText = title;

  const description1 = content.querySelector('.task_li_textarea');

  description1.innerText = description;

  li.id = id;
  
  return content;
}

const ulBtn = document.querySelector('.btn_add');
ulBtn.addEventListener('click', () => {
taskArray.push({id: crypto.randomUUID(), title:"gggg", description:"rrrr"});
const ul = document.querySelector('.block_item_todo');
// const li = document.querySelector('.task_li');
addUl(taskArray,ul);
console.log(ul);
});










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

