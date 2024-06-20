//点击s获取焦点
var jd = document.querySelector('.text');
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

/* 模态框 */
var preview_img = document.querySelector('.preview_img');
var mask = document.querySelector('.mask');
var big = document.querySelector('.big');
var arrow_prev = document.querySelector('.arrow_prev');
var arrow_next = document.querySelector('.arrow_next');
var list_item = document.querySelector('.list_item');
var Product_images = list_item.querySelectorAll('li');

//鼠标经过，离开时显示隐藏
preview_img.addEventListener('mouseover', function () {
    mask.style.display = 'block';
    big.style.display = 'block';
    //暂停下方轮播图
    clearInterval(Time1);
    Time1 = null;
});
preview_img.addEventListener('mouseout', function () {
    mask.style.display = 'none';
    big.style.display = 'none';
    //开始下方轮播图
    Time1 = setInterval(function () {
        arrow_next.click();
    }, 3000);
});

//刷新时加载第一张图片到大图里面
var productImage = list_item.children[0].children[0];//第一个商品图片
preview_img.insertBefore(productImage.cloneNode(true), preview_img.children[0]);
preview_img.children[0].className = 'preview_img_img';
big.appendChild(productImage.cloneNode(true));
big.children[1].className = 'bigImg';


//模态框跟随
preview_img.addEventListener('mousemove', function (e) {
    // 计算鼠标坐标。
    var maskX = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
    var maskY = e.pageY - this.offsetTop - mask.offsetHeight / 2;
    // 计算最大移动范围,因为是正方形，所以只计算一个
    var maskMax = preview_img.offsetWidth - mask.offsetWidth;

    // 约束移动位置
    if (maskX <= 0) {
        maskX = 0;
    } else if (maskX >= maskMax) {
        maskX = maskMax;
    };
    if (maskY <= 0) {
        maskY = 0;
    } else if (maskY >= maskMax) {
        maskY = maskMax;
    };

    // 将模态框套在鼠标上
    mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';

    // 大图移动
    // 计算大图移动距离
    var bigImg = document.querySelector('.bigImg');
    var watermark = document.querySelector('#watermark');
    var bigMax = bigImg.offsetWidth - big.offsetWidth;
    // 大图移动距离
    var bigX = maskX * bigMax / maskMax;
    var bigY = maskY * bigMax / maskMax;
    bigImg.style.left = -bigX + 'px';
    bigImg.style.top = -bigY + 'px';
    //水印移动
    watermark.style.left = -bigX + 'px';
    watermark.style.top = -bigY + 'px';
});

/* 轮播图 */
//红色框跟着鼠标显示
list_item.children[0].className = 'current';
for (var i = 0; i < Product_images.length; i++) {
    Product_images[i].onmouseenter = function () {
        //重置样式
        for (var j = 0; j < Product_images.length; j++) {
            Product_images[j].className = '';
        };
        this.className = 'current';

        if (preview_img.children.length > 2) {
            //删除上一张展示图片
            preview_img.removeChild(preview_img.children[0]);
        };
        //复制现在鼠标所在的图片
        preview_img.insertBefore(this.children[0].cloneNode(true), preview_img.children[0]);
        preview_img.children[0].className = 'preview_img_img';

        //把图片复制到放大框里面
        if (big.children.length > 1) {
            //删除上一张展示图片
            big.removeChild(big.children[1]);
        };
        big.appendChild(this.children[0].cloneNode(true));
        big.children[1].className = 'bigImg';
    };
};

//自动播放商品预览图
var Time1 = setInterval(function () {
    arrow_next.click();  //每3秒自动点击向右的按钮
}, 3000);
//鼠标经过停止时间，离开继续
var preview_list = document.querySelector('.preview_list');
preview_list.addEventListener('mouseover', function () {
    clearInterval(Time1);
    Time1 = null;
});
preview_list.addEventListener('mouseout', function () {
    Time1 = setInterval(function () {
        arrow_next.click();
    }, 3000);
});

//点击左右按钮时的功能
var num = 0;
var moveWidth = list_item.children[0].offsetWidth + 5;//5是外边距

//左
arrow_prev.addEventListener('click', function () {
    if (num == 0) {
        num = list_item.children.length - 4;
    }
    num--;
    animate(list_item, -num * moveWidth);
});
//右
arrow_next.addEventListener('click', function () {
    if (num == list_item.children.length - 5) {
        num = -1;
    }
    num++;
    animate(list_item, -num * moveWidth);
});

/*  TAB栏切换 */
var lis = document.querySelector('.detail_tab_list').querySelectorAll('li');
var items = document.querySelectorAll('.item');
for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute('data-index', i);
    lis[i].onclick = function () {
        for (var n = 0; n < lis.length; n++) {
            lis[n].className = '';
        };
        this.className = 'current';
        var index = this.getAttribute('data-index');
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
        };
        items[index].style.display = 'block';
    };
};

/* 选择商品类型时更换样式 */
//封装变换样式的函数
function add_red_box(Type) {
    for (var n = 0; n < Type.length; n++) {
        Type[n].onclick = function () {
            for (var i = 0; i < Type.length; i++) {
                Type[i].className = ''
            };
            this.className = 'current';
        };
    };
};

//点击更换
choose_color = document.querySelector('.choose_color').querySelectorAll('a');
add_red_box(choose_color);
choose_version = document.querySelector('.choose_version').querySelectorAll('a');
add_red_box(choose_version);
choose_type = document.querySelector('.choose_type').querySelectorAll('a');
add_red_box(choose_type);

/* 加减商品 */
var quantity = document.querySelector('#quantity');
var add = document.querySelector('.add');
var reduce = document.querySelector('.reduce');

//加功能
add.addEventListener('click', function () {
    var NumberPurchases = Number(quantity.value);
    if (NumberPurchases < 10) {
        quantity.value = NumberPurchases + 1;
        NumberPurchases++;
    } else {
        add.style.cursor = 'not-allowed';
        alert('最多支持购买10个，如有需要请联系客服。');
    };
    reduce.style.cursor = '';
});
//减功能
reduce.addEventListener('click', function () {
    var NumberPurchases = Number(quantity.value);
    if (NumberPurchases > 0) {
        quantity.value = NumberPurchases - 1;
        NumberPurchases--;
    } else {
        reduce.style.cursor = 'not-allowed';
    }
    add.style.cursor = '';
});