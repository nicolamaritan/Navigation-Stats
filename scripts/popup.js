function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    displayTable(data);
  });
}

function displayTable(dict) {
  let table = document.createElement('table');
  for (let key in dict) {
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    cell1.innerHTML = key;
    let cell2 = document.createElement('td');
    cell2.innerHTML = dict[key];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  }
  document.body.appendChild(table);
}
  
displaySessionData();

