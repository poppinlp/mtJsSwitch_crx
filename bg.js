chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var url = details.url.toLowerCase();
        if (url.indexOf('jsdebug') !== -1) return;
        url += url.indexOf('?') === -1 ? '?jsdebug=true' : '&jsdebug=true';
        return {
            redirectUrl: url 
        };
    },{
        urls: ["*://*.meituan.com/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(tab);
    chrome.tabs.executeScript(tabId, {
        file: "alert.js"
    });
});
