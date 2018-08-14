var placeForData = document.getElementById("code");
// Create code tag for data
function createCode(data) {
  var code = document.createElement("CODE");
  var t = document.createTextNode(data);
  code.appendChild(t);
  placeForData.appendChild(code);
  code.style.display = "block";
}
// Create title for methods
function createTitle(string) {
  placeForData.innerHTML = "";
  var title = document.createElement("P");
  var t2 = document.createTextNode(string);
  title.appendChild(t2);
  placeForData.appendChild(title);
}

function mapData(data) {
  data.map(x => createCode(x.name));
}

// Ajax requests
// vanilla.js
function AjaxVanillaJs() {
  var http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      var result = JSON.parse(http.response);

      createTitle("Ajax - vanilla JS");
      mapData(result);
    }
  };

  http.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  http.send();
}

// jQuery
function jQuery() {
  $.get("https://jsonplaceholder.typicode.com/users", function(data) {
    createTitle("jQuery");
    mapData(data);
  });
}

// Callback
function Callbacks() {
  $.ajax({
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    success: function(data) {
      createTitle("Callbacks");
      mapData(data);
    },
    error: function(jqXHR, textStatus, error) {
      alert(error);
    }
  });
}

// Promises
function get(url) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.response));
      } else {
        reject(xhttp.statusText);
      }
    };
    xhttp.onerror = function() {
      reject(xhttp.statusText);
    };
    xhttp.send();
  });
}

function Promises() {
  var promise = get("https://jsonplaceholder.typicode.com/users");
  promise
    .then(function(data) {
      createTitle("Promises");
      mapData(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// Generators
function Generators() {
  genWrap(function*() {
    var data = yield $.get("https://jsonplaceholder.typicode.com/users");
    createTitle("Generators");
    mapData(data);
  });

  function genWrap(generator) {
    var gen = generator();

    function handle(yielded) {
      if (!yielded.done) {
        yielded.value.then(function(data) {
          return handle(gen.next(data));
        });
      }
    }
    return handle(gen.next());
  }
}

// Fetch
function Fetch() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      return response.json();
    })
    .then(data => {
      createTitle("Fetch");
      mapData(data);
    })
    .catch(err => {
      console.log(err);
    });
}

// Async/await
async function FetchAsync() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  var result = response.json();
  result.then(function(data) {
    createTitle("Async/await");
    mapData(data);
  });
}

// Axios
function Axios() {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      createTitle("Axios");
      mapData(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}
