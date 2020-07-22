//This file contains functions for interacting with local storage

export function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getData(name) {
  let savedData = localStorage.getItem(name);
  if (savedData) {
    return JSON.parse(savedData);
  } else {
    return false;
  }
}