chrome.extension.connect({name: 'isJsAlertOpen'});

chrome.extension.onConnect.addListener(function (msg) {
    if (msg.name === 'true') {
        $(window).error(function() {
            alert('Javascript error');
        });
    }
});

$(window).keydown(function (e) {
    if (e.ctrlKey) {
        switch (e.keyCode) {
            case 74: //jsdebug
                chrome.extension.connect({name: 'changeJsdebug'});
                break;
            case 80: //phpdebug
                chrome.extension.connect({name: 'changePhpdebug'});
                break;
            case 65: //jsalert
                chrome.extension.connect({name: 'changeJsalert'});
                break;
        }
        window.location.reload();
    }
});
