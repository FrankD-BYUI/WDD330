export function getApiData(url, callback) {
  fetch(url, {
      "method": "GET",
      "headers": {
        "Authorization": "Bearer vheiUkCg-kcvMNYEgwvN"
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      callback(jsonObject);
    })
    .catch(error => {
      console.log(error);
    });
}