const todos = [
  {
    id: 5,
    text: "First Todo",
    status: 0,
  },
];

const textInput = document.querySelector("#text");
const list = document.querySelector(".list");

textInput.addEventListener("keyup", (e) => {
  if (
    e.code == "Enter" &&
    textInput.value != undefined &&
    textInput.value != ""
  ) {
    let id = uuidv4();
    let text = textInput.value;
    let status = false;
    addTodo(id, text, status);
    textInput.value = "";
    getTodos();
  }
});

function clearInput() {
  textInput.value = "";
}

function addTodo(id, text, status) {
  todos.push({
    id: id,
    text: text,
    status: status,
  });
  let div = document.createElement("div");
  div.classList.add("list-item");
  div.id = id;
  div.innerHTML = `<p>${text}</p><img class="icon" src="./icons/close.png" onclick="removeTodo('${id}',this)" />`;
  list.append(div);
}

function getTodos() {
  console.log(todos);
}

function removeTodo(id, el) {
  let index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  el.parentNode.remove();
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
