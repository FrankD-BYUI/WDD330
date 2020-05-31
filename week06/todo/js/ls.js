function saveTodoList(todoList) {
  localStorage.setItem("savedTodoList", JSON.stringify(todoList));
}

function loadTodoList() {
  let savedTodoList = localStorage.getItem("savedTodoList");
  if (savedTodoList) {
    return JSON.parse(savedTodoList);
  } else {
    return [];
  }
}

function clearContent() {
  localStorage.clear();
}

export {
  saveTodoList,
  loadTodoList,
  clearContent
};