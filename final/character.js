let params = new URLSearchParams(document.location.search.substring(1));
let charId = params.get("id");
console.log(charId);
getChar();

async function getChar() {
  fetch(`https://the-one-api.herokuapp.com/v1/character/${charId}`, {
      "method": "GET",
      "headers": {
        "Authorization": "Bearer vheiUkCg-kcvMNYEgwvN"
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      console.log(jsonObject);
      fillCharData(jsonObject);
    })
    .catch(error => {
      console.log(error);
    });
}

function fillCharData(charData) {
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