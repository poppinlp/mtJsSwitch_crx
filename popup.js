$("#btn-js").click(function () {
    var bg = chrome.extension.getBackgroundPage();
    if (bg.jsSwitch) {
        bg.jsSwitch = false;
        $(this).val('已关闭');
    } else {
        bg.jsSwitch = true;
        $(this).val('已开启');
    }
});
$("#btn-php").click(function () {
    var bg = chrome.extension.getBackgroundPage();
    if (bg.phpSwitch) {
        bg.phpSwitch = false;
        $(this).val('已关闭');
    } else {
        bg.phpSwitch = true;
        $(this).val('已开启');
    }
});
