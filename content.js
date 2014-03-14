var url = window.location.href;
// chrome和safari会忽略window.onerror，所以用了jquery来绑这个事件
$(window).error(function() {
    alert('Javascript error');
});
