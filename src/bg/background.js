chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

function click(e) 
{
	console.log('Button clicked');
	chrome.tabs.query({currentWindow:true, active:true}, function(tabs) {
		var specTab = tabs[0];
		console.log(specTab.id);
		chrome.tabs.executeScript(specTab.id, {file:"/js/jquery/jquery.min.js"});
		chrome.tabs.executeScript(specTab.id, {file:"/inject/inject.js"});
		
	});
}

chrome.browserAction.onClicked.addListener(click);