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

/* 使用标签页通信实现购物车里面物品数量的实时显示 */
/* 使用BroadcastChannel */
/* 这是接收页 */
// 创建一个广播通道
const channel = new BroadcastChannel('myChannel');
// 监听消息事件
channel.onmessage = function (event) {
    const message = event.data;
    document.querySelector('.count').innerHTML=message;
    //message是监听到的信息
};
