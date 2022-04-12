"use strict";

const listGroup = document.querySelector(".list-group");
const btnAddTask = document.querySelector("#btn-add-task");
const inputAddTask = document.querySelector("#input-add-task");
const btnCloseAddTask = document.querySelector("#btn-close-add-task");
const btnEditTask = document.querySelector("#btn-edit-task");
const inputEditTask = document.querySelector("#input-edit-task");
const btnCloseEditTask = document.querySelector("#btn-close-edit-task");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const modalDeleteAllTitle = document.querySelector("#modal-delete-all-title");
const btnYesDeleteAll = document.querySelector("#btn-yes-delete-all");
const btnNoDeleteAll = document.querySelector("#btn-no-delete-all");
const btnCloseDeleteAll = document.querySelector("#btn-close-delete-all");

let listGroupItem, taskText, checkIcon, deleteIcon;

const App = {
  taskTextLimit: 50,
};

function createTask(text) {
  return `
<li class="list-group-item d-flex align-items-center bg-dark text-light py-0">
  <a href="#" class="task-item d-block w-100 text-light py-2"
    data-bs-toggle="modal"
    data-bs-target="#modal-edit-task">${text}</a>
  <i class="task-item fa fa-trash-o fa-sm d-block pointer p-2"></i>
  <i class="task-item fa fa-check fa-sm d-block pointer p-2"></i>
</li>
    `;
}

const formatTaskText = (taskText) =>
  taskText.length > Number(App.taskTextLimit)
    ? false
    : `${taskText.slice(0, 1).toUpperCase()}${taskText.slice(1).toLowerCase()}`;

const clearInput = (input) => (input.value = "");

const setMessage = (message) => alert(message);

function addTask() {
  if (formatTaskText(inputAddTask.value)) {
    listGroup.insertAdjacentHTML(
      "afterbegin",
      createTask(formatTaskText(inputAddTask.value))
    );
    clearInput(inputAddTask);
    btnCloseAddTask.click();
  } else
    setMessage(
      `The task text cannot be empty or over ${App.taskTextLimit} lenght`
    );
}

btnAddTask.addEventListener("click", addTask);
inputAddTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
    e.preventDefault();
  }
});

function editTask() {
  if (taskText.textContent === inputEditTask.value)
    alert("They are already the same!");
  else {
    if (formatTaskText(inputEditTask.value)) {
      taskText.textContent = formatTaskText(inputEditTask.value);
      btnCloseEditTask.click();
    } else
      setMessage(
        `The task text cannot be empty or over ${App.taskTextLimit} lenght`
      );
  }
}

function deleteTask(listGroupItem) {
  listGroupItem.remove();
}

function checkTask(listGroupItem, taskText, checkIcon) {
  taskText.classList.toggle("text-decoration-line-through");
  listGroupItem.classList.toggle("bg-darker");
  checkIcon.classList.toggle("green");
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task-item")) {
    listGroupItem = e.target.closest(".list-group-item");
    taskText = listGroupItem.firstElementChild;
    checkIcon = listGroupItem.lastElementChild;
    deleteIcon = checkIcon.previousElementSibling;

    if (e.target === taskText) inputEditTask.value = taskText.textContent;
    else if (e.target === deleteIcon) deleteTask(listGroupItem);
    else checkTask(listGroupItem, taskText, checkIcon);
  }
});

btnEditTask.addEventListener("click", editTask);
inputEditTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    editTask();
    e.preventDefault();
  }
});

function switchDisplays(items, state) {
  items.forEach(function (item) {
    state === 0
      ? item.classList.add("d-none")
      : item.classList.remove("d-none");
  });
}

btnDeleteAll.addEventListener("click", function () {
  if (listGroup.childElementCount === 0) {
    modalDeleteAllTitle.textContent = "There is nothing to show here.";
    switchDisplays([btnNoDeleteAll, btnYesDeleteAll], 0);
  } else {
    modalDeleteAllTitle.textContent = "Do you want to delete the all tasks?";
    switchDisplays([btnNoDeleteAll, btnYesDeleteAll], 1);
    btnCloseDeleteAll.classList.add("d-none");
  }
});

btnYesDeleteAll.addEventListener("click", function () {
  while (listGroup.childElementCount > 0)
    for (const item of listGroup.children) item.remove();
  btnNoDeleteAll.click();
  btnCloseDeleteAll.classList.remove("d-none");
});
