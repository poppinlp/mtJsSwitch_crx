var jsSwitch, phpSwitch, whiteList, alertSwitch, selTab,
    defaultWhitelist = [
        '^.*?:\\\/\\\/jiudian.meituan.com\\\/.*$',
        '^.*?:\\\/\\\/www.meituan.com\/acl\/account\/loginsso.*$',
    ];

jsSwitch = localStorage.mtFESwitch_js ? localStorage.mtFESwitch_js : true;
phpSwitch = localStorage.mtFESwitch_php ? localStorage.mtFESwitch_php : true;
alertSwitch = localStorage.mtFESwitch_alert ? localStorage.mtFESwitch_alert : true;
selTab = localStorage.mtFESwitch_selTab ? localStorage.mtFESwtich_selTab : 'settings';
if (localStorage.mtFESwitch_whitelist) {
    whiteList = localStorage.mtFESwitch_whitelist;
} else {
    whiteList = defaultWhitelist;
    localStorage.setItem('mtFESwitch_whiteList', whiteList);
}

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
            localStorage.setItem('mtFESwitch_js', jsSwitch);
            break;
        case 'changePhpdebug':
            phpSwitch = !phpSwitch;
            localStorage.setItem('mtFESwitch_php', phpSwitch);
            break;
        case 'changeJsalert':
            alertSwitch = !alertSwitch;
            localStorage.setItem('mtFESwitch_alert', alertSwitch);
            break;
    }
});


