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
                window.location.reload();
                break;
            case 80: //phpdebug
                chrome.extension.connect({name: 'changePhpdebug'});
                window.location.reload();
                break;
            case 65: //jsalert
                chrome.extension.connect({name: 'changeJsalert'});
                window.location.reload();
                break;
        }
    }
});
