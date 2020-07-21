let page = 1;
let charIndex = "";
let linesPerPage = 10;

getCharIndex();
pageNum();

async function getCharIndex() {
  fetch("https://the-one-api.herokuapp.com/v1/character", {
      "method": "GET",
      "headers": {
        "Authorization": "Bearer vheiUkCg-kcvMNYEgwvN"
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      charIndex = jsonObject.docs;
      console.log(charIndex);
      renderPage();
    })
    .catch(error => {
      console.log(error);
    });
}

function renderPage() {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "";
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

function pageNum() {
  let next = document.getElementById("next");
  let prev = document.getElementById("prev");

  document.getElementById("pageNum").value = page;
  if (parseInt(page) === 1) {
    prev.disabled = "disabled";
  } else if (prev.disabled) {
    prev.removeAttribute("disabled");
  }
  if (parseInt(page) === Math.ceil(charIndex.length / linesPerPage)) {
    next.disabled = "disabled";
  } else if (next.disabled) {
    next.removeAttribute("disabled");
  }
}

function nextPage() {
  if (page < Math.ceil(charIndex.length / linesPerPage)) {
    page++;
  }
  pageNum();
  renderPage();
}

function prevPage() {
  if (page > 1) {
    page--;
  }
  pageNum();
  renderPage();
}

function setPage() {
  let newPage = document.getElementById("pageNum").value;
  if (newPage < 1) {
    newPage = 1;
  } else if (newPage > Math.ceil(charIndex.length / linesPerPage)) {
    newPage = Math.ceil(charIndex.length / linesPerPage);
  }
  page = newPage;
  pageNum();
  renderPage();
}