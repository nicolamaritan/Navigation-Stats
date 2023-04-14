var currentdate = new Date()
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
console.log("Service worker activated at " + datetime);

function update(url)
{
  // Getting stored value
  chrome.storage.session.get([url], function(result) {
    var visits = result[url];
    console.log("Value currently is " + (visits == undefined ? 0 : visits) + ".\n");
    // If the key was not saved, save it and set to 1
    if (visits == undefined)
    {
      chrome.storage.session.set({[url] : 1});
    }
    else  // Else increment by 1
    {
      chrome.storage.session.set({[url]: visits + 1});
    }
  });
}

function getBaseUrl(url) {
  let urlObj = new URL(url);
  return urlObj.origin;
}

var avoided_urls = ["chrome://newtab"]

// Listener for loading page to be completed
chrome.webNavigation.onCompleted.addListener(function(details) {
  var url = String(details.url);
  url = getBaseUrl(url);
  console.log("A page was loaded: " + url);
  if (url != "null" && !avoided_urls.includes(url))
  {
    update(url);
  }
});


// Set the start time when the extension is loaded
const startTime = new Date();

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "getElapsedTime") 
  {
    const currentTime = new Date();
    const elapsedTime = currentTime.getTime() - startTime.getTime();
    // Send the elapsed time back to the popup script
    sendResponse({elapsedTime: elapsedTime});
  }
});

