var todos = [];
var sortAsc = false;

const textInput = document.querySelector("#text");
const list = document.querySelector(".list");
const addTodoBtn = document.querySelector("#addTodoBtn");
const sortBtn = document.querySelector("#sortBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const todoBox = document.querySelector(".todo-box");

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
function addTodo(id, text) {
  if (
    text != undefined &&
    text != "" &&
    todos.length < 5 &&
    text.trim() != ""
  ) {
    todos.push({
      id: id,
      text: text,
    });
  }
  getTodos();
}
function getTodos() {
  todos.length <= 0
    ? (list.style.border = "0px")
    : (list.style.border = "1px solid #c4c4c4");
  list.replaceChildren();
  todos.forEach((todo, index) => {
    let div = document.createElement("div");
    div.classList.add("list-item");
    div.setAttribute("data-order", index);
    div.innerHTML = `<p>${todo.text}</p>
    <svg onclick="removeTodo('${todo.id}',this)" width="20" height="20" class="icon deleteBtn" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
    <path d="M6 6L14 14" stroke="#C4C4C4"/>
    <path d="M6 14L14 6" stroke="#C4C4C4"/>
    </svg>`;
    list.append(div);
    todos.length == 5
      ? (todoBox.style.display = "none")
      : (todoBox.style.display = "flex");
  });
}
function removeTodo(id, el) {
  let index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  el.parentNode.remove();
  getTodos();
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
