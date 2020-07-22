import * as ind from "./index.js";

//This module contains files related to manipulating
//the page selectors at the bottom of the home page.

export function nextPage() {
  if (ind.getPage() < Math.ceil(ind.getCharIndexVar().length / ind.getLinesPerPage())) {
    ind.setPage(ind.getPage() + 1);
    ind.renderPage();
  }
}

export function prevPage() {
  if (ind.getPage() > 1) {
    ind.setPage(ind.getPage() - 1);
    ind.renderPage();
  }
}

export function setPage() {
  let newPage = document.getElementById("pageNum").value;
  if (newPage < 1) {
    newPage = 1;
  } else if (newPage > Math.ceil(ind.getCharIndexVar().length / ind.getLinesPerPage())) {
    newPage = Math.ceil(ind.getCharIndexVar().length / ind.getLinesPerPage());
  }
  ind.setPage(parseInt(newPage));
  ind.renderPage();
}

export function pageFormSubmit(event) {
  event.preventDefault();
  setPage();
}

// disables/enables next and prev buttons as needed 
// and add page number to box in HTML
export function pageNum() {
  let next = document.getElementById("next");
  let prev = document.getElementById("prev");

  document.getElementById("pageNum").value = ind.getPage();
  if (parseInt(ind.getPage()) === 1) {
    prev.disabled = "disabled";
  } else if (prev.disabled) {
    prev.removeAttribute("disabled");
  }
  if (parseInt(ind.getPage()) === Math.ceil(ind.getCharIndexVar().length / ind.getLinesPerPage())) {
    next.disabled = "disabled";
  } else if (next.disabled) {
    next.removeAttribute("disabled");
  }
}