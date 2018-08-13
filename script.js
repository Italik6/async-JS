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
