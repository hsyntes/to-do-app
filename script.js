"use strict";

const listGroup = document.querySelector(".list-group");
const btnAddTask = document.querySelector("#btn-add-task");
const inputAddTask = document.querySelector("#input-add-task");
const btnCloseAddTask = document.querySelector("#btn-close-add-task");
const btnEditTask = document.querySelector("#btn-edit-task");
const inputEditTask = document.querySelector("#input-edit-task");
const btnCloseEditTask = document.querySelector("#btn-close-edit-task");
const btnYes = document.querySelector("#btn-yes");
const btnNo = document.querySelector("#btn-no");

const App = {
  name: "ToDoApp",
  taskTextLimit: 50,
};

(function (appName) {
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.className = "navbar-brand logo";
  a.textContent = appName;

  document.querySelector("#container-nav").prepend(a);
})(App.name);

function createTask(text) {
  return `
<li class="list-group-item d-flex align-items-center bg-dark text-light">
  <p class="task-text m-0 p-0">${text}</p>
  <span class="ms-auto">
    <i class="fa task-icons fa-trash-o pointer"></i>
  </span>
  <span class="ms-3">
    <i class="fa task-icons fa-pencil pointer"
      data-bs-toggle="modal"
      data-bs-target="#modal-edit-task">
    </i>
  </span>
  <span class="ms-3">
    <i class="fa task-icons fa-check pointer"></i>
  </span>
</li>
    `;
}

const formatTaskText = function (taskText) {
  return taskText.length > Number(App.taskTextLimit)
    ? false
    : `${taskText.slice(0, 1).toUpperCase()}${taskText.slice(1).toLowerCase()}`;
};

function clearInputs(input) {
  input.value = "";
}

function checkListGroup() {
  listGroup.childElementCount >= 1
    ? listGroup.classList.add("border")
    : listGroup.classList.remove("border");
}

const setMessage = (message) => {
  alert(message);
};

function addTask() {
  if (formatTaskText(inputAddTask.value)) {
    listGroup.insertAdjacentHTML(
      "afterbegin",
      createTask(formatTaskText(inputAddTask.value))
    );
    clearInputs(inputAddTask);
    btnCloseAddTask.click();
    checkListGroup();
  } else setMessage(`The task text cannot be over ${App.taskTextLimit} lenght`);
}

btnAddTask.addEventListener("click", addTask);
inputAddTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
    e.preventDefault();
  }
});

function deleteTask(listGroupItem) {
  listGroupItem.remove();
  checkListGroup();
}

function edit() {
  if (taskText.textContent === inputEditTask.value)
    alert("They are already the same!");
  else {
    if (formatTaskText(inputEditTask.value)) {
      taskText.textContent = formatTaskText(inputEditTask.value);
      btnCloseEditTask.click();
    } else
      setMessage(`The task text cannot be over ${App.taskTextLimit} lenght`);
  }
}

function editTask(taskText) {
  inputEditTask.value = taskText.textContent;
}

function checkTask(taskText, listGroupItem, checkIcon) {
  taskText.classList.toggle("text-decoration-line-through");
  listGroupItem.classList.toggle("bg-darker");
  checkIcon.classList.toggle("green");
}

let listGroupItem, taskText, checkIcon;
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-icons")) {
    listGroupItem = e.target.closest(".list-group-item");
    taskText = listGroupItem.firstElementChild;
    checkIcon = listGroupItem.lastElementChild.firstElementChild;
    if (e.target.classList.contains("fa-trash-o")) deleteTask(listGroupItem);
    else if (e.target.classList.contains("fa-pencil")) editTask(taskText);
    else checkTask(taskText, listGroupItem, checkIcon);
  }
});

btnEditTask.addEventListener("click", edit);
inputEditTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    edit();
    e.preventDefault();
  }
});

btnYes.addEventListener("click", function () {
  while (listGroup.childElementCount > 0) {
    for (const item of listGroup.children) {
      item.remove();
    }
  }
  btnNo.click();
  checkListGroup();
});