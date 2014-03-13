var bg = chrome.extension.getBackgroundPage();
$(function () {
    if (bg.jsSwitch) {
        $("#btn-js").val('已开启');
    } else {
        $("#btn-js").val('已关闭');
    }
    if (bg.phpSwitch) {
        $("#btn-php").val('已开启');
    } else {
        $("#btn-php").val('已关闭');
    }
});
$("#btn-js").click(function () {
    if (bg.jsSwitch) {
        bg.jsSwitch = false;
        chrome.storage.sync.set({mtFESwitch_js: false}, function () {
            $("#btn-js").val('已关闭');
        });
    } else {
        bg.jsSwitch = true;
        chrome.storage.sync.set({mtFESwitch_js: true}, function () {
            $("#btn-js").val('已开启');
        });
    }
});
$("#btn-php").click(function () {
    if (bg.phpSwitch) {
        bg.phpSwitch = false;
        chrome.storage.sync.set({mtFESwitch_php: false}, function () {
            $("#btn-php").val('已关闭');
        });
    } else {
        bg.phpSwitch = true;
        chrome.storage.sync.set({mtFESwitch_php: true}, function () {
            $("#btn-php").val('已开启');
        });
    }
});
