//посмотреть видео и сделать как в видео(новый проект)
// не обновлять html
// сделать объект с url
// а если будет не http://127.0.0.1:5500/

const input = document.querySelector(".todo-form__field");
const createTodoBtn = document.querySelector(".todo-form__button");
const todosList = document.querySelector(".todos-list");
const todoForm = document.querySelector(".todo-form");

const path = window.location.pathname;
let currentUrl;

switch (path) {
  case "/me.html":
    currentUrl = "todos-me";
    break;
  case "/dad.html":
    currentUrl = "todos-dad";
    break;
  case "/mom.html":
    currentUrl = "todos-mom";
    break;
}
const todosArray = JSON.parse(localStorage.getItem(currentUrl))?.length
  ? JSON.parse(localStorage.getItem(currentUrl))
  : [];

render();

function render() {
  if (todosList) {
    todosList.innerHTML = "";
    todosArray.forEach((todo, index) => {
      todosList.insertAdjacentHTML(
        "beforeend",
        getTemplateTodoHTML(todo, index)
      );
    });
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
  localStorage.setItem(currentUrl, JSON.stringify(array));
}

function createTodoInArray(value) {
  todosArray.push(value);
  setTodoToLocalStorage(todosArray);
  render();
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

function validateInput(input, label) {
  // еще можно проверить на предыдущее значение, то есть не должно повторяться
  if (input.value.length === 0 || input.value.length === 1) {
    input.style.outline = "1px solid red";
    input.style.border = '1px solid transparent'
    return false;
  }

  input.style.outline = "1px solid black";
  input.style.border = '1px solid transparent'

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
  render();
}
