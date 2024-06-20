//点击s获取焦点
var jd = document.querySelector('#stxt');
document.addEventListener('keyup', function (e) {
    if (e.key == 's' || e.key == 'S') {
        jd.focus();
        jd.style.backgroundColor = '#f9f9f9';
    }
});
jd.addEventListener('blur', function () {
    jd.style.backgroundColor = '#ebebeb';
});
jd.addEventListener('focus', function () {
    jd.style.backgroundColor = '#f9f9f9';
});

$('.sk_con>ul>li').hover(function () {
    $(this).children('ul').stop().slideToggle(400);
});
$('.sk_list>ul>li').hover(function () {
    $(this).children('ul').stop().slideToggle(400);
});