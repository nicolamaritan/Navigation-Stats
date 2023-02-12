function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    displayTable(data, 10);
  });
}

function displayTotalVisits(dictionary)
{
  const getTotalVisits = function(dictionary)
  {
    var count = 0;
    var entries = Object.entries(dictionary);
    for (const entry of entries) {
      count += entry;
    }
    return count;
  }

  var p = document.createEvent("p");
  p.innerHTML = "You visited " + String(getTotalVisits(dictionary)) + " sites.";
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

