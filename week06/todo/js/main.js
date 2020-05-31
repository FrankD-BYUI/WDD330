import * as ls from "./ls.js";
import * as td from "./ToDos.js";
import * as ut from "./utilities.js"

//set the display mode
let mode = document.getElementsByClassName("selected")[0].id;

//render the todo list to the page
td.renderList();

//Listen for the new task button
document.getElementById("new-task-button").addEventListener("click", newTask);

//listen for the complete checkbox
document.getElementById("list-container").addEventListener("click", () => {
  let targId = event.target.id;
  if (targId === parseInt(targId) + "-cb") {
    td.toggleChecked(event.target.id);
  }
});

//listen for Mode Change
document.getElementById("list-footer").addEventListener("click", () => ut.changeMode(event.target.id));

//listen for the delete button
document.getElementById("list-container").addEventListener("click", () => {
  let targId = event.target.id;
  if (targId === parseInt(targId) + "-del") {
    td.deleteItem(event.target.id);
  }
});

/*//debug only, clear all list items
document.getElementById("clear-list").addEventListener("click", ls.clearContent);
document.getElementById("clear-list").addEventListener("click", td.clearContent); */

function newTask() {
  td.addTask(document.getElementById("new-task-text").value);
  document.getElementById("new-task-text").value = "";
}

function setMode(newMode) {
  mode = newMode;
}

export {
  mode,
  setMode
}