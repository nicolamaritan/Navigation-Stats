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

// Listener for loading page to be completed
chrome.webNavigation.onCompleted.addListener(function(details) {
  var url = String(details.url);
  console.log("A page was loaded: " + url);
  update(url);
});


