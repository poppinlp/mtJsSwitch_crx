var url = window.location.href;
if (url.indexOf('test') === -1) {
    $(window).error(function() {
        alert('Javascript error');
    });
}
