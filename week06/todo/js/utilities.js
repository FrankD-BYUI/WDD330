import * as m from "./main.js";
import * as td from "./ToDos.js";

function renderListItem(listItem) {
  if (m.mode === "all") {
    generateHTML(listItem);
  } else if (m.mode === "active" && !listItem.completed) {
    generateHTML(listItem);
  } else if (m.mode === "complete" && listItem.completed) {
    generateHTML(listItem);
  } else {
    return null;
  }
}

function generateHTML(listItem) {
  let lr = document.createElement("div");
  lr.classList.add("list-row");

  let cb = document.createElement("div");
  cb.classList.add("check-box");
  cb.id = listItem.id + "-cb";
  if (listItem.completed) {
    cb.classList.add("checked");
    cb.innerHTML = "&#9746;";
  } else {
    cb.classList.add("unchecked");
    cb.innerHTML = "&#9744;";
  }
  lr.appendChild(cb);

  let tx = document.createElement("div");
  tx.classList.add("task-text");
  tx.textContent = listItem.content;
  if (listItem.completed) {
    tx.classList.add("task-complete");
  }
  lr.appendChild(tx);

  let td = document.createElement("div");
  td.classList.add("task-del");
  td.innerHTML = "&#9747;";
  td.id = listItem.id + "-del";
  lr.appendChild(td);

  document.getElementById("list-container").appendChild(lr);
}

function changeMode(selectedMode) {
  if (selectedMode === "list-footer" || selectedMode === "tasks-left" || selectedMode === m.mode) {
    return null;
  } else {
    document.getElementById(m.mode).classList.toggle("selected");
    document.getElementById(selectedMode).classList.toggle("selected");
    m.setMode(selectedMode);
    td.renderList();
  }
}

export {
  renderListItem,
  changeMode
};