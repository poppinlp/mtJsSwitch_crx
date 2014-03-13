var jsSwitch = true,
    phpSwitch = true;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var url = details.url.toLowerCase();
        if (jsSwitch && url.indexOf('jsdebug') === -1 && url.indexOf('text') === -1) {
            url += url.indexOf('?') === -1 ? '?jsdebug=true' : '&jsdebug=true';
        }
        if (url.indexOf('phpdebug') === -1 && url.indexOf('test') !== -1) {
            if (phpSwitch) {
                url += url.indexOf('?') === -1 ? '?phpdebug=true' : '&phpdebug=true';
            } else {
                url += url.indexOf('?') === -1 ? '?phpdebug=false' : '&phpdebug=false';
            }
        }
        return {
            redirectUrl: url 
        };
    },{
        urls: ["*://*.meituan.com/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);
