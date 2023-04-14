function displaySessionData() {
  chrome.storage.session.get(null, function(data) {
    displayTotalVisits(data);
    displayDifferentSitesNumber(data);
    displayTime();
    displayTable(data, null);
  });
}

function displayTotalVisits(dictionary)
{
  const getTotalVisits = function(dictionary)
  {
    var count = 0;
    var values = Object.values(dictionary);
    for (const value of values) {
      count += value;
    }
    return count;
  }

  var p = document.createElement("div");
  p.innerHTML = "You visited a page <b>" + String(getTotalVisits(dictionary)) + "</b> times.";
  p.classList.add("info");
  document.body.append(p);
}

function displayDifferentSitesNumber(dictionary)
{
  var p = document.createElement("div");
  p.innerHTML = "You visited <b>" + Object.keys(dictionary).length + "</b> different sites.";
  p.classList.add("info");
  document.body.append(p);
}

function convertMillisecondsToHoursAndMinutes(milliseconds) 
{
  // Calculate the total number of minutes
  const totalMinutes = Math.floor(milliseconds / 60000);
  
  // Calculate the number of hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  // Build the string representation
  let str = "";
  if (hours > 0) {
    str += hours + " hour";
    if (hours > 1) {
      str += "s";
    }
  }
  if (minutes > 0) {
    if (str.length > 0) {
      str += " ";
    }
    str += minutes + " minute";
    if (minutes > 1) {
      str += "s";
    }
  }
  if (str.length == 0)
  {
    str = " some seconds";
  }
  return str;
}


function displayTime()
{
  var p = document.createElement("div");
  p.classList.add("info");
  document.body.append(p);  // First append, then set innerText as response might come slightly later
  chrome.runtime.sendMessage({type: "getElapsedTime"}, function(response) {
    // Update the HTML element with the elapsed time
    console.log(response.elapsedTime)
    p.innerHTML = "Your session is <b>" + convertMillisecondsToHoursAndMinutes(response.elapsedTime) + "</b> long.";
  });

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
    if (rows != null && count >= rows) break;

    // Create a div to hold the key-value pair
    const entryWrapper = document.createElement("div");
    switch (count)
    {
      case 0:
        entryWrapper.classList.add("entry-wrapper-gold");
        break;
      case 1:
        entryWrapper.classList.add("entry-wrapper-silver");    
        break;
      case 2:
        entryWrapper.classList.add("entry-wrapper-bronze");    
        break;
      default:
        entryWrapper.classList.add("entry-wrapper");    
        break;
    }
    //entryWrapper.classList.add("entry-wrapper");

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

