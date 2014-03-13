var url = window.location.href;
if (url.indexOf('test') === -1) {
    window.onerror = function () { alert('jserror'); };
}
