class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
}
var todos = [];
var limit = 5;
var premium = false;
var sortAsc = false;

const textInput = document.querySelector("#text");
const todoList = document.querySelector(".list");
const addTodoBtn = document.querySelector("#addTodoBtn");
const sortBtn = document.querySelector("#sortBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const todoBox = document.querySelector(".todo-box");
const premiumBtn = document.querySelector(".premium>button");
const countTodo = document.querySelector(".toolbar .count");
const footer = document.querySelector(".card-footer");

//Events
document.addEventListener("load", getTodos());
addTodoBtn.addEventListener("click", (e) => {
  let id = uuidv4();
  let text = textInput.value;
  addTodo(id, text);
  textInput.value = "";
});
textInput.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    let id = uuidv4();
    let text = textInput.value;
    addTodo(id, text);
    textInput.value = "";
  }
});
sortBtn.addEventListener("click", sortList);
deleteBtn.addEventListener("click", () => {
  textInput.value = "";
});
premiumBtn.addEventListener("click", buyPremium);
//Functions
function addTodo(id, text) {
  if (
    text != undefined &&
    text != "" &&
    todos.length < limit &&
    text.trim() != ""
  ) {
    todos.push(new Todo(text, id));
  }
  getTodos();
}
function getTodos() {
  checkPremium();
  todos.length <= 0
    ? (todoList.style.border = "0px")
    : (todoList.style.border = "1px solid #c4c4c4");
  todoList.replaceChildren();
  todos.forEach((todo) => {
    createTodoComponent(todo, todoList);
    toggleAddComponent();
  });
  countTodo.innerHTML = `Task : ${todos.length}/${limit}`;
}
function toggleAddComponent() {
  // todos.length == limit
  //   ? (footer.style.display = "none")
  //   : (footer.style.display = "block");
  todos.length == limit
    ? footer.classList.add("hide")
    : footer.classList.remove("hide");
}
function createTodoComponent(todo, list) {
  let div = document.createElement("div");
  div.classList.add("list-item");
  div.classList.add("draggable");
  div.setAttribute("draggable", true);
  div.addEventListener("dragstart", dragStart, false);
  div.addEventListener("dragenter", dragEnter, false);
  div.addEventListener("dragover", dragOver, false);
  div.addEventListener("dragleave", dragLeave, false);
  div.addEventListener("drop", dragDrop, false);
  div.addEventListener("dragend", dragEnd, false);
  div.innerHTML = `<p>${todo.text}</p>
    <svg onclick="removeTodo('${todo.id}',this)" width="20" height="20" class="icon deleteBtn" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
    <path d="M6 6L14 14" stroke="#C4C4C4"/>
    <path d="M6 14L14 6" stroke="#C4C4C4"/>
    </svg>`;
  list.append(div);
}
function removeTodo(id, el) {
  let index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  el.parentNode.remove();
  getTodos();
}
function editTodo(id) {
  let index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    console.log(todos[index]);
    textInput.value = todos[index].text;
  }
}
function sortList() {
  if (sortAsc) {
    todos.sort((a, b) => {
      return a.text.localeCompare(b.text);
    });
    sortBtn.src = "./icons/sortAsc.png";
    sortAsc = false;
  } else {
    todos.sort((a, b) => {
      return b.text.localeCompare(a.text);
    });
    sortBtn.src = "./icons/sortDesc.png";
    sortAsc = true;
  }
  getTodos();
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function buyPremium() {
  document.body.style.cursor = "wait";
  premiumBtn.style.cursor = "wait";
  setTimeout(() => {
    console.log("sdsd");
    document.body.style.cursor = "unset";
    premiumBtn.style.cursor = "unset";
    premium = true;
    getTodos();
  }, 2000);
}
function checkPremium() {
  if (premium) {
    premiumBtn.style.display = "none";
    limit = 10;
  }
}
// Draggable functions
var remove = document.querySelector(".draggable");
function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}
function dragEnter(e) {
  this.classList.add("over");
}
function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}
function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}
function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}
