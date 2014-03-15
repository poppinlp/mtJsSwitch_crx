chrome.extension.connect();
chrome.extension.onConnect.addListener(function (msg) {
    if (msg.name === 'true') {
        $(window).error(function() {
            alert('Javascript error');
        });
    }
});
