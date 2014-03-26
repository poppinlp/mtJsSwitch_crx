var jsSwitch, phpSwitch, whiteList, alertSwitch, selTab,
    defaultWhitelist = [
        '^.*?:\\\/\\\/jiudian.meituan.com\\\/.*$',
        '^.*?:\\\/\\\/www.meituan.com\/acl\/account\/loginsso.*$',
    ];

chrome.storage.sync.get(['mtFESwitch_js', 'mtFESwitch_php', 'mtFESwitch_alert', 'mtFESwitch_whitelist', 'mtFESwitch_selTab'], function (obj) {
    jsSwitch = obj.mtFESwitch_js ? obj.mtFESwitch_js : true;
    phpSwitch = obj.mtFESwitch_php ? obj.mtFESwitch_php : true;
    alertSwitch = obj.mtFESwitch_alert ? obj.mtFESwitch_alert : true;
    selTab = obj.mtFESwitch_selTab ? obj.mtFESwtich_selTab : 'settings';
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
            pattern, index, index2;

        // whitelist
        while (len--) {
            pattern = new RegExp(whiteList[len], 'ig');
            if (pattern.test(url)) return;
        }

        // jsdebug
        if (url.indexOf('test') === -1 && url.indexOf('dev.sankuai.com') === -1) {
            index = url.indexOf('jsdebug');
            if (jsSwitch) {
                if (index === -1) {
                    url += url.indexOf('?') === -1 ? '?jsdebug=true' : '&jsdebug=true';
                } else {
                    pattern = /.*?jsdebug=.*?&.*/gi;
                    if (pattern.test(url)) {
                        index2 = (url.slice(index)).indexOf('&');
                        url = url.slice(0, index) + 'jsdebug=true' + url.slice(index2 + index);
                    } else {
                        url = url.slice(0, index) + 'jsdebug=true';
                    }
                }
            } else {
                if (index !== -1) {
                    pattern = /.*?jsdebug=.*?&.*/gi;
                    if (pattern.test(url)) {
                        index2 = (url.slice(index)).indexOf('&');
                        url = url.slice(0, index) + url.slice(index2 + index + 1);
                    } else {
                        url = url.slice(0, index - 1);
                    }
                }
            }
        }

        // phpdebug
        if (url.indexOf('test') !== -1 || url.indexOf('dev.sankuai.com') !== -1) {
            index = url.indexOf('phpdebug');
            if (phpSwitch) {
                if (index === -1) {
                    url += url.indexOf('?') === -1 ? '?phpdebug=true' : '&phpdebug=true';
                } else {
                    pattern = /.*?phpdebug=.*?&.*/gi;
                    if (pattern.test(url)) {
                        index2 = (url.slice(index)).indexOf('&');
                        url = url.slice(0, index) + 'phpdebug=true' + url.slice(index2 + index);
                    } else {
                        url = url.slice(0, index) + 'phpdebug=true';
                    }
                }
            } else {
                if (index === -1) {
                    url += url.indexOf('?') === -1 ? '?phpdebug=false' : '&phpdebug=false';
                } else {
                    pattern = /.*?phpdebug=.*?&.*/gi;
                    if (pattern.test(url)) {
                        index2 = (url.slice(index)).indexOf('&');
                        url = url.slice(0, index) + 'phpdebug=false' + url.slice(index2 + index);
                    } else {
                        url = url.slice(0, index) + 'phpdebug=false';
                    }
                }
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
    switch (msg.name) {
        case 'isJsAlertOpen':
            chrome.tabs.connect(msg.sender.tab.id, {name: alertSwitch.toString()});
            break;
        case 'changeJsdebug':
            jsSwitch = !jsSwitch;
            chrome.storage.sync.set({mtFESwitch_js: jsSwitch});
            break;
        case 'changePhpdebug':
            phpSwitch = !phpSwitch;
            chrome.storage.sync.set({mtFESwitch_php: phpSwitch});
            break;
        case 'changeJsalert':
            alertSwitch = !alertSwitch;
            chrome.storage.sync.set({mtFESwitch_alert: alertSwitch});
            break;
    }
});
