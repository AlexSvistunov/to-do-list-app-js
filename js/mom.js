const input = document.querySelector(".todo-form__field");
const createTodoBtn = document.querySelector(".todo-form__button");
const todosList = document.querySelector(".todos-list");
const todoForm = document.querySelector(".todo-form");

const todosArray = JSON.parse(localStorage.getItem("todos-mom"))?.length
  ? JSON.parse(localStorage.getItem("todos-mom"))
  : [];

render();

function render() {
  todosArray.forEach((todo, index) => {
    todosList.insertAdjacentHTML("beforeend", getTemplateTodoHTML(todo, index));
  });
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
  localStorage.setItem("todos-mom", JSON.stringify(array));
}

function createTodoInArray(value) {
  todosArray.push(value);
  setTodoToLocalStorage(todosArray);
  createToDoInHTML();
}

function getTemplateTodoHTML(todo, index) {
  return `
  <li class="todo-list__element todo-el" data-index=${index}>${todo}
      <div class="todo-el__block">
        <button class="todo-el__btn">X</button>
      </div>
     </li>
  `;
}

function createToDoInHTML() {
  todosList.innerHTML = "";
  todosArray.forEach((todo, index) => {
    todosList.insertAdjacentHTML("beforeend", getTemplateTodoHTML(todo, index));
  });
}

function validateInput(input, label) {
  // еще не должно быть 1 символа!!!
  // еще можно проверить на предыдущее значение, то есть не должно повторяться
  if (!input.value) {
    input.style.border = "1px solid red";
    return false;
  }

  input.style.border = "1px solid black";

  return true;
}

todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-el__btn")) {
    const liElementIndex = e.target.closest("li").dataset.index;
    deleteTodo(liElementIndex);
  }
});

function deleteTodo(index) {
  todosArray.splice(index, 1);
  setTodoToLocalStorage(todosArray);
  todosList.innerHTML = "";
  todosArray.forEach((todo, index) => {
    todosList.insertAdjacentHTML("beforeend", getTemplateTodoHTML(todo, index));
  });
}
