const input = document.querySelector(".todo-form__field");
const createTodoBtn = document.querySelector(".todo-form__button");
const todosList = document.querySelector(".todos-list");
const todoForm = document.querySelector(".todo-form");

const todosArray = JSON.parse(localStorage.getItem("todos-dad"))?.length
  ? JSON.parse(localStorage.getItem("todos-dad"))
  : [];

render();

function render() {
  for (let i = 0; i < todosArray.length; i++) {
    todosList.insertAdjacentHTML(
      "beforeend",
      `
     <li class="todo-list__element">${todosArray[i]}</li>
    `
    );
  }
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const inputValue = input.value;
  const isNormalInputValue = validateInput(input);
  if (isNormalInputValue) {
    createTodoInArray(inputValue);
    input.value = "";
  }
});

function setTodoToLocalStorage(array) {
  localStorage.setItem("todos-dad", JSON.stringify(array));
}

function createTodoInArray(value) {
  todosArray.push(value);
  setTodoToLocalStorage(todosArray);
  createToDoInHTML();
}

function createToDoInHTML() {
  todosList.innerHTML = "";
  todosArray.forEach((todo) => {
    todosList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="todo-list__element">${todo}</li>
    `
    );
  });

}

function validateInput(input, label) {

  if (!input.value) {
    input.style.border = "1px solid red";
    return false;
  }

  input.style.border = "1px solid black";

  return true;
}
