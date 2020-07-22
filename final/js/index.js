import * as ls from "./ls.js";
import * as p from "./pages.js";
import {
  getApiData
} from "./api.js"

//This file contains functions required to operate the home page.

let page = 1;
let linesPerPage = 10;
let charIndex = ls.getData("charIndex");
const apiUrl = "https://the-one-api.herokuapp.com/v1/character";

if (charIndex) {
  renderPage();
} else {
  getApiData(apiUrl, onApiLoad);
}

// Add listeners
document.getElementById("prev").addEventListener("click", p.prevPage);
document.getElementById("next").addEventListener("click", p.nextPage);
document.getElementById("goBtn").addEventListener("click", p.setPage);
document.getElementById("pageForm").addEventListener("submit", p.pageFormSubmit);

function onApiLoad(data) {
  charIndex = data.docs;
  ls.saveData("charIndex", data.docs)
  //console.log(charIndex);
  renderPage();
}

export function renderPage() {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "";
  p.pageNum();
  for (let i = (page - 1) * linesPerPage; i < page * linesPerPage && i < charIndex.length; i++) {
    let li = document.createElement("li");
    let a = buildListEntry(charIndex[i]);
    if (a) {
      li.appendChild(a);
      dataList.appendChild(li);
    }
  }
  document.getElementById("pageCount").textContent = Math.ceil(charIndex.length / linesPerPage);
}

function buildListEntry(characterDetails) {
  if (characterDetails.name.includes("User") || characterDetails.name.includes("MINOR_CHARACTER")) {
    return null;
  }
  let entry;
  let a = document.createElement("a");
  a.href = `./character.html?id=${characterDetails._id}`

  entry = characterDetails.name;
  if (characterDetails.gender || characterDetails.race) {
    entry += ",";
  }
  if (characterDetails.gender) {
    entry += ` ${characterDetails.gender}`
  }
  if (characterDetails.race) {
    entry += ` ${characterDetails.race}`
  }
  a.textContent = entry;
  return a;
}

export function getPage() {
  return page;
}

export function setPage(newPage) {
  page = newPage;
}

export function getLinesPerPage() {
  return linesPerPage;
}

export function getCharIndexVar() {
  return charIndex;
}