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

/* 轮播图 */
var focus = document.querySelector('.focus');
//获取盒子宽度
var boxWidth = focus.offsetWidth;

/* 鼠标经过离开显示前一张后一张按钮 */
var Left_arrow = document.querySelector('#Left_arrow');
var Right_arrow = document.querySelector('#Right_arrow');
focus.addEventListener('mouseenter', function () {
    Left_arrow.style.display = 'block';
    Right_arrow.style.display = 'block';

    //鼠标放入清除计时器
    clearInterval(Time1);
    Time1 = null;
});
focus.addEventListener('mouseleave', function () {
    Left_arrow.style.display = 'none';
    Right_arrow.style.display = 'none';

    //离开重置计算器
    Time1 = setInterval(function () {
        Right_arrow.click();
    }, 3000);
});

/* 进入页面开始自动播放 */
var Time1 = setInterval(function () {
    Right_arrow.click();  //每3秒自动点击向右的按钮
}, 3000);

/* 动态生成小圆圈 */
var image = document.querySelector('.focusImg');
var dot_location = document.querySelector('#dot_location');
for (var i = 0; i < image.children.length; i++) {
    var li1 = document.createElement('li');

    //为每个li设置索引号
    li1.setAttribute('data-index', i);

    dot_location.appendChild(li1);

    // 单击小圆点高亮，并且其它小圆点不变
    li1.addEventListener('click', function () {
        for (var i = 0; i < dot_location.children.length; i++) {
            dot_location.children[i].className = '';
        }
        this.className = 'fir';

        /* 点击圆点改变图片 */
        var index = this.getAttribute('data-index');

        //让点击按钮和点击小圆圈时显示的图片一样
        num = index;
        circle = index;

        //随着小圆点更换图片
        animate(image, -index * boxWidth);
    });
};

/* 刷新时第一个小点高亮 */
dot_location.children[0].className = 'fir';

/* 点击左右按钮切换图片 */
var num = 0;  //按钮点击变量，每次点击自增一次
var circle = 0;  //小圆点变量

/* 复制图片实现无缝滚动 */
//复制第一张图片，把图片复制到ul最后
image.appendChild(image.children[0].cloneNode(true));

//清除并赋予样式封装
function GiveStyle() {
    for (var i = 0; i < dot_location.children.length; i++) {
        dot_location.children[i].className = '';
    };
    dot_location.children[circle].className = 'fir';
};

//左边按钮功能
Left_arrow.addEventListener('click', function () {
    if (num == 0) {
        image.style.left = -num * boxWidth + 'px';
        num = image.children.length - 1;
    };
    num--;
    animate(image, -num * boxWidth);

    //点击按钮小圆圈跟着移动
    circle--;
    if (circle < 0) {  //如果是第一张下一次到最后一张图
        circle = dot_location.children.length - 1;
    };
    GiveStyle();  //重置样式
});

// 右边按钮功能
Right_arrow.addEventListener('click', function () {
    if (num == image.children.length - 1) { //如果到最后一张图片就把num改成第一张索引
        image.style.left = 0;
        num = 0;
    };
    num++;
    animate(image, -num * boxWidth);

    //点击按钮小圆圈跟着移动
    circle++;
    if (circle == dot_location.children.length) {  //如果到最后一个就从头开始
        circle = 0;
    };
    GiveStyle();
});

/* 跑马灯效果 */
//轮播图
var mySwiper = new Swiper('.mn-swiper', {
    autoplay: true,
    touchRatio: 1,
    speed: 3000,  //匀速时间
    loop: true,
    freeMode: true,  //设置为true则变为free模式
    slidesPerView: 4,
    slidesPerGroup: 1,
})
//鼠标移入悬停
$('.swiper-container').on('mouseenter', function () {
    mySwiper.stopAutoplay();
})
//鼠标移出滚动
$('.swiper-container').on('mouseleave', function () {
    mySwiper.startAutoplay();
})

/* 鼠标经过导航栏改变颜色 */
$('.ddItem li').mouseover(function () {
    $(this).children().css('color', '#c81623');

    /* 鼠标经过改变详细图片 */
    $('.ddImg').css('display', 'block');
    var index = $(this).index();
    $('.ddImg div').eq(index).show().siblings().hide();
});
$('.ddItem li').mouseout(function () {
    $('.ddImg').css('display', 'none');
    $(this).children().css('color', '#fff');
});

/* 倒计时 */
var endhour = document.querySelector('.hour');
var endminute = document.querySelector('.minute');
var endsecond = document.querySelector('.second');

Time();
setInterval(Time, 1000);

function Time() {
    var now = +new Date();
    var end = +new Date('2222/1/1 00:00:00');    //此处必须大于当前时间
    var remaining = end - now;

    //剩余秒数
    var endTime = remaining / 1000;

    //时
    huor = parseInt(endTime / 60 / 60 % 24);
    endhour.innerHTML = huor < 10 ? '0' + huor : huor;

    //分
    minute = parseInt(endTime / 60 % 60);
    endminute.innerHTML = minute < 10 ? '0' + minute : minute;

    //秒
    second = parseInt(endTime % 60);
    endsecond.innerHTML = second < 10 ? '0' + second : second;
}