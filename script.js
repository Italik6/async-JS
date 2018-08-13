function createCode(data) {
  var code = document.createElement("CODE");
  var t = document.createTextNode(data);
  code.appendChild(t);
  document.body.appendChild(code);
  code.style.display = "block";
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
      mapData(result);
    }
  };

  http.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  http.send();
}

//jQuery
function jQuery() {
  $.get("https://jsonplaceholder.typicode.com/users", function(data) {
    mapData(data);
  });
}

//callback
function Callbacks() {
  $.ajax({
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    success: function(data) {
      mapData(data);
    },
    error: function(jqXHR, textStatus, error) {
      alert(error);
    }
  });
}

//promises
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
      mapData(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

//generators
function Generators() {
  genWrap(function*() {
    var data = yield $.get("https://jsonplaceholder.typicode.com/users");
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
