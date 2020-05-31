import * as ls from "./ls.js";
import * as ut from "./utilities.js";
import * as m from "./main.js";

let todoList = ls.loadTodoList();
console.log(todoList);


class Todo {
  constructor(text) {
    this.id = Date.now();
    this.content = text;
    this.completed = false;
  }
}

function addTask(newTaskText) {
  let newTask = new Todo(newTaskText)
  todoList.push(newTask);
  console.log(todoList);
  ls.saveTodoList(todoList);
  renderList();
}

//Debug only, clear everything from the list
function clearContent() {
  todoList = [];
  console.log(todoList);
}

function renderList() {
  document.getElementById("list-container").innerHTML = '';
  todoList.forEach(item => ut.renderListItem(item, m.mode));

  let taskCount = 0;
  todoList.forEach(item => {
    if (!item.completed) {
      taskCount++;
    }
  })
  document.getElementById("task-count").textContent = taskCount;
}

function toggleChecked(taskId) {
  //alert(taskId);
  todoList.forEach(task => {
    if (task.id === parseInt(taskId)) {
      task.completed = !task.completed;
      ls.saveTodoList(todoList);
      renderList();
    }
  });
}

function deleteItem(taskId) {
  let i = 0;
  todoList.forEach(task => {
    if (task.id === parseInt(taskId)) {
      todoList.splice(i, 1);
      ls.saveTodoList(todoList);
      renderList();
    }
    i++;
  });
}

export default class {
  Todo
};
export {
  addTask,
  clearContent,
  renderList,
  toggleChecked,
  deleteItem
}