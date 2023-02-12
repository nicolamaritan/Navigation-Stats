function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    displayTable(data, 10);
  });
}


function displayTable(dict, rows) {
  let table = document.createElement('table');
  
  // Sort by values (visits) in descending order
  let entries = Object.entries(dict);
  entries.sort(function(a, b) {return b[1] - a[1];});

  // Creates table
  for (let i = 0; i < Math.min(entries.length, rows); i++)
  {
    let [key, value] = entries[i];
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    cell1.innerHTML = key;
    let cell2 = document.createElement('td');
    cell2.innerHTML = value;
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  }
  document.body.appendChild(table);
}


  
displaySessionData();

