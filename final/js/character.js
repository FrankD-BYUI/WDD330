import {
  getApiData
} from "./api.js"
import * as ls from "./ls.js";

let params = new URLSearchParams(document.location.search.substring(1));
let charId = params.get("id");
let apiurl = `https://the-one-api.herokuapp.com/v1/character/${charId}`;
let charData = ls.getData(charId);

if (charData) {
  renderPage(charData);
} else {
  getApiData(apiurl, onApiLoad);
}

function onApiLoad(data) {
  charData = data;
  ls.saveData(charId, charData);
  renderPage();
}

function renderPage() {
  let dataPoints = ["name", "gender", "race", "realm", "spouse", "birth", "death", "hair", "height"]
  for (let i = 0; i < dataPoints.length; i++) {
    if (charData[dataPoints[i]]) {
      document.getElementById(dataPoints[i]).textContent = charData[dataPoints[i]];
    } else {
      document.getElementById(dataPoints[i]).textContent = "Unknown";
    }
  }
  document.getElementById("wiki").href = charData["wikiUrl"];
}