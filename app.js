// v1.0.1
// author: Elijah Trillionz
// purpose of mastering arrays and objects.

const input = document.getElementById("input");
const para = document.getElementById("defPara");
const content = document.querySelector(".content");
const button = document.getElementById("button");
const modal = document.querySelector(".modal");
const inputButton = document.querySelector(".inputClick");
const theme = document.querySelector(".theme");
const completed = document.querySelector(".completed");
const pending = document.querySelector(".pending");
const all = document.querySelector(".all");
const header = document.querySelector(".header");
const body = document.querySelector("body");
const defaultPara = document.querySelector(".default");
const form = document.forms["addTodoForm"];
const todos = [];

let changeThemeStatus = false;
let pendingStatus = false;

input.focus();
//empty input
function disabledFunction() {
  if (input.value !== "") {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
  input.focus();
}

function createTextDiv() {
  todos.push({
    status: "pending",
    todo: input.value,
    isImportant: false,
  });
  defaultPara.style.display = "none";
  const span = document.createElement("div");
  span.classList.add("span");
  const todoInput = document.createTextNode(todos[todos.length - 1].todo);
  span.appendChild(todoInput);

  createPara(span);
  saveTodos();
}

function saveTodos() {
  localStorage.setItem("todo", JSON.stringify(todos));
}

let newPara1;
function createPara(child) {
  newPara1 = document.createElement("p");
  newPara1.appendChild(child);
  content.appendChild(newPara1);
  input.value = "";
  disabledFunction();
  createStarIcon(newPara1);
  createRadIcon(newPara1, child);
  createDeleteBtn(newPara1);
  changeThemeStatus = true;
}

function createStarIcon(parent) {
  const star = document.createElement("i");
  star.setAttribute("class", "far fa-star");
  star.classList.add("starBtn");
  parent.appendChild(star);
  star.addEventListener("click", () => {
    importantTasks(star, parent);
  });
}

function createRadIcon(parent, sibling) {
  const radBtn = document.createElement("i");
  parent.insertBefore(radBtn, sibling);
  radBtn.setAttribute("class", "far fa-circle");
  radBtn.classList.add("radBtn");

  // radio btn event listener
  radBtn.addEventListener("click", () => {
    completedTasks(radBtn, sibling, parent);
  });
  pendingStatus = true;
}

function createDeleteBtn(parent, oldTodosArray) {
  const delBtn = document.createElement("i");
  parent.appendChild(delBtn);
  delBtn.setAttribute("class", "fas fa-trash");
  // delbtn event listener
  delBtn.addEventListener("click", () => {
    deleteTodo(parent, oldTodosArray);
  });
}

function deleteTodo(todo, oldTodosArray) {
  //
  if (todos[0]) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === todo.innerText) {
        todo.remove();
        todos.splice(todos.indexOf(todos[i]), 1);
        saveTodos();
      }
    }
  } else {
    console.log(false);
  }
}

// validate input
input.addEventListener("input", disabledFunction);

// button clicked
button.addEventListener("click", () => {
  createTextDiv();
});

// submit input
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTextDiv();
});

function createElements(value, oldTodosArray) {
  defaultPara.style.display = "none";
  const span = document.createElement("div");
  span.classList.add("span");
  const todoInput = document.createTextNode(value);
  span.appendChild(todoInput);
  createPara(span);
}

const oldTodos = localStorage.getItem("todo");
console.log(todos);

function displayOldTodos() {
  if (oldTodos !== null) {
    const oldTodosArray = JSON.parse(oldTodos);
    oldTodosArray.forEach((value) => {
      todos.push(value);
      // if (value.status === "completed") {
      createElements(value.todo, oldTodosArray);
      // }
    });
  }
}

displayOldTodos();

function changeTheme() {
  body.classList.toggle("light");
  header.classList.toggle("light");
  modal.classList.toggle("light");
  // content.classList.toggle('light');
  if (changeThemeStatus) {
    const newPara = document.querySelectorAll(".content > p");
    newPara.forEach((value) => {
      value.classList.toggle("light");
    });
    console.log(true);
  } else {
    console.log(false);
  }
  if (body.className === "light") {
    localStorage.setItem("theme", "changed");
  } else {
    localStorage.setItem("theme", "constant");
  }
}

const themeStatus = localStorage.getItem("theme");
if (themeStatus === "changed") {
  changeTheme();
}

theme.addEventListener("click", changeTheme);

function completedTasks(radBtn, sibling, todo) {
  const regex = /fa-circle/g;
  if (regex.test(radBtn.className)) {
    radBtn.setAttribute("class", "fa fa-check-circle");
    sibling.classList.add("active");

    // finding the index of the clicked todo in the todos array
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === todo.innerText) {
        todos[i].status = "completed";
        saveTodos();
      }
    }
  } else {
    sibling.classList.remove("active");
    radBtn.setAttribute("class", "far fa-circle");
    // finding the index of the clicked todo in the todos array
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === todo.innerText) {
        todos[i].status = "pending";
        saveTodos();
      }
    }
  }
}

function importantTasks(starIcon, todo) {
  const starRegEx = /far/g;
  if (starRegEx.test(starIcon.className)) {
    starIcon.setAttribute("class", "fa fa-star");

    // finding the index of the clicked todo in the todos array
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === todo.innerText) {
        todos[i].isImportant = true;
        starIcon.classList.add("important");
        saveTodos();
      }
    }
  } else {
    starIcon.setAttribute("class", "far fa-star");

    // finding the index of the clicked todo in the todos array
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === todo.innerText) {
        todos[i].isImportant = false;
        starIcon.classList.remove("important");
        saveTodos();
      }
    }
  }
}

// constants
const spans = document.querySelectorAll(".span");
const radBtns = document.querySelectorAll(".radBtn");
const starBtns = document.querySelectorAll(".starBtn");
for (let i = 0; i < todos.length; i++) {
  if (todos[i].status === "completed") {
    spans.forEach((value, index) => {
      if (value.innerText === todos[i].todo) {
        radBtns[index].setAttribute("class", "fa fa-check-circle");
        value.classList.add("active");
      }
    });
  } else {
    spans.forEach((value, index) => {
      if (value.innerText === todos[i].todo) {
        radBtns[index].setAttribute("class", "far fa-circle");
        value.classList.remove("active");
      }
    });
  }
  console.log(todos[i]);
  if (todos[i].isImportant) {
    starBtns[i].setAttribute("class", "fa fa-star");
  }
}

// things to be added in the coming days
/**
 * Storage, ✔️
 * Design for PC,✔️
 * toggling important tasks and saving them,✔️
 * Light theme,✔️
 */
