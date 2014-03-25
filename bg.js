var jsSwitch, phpSwitch, whiteList, alertSwitch, selTAb = 'settings',
    defaultWhitelist = [
        '^.*?:\\\/\\\/jiudian.meituan.com\\\/.*$',
        '^.*?:\\\/\\\/www.meituan.com\/acl\/account\/loginsso.*$',
    ];

chrome.storage.sync.get(['mtFESwitch_js', 'mtFESwitch_php', 'mtFESwitch_alert', 'mtFESwitch_whitelist'], function (obj) {
    jsSwitch = obj.mtFESwitch_js ? obj.mtFESwitch_js : true;
    phpSwitch = obj.mtFESwitch_php ? obj.mtFESwitch_php : true;
    alertSwitch = obj.mtFESwitch_alert ? obj.mtFESwitch_alert : true;
    if (obj.mtFESwitch_whitelist) {
        whiteList = obj.mtFESwitch_whitelist;
    } else {
        whiteList = defalutWhitelist;
        chrome.storage.sync.set({mtFESwitch_whitelist: whiteList});
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var url = details.url.toLowerCase(),
            len = whiteList.length,
            pattern;
        while (len--) {
            pattern = new RegExp(whiteList[len], 'ig');
            if (pattern.test(url)) return;
        }
        if (jsSwitch && url.indexOf('jsdebug') === -1 && url.indexOf('test') === -1) {
            url += url.indexOf('?') === -1 ? '?jsdebug=true' : '&jsdebug=true';
        }
        if (url.indexOf('phpdebug') === -1 && (url.indexOf('test') !== -1 || url.indexOf('dev.sankuai') !== -1)) {
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
        urls: ["*://*.meituan.com/*", "*://*.dev.sankuai.com/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);

chrome.extension.onConnect.addListener(function (msg) {
    chrome.tabs.connect(msg.sender.tab.id, {name: alertSwitch.toString()});
});
