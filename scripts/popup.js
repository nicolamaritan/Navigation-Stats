function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    displayTable(data, 10);
  });
}


function displayTable2(dict, rows) {
  let table = document.createElement('table');
  table.classList.add('main-table');
    
  // Sort by values (visits) in descending order
  let entries = Object.entries(dict);
  entries.sort(function(a, b) {return b[1] - a[1];});

  // Creates table
  for (let i = 0; i < Math.min(entries.length, rows); i++)
  {
    let [key, value] = entries[i];
    let row = document.createElement('tr');
    row.classList.add('main-row');
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

function displayTable(dictionary, rows) {
  // Create a styles element and add it to the head of the document
  const styles = document.createElement("style");
  document.head.appendChild(styles);

  // Sort the entries in descending order of their integer value
  const entries = Object.entries(dictionary);
  entries.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));

  let count = 0;
  for (const entry of entries) {
    if (count >= rows) break;

    // Create a div to hold the key-value pair
    const entryWrapper = document.createElement("div");
    entryWrapper.classList.add("entry-wrapper");

    // Create the key element
    const keyElement = document.createElement("div");
    keyElement.innerHTML = entry[0];
    keyElement.classList.add("key");

    // Create the value element
    const valueElement = document.createElement("div");
    valueElement.innerHTML = entry[1];
    valueElement.classList.add("value");

    // Append the key and value elements to the entry wrapper
    entryWrapper.appendChild(keyElement);
    entryWrapper.appendChild(valueElement);

    // Add the entry wrapper to the page
    document.body.appendChild(entryWrapper);

    count++;
  }
}


  
displaySessionData();

