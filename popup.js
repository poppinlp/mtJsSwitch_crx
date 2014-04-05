var bg = chrome.extension.getBackgroundPage();

$(function () {
    var len = bg.whiteList.length, res = '';
    if (bg.jsSwitch != 'false') {
        $(".btn-js").attr('checked', 'checked');
    }
    if (bg.alertSwitch != 'false') {
        $(".btn-alert").attr('checked', 'checked');
    }
    if (bg.phpSwitch != 'false') {
        $(".btn-php").attr('checked', 'checked');
    }
    if (bg.selTab === 'settings') {
        $('.nav a').eq(0).addClass('active');
        $('.whitelist').hide();
    } else {
        $('.nav a').eq(1).addClass('active');
        $('.settings').hide();
    }
    while (len--) {
        res += '<li><p>' + bg.whiteList[len] + '</p><a data-val="' + bg.whiteList[len] + '" href="javascript:void(0)">删除</a></li>';
    }
    $(".whitelist-content").html(res);
});

$(".btn-alert").click(function () {
    if (bg.alertSwitch) {
        bg.alertSwitch = false;
        localStorage.setItem('mtFESwitch_alert', false);
    } else {
        bg.alertSwitch = true;
        localStorage.setItem('mtFESwitch_alert', true);
    }
});

$(".btn-js").click(function () {
    if (bg.jsSwitch) {
        bg.jsSwitch = false;
        localStorage.setItem('mtFESwitch_js', false);
    } else {
        bg.jsSwitch = true;
        localStorage.setItem('mtFESwitch_js', true);
    }
});

$(".btn-php").click(function () {
    if (bg.phpSwitch) {
        bg.phpSwitch = false;
        localStorage.setItem('mtFESwitch_php', false);
    } else {
        bg.phpSwitch = true;
        localStorage.setItem('mtFESwitch_php', true);
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
        localStorage.setItem('mtFESwitch_setTab', 'whitelist');
    } else {
        $('.nav a').eq(1).removeClass('active')
        $('.whitelist').hide();
        $('.settings').show();
        bg.selTab = 'settings';
        localStorage.setItem('mtFESwitch_setTab', 'settings');
    }
    $(this).addClass('active');
});
$(".whitelist-add a").click(function () {
    var content = $(".whitelist-input").val();
    if (content !== '') {
        bg.whiteList.push(content);
        $(".whitelist-content").append('<li><p>' + content + '</p><a data-val="' + content + '" href="javascript:void(0)">删除</a></li>');
        localStorage.setItem('mtFESwitch_whitelist', bg.whiteList);
    }
});
$(".whitelist-content").delegate('a', 'click', function () {
    $(this).parents('li').hide();
    bg.whiteList.splice(bg.whiteList.indexOf($(this).data('val')), 1);
    localStorage.setItem('mtFESwitch_whitelist', bg.whiteList);
});
