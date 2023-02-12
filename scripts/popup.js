function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    console.log(data);
  });
  displayTable(data);
}

function displayTable(dict) {
  var keys = Object.keys(dict);
  var values = Object.values(dict);

  var table = "<table><tr><th>Key</th><th>Value</th></tr>";

  for (var i = 0; i < keys.length; i++)
  {
    table += "<tr><td>" + keys[i] + "</td><td>" + values[i] + "</td></tr>";
  }

  table += "</table>";

  document.write(table);
}
  
displaySessionData();

