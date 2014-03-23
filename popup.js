var bg = chrome.extension.getBackgroundPage();

$(function () {
    if (bg.jsSwitch) {
        $(".btn-js").attr('checked', 'checked');
    }
    if (bg.alertSwitch) {
        $(".btn-alert").attr('checked', 'checked');
    }
    if (bg.phpSwitch) {
        $(".btn-php").attr('checked', 'checked');
    }
    if (bg.selTab === 'settings') {
        $('.nav a').eq(0).addClass('active');
        $('.whitelist').hide();
    } else {
        $('.nav a').eq(1).addClass('active');
        $('.settings').hide();
    }
});

$(".btn-alert").click(function () {
    if (bg.alertSwitch) {
        bg.alertSwitch = false;
        chrome.storage.sync.set({mtFESwitch_alert: false});
    } else {
        bg.alertSwitch = true;
        chrome.storage.sync.set({mtFESwitch_alert: true});
    }
});

$(".btn-js").click(function () {
    if (bg.jsSwitch) {
        bg.jsSwitch = false;
        chrome.storage.sync.set({mtFESwitch_js: false});
    } else {
        bg.jsSwitch = true;
        chrome.storage.sync.set({mtFESwitch_js: true});
    }
});

$(".btn-php").click(function () {
    if (bg.phpSwitch) {
        bg.phpSwitch = false;
        chrome.storage.sync.set({mtFESwitch_php: false});
    } else {
        bg.phpSwitch = true;
        chrome.storage.sync.set({mtFESwitch_php: true});
    }
});

$(".nav").delegate('a', 'click', function () {
    var name = $(this).data('name');
    if (bg.selTab === name) return;
    if (name === 'whitelist') {
        $('.nav a').eq(0).removeClass('active')
        $('.settings').hide();
        $('.whitelist').show();
        bg.selTab = 'whitelist';
    } else {
        $('.nav a').eq(1).removeClass('active')
        $('.whitelist').hide();
        $('.settings').show();
        bg.selTab = 'settings';
    }
    $(this).addClass('active');
});
