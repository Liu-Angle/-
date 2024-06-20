/* 全选功能 */
$('.checkall').change(function () {
    //选中所有商品的复选框
    $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));

    //添加背景颜色
    if ($(this).prop('checked')) {
        $('.cart-item').addClass('check-cart-item');
    } else {
        $('.cart-item').removeClass('check-cart-item');
    };

    //数据统计和总价统计
    if ($(this).prop('checked')) {
        getCount();
        getMoney();
    } else {
        $('.amount-sum em').text('0');
        $('.price-sum em').text('￥ 0.0')
    }

});

//单个选择
$('.j-checkbox').change(function () {
    if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
        $('.checkall').prop('checked', true);
    } else {
        $('.checkall').prop('checked', false);
    };

    //添加背景颜色
    if ($(this).prop('checked')) {
        $(this).parents('.cart-item').addClass('check-cart-item');
    } else {
        $(this).parents('.cart-item').removeClass('check-cart-item');
    };

    if ($('.j-checkbox:checked').length == 0) {
        $('.amount-sum em').text('0');
        $('.price-sum em').text('￥ 0.0');
        $('checkall').prop('checked', false);
    } else {
        getCount();
        getMoney();
    };
});

/* 数量加减 */
//加
$('.increment').click(function () {
    var n = $(this).siblings('.itxt').val();
    n++;
    $(this).siblings('.itxt').val(n);
    //计算小计
    var p = $(this).parents('.p-num').siblings('.p-price').html();
    p = p.substring(1);
    var price = (p * n).toFixed(2);
    $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
    getCount();
    getMoney();
});
//减
$('.decrement').click(function () {
    var n = $(this).siblings('.itxt').val();
    if (n == 1) {
        return false;
    } else {
        n--;
        $(this).siblings('.itxt').val(n);
        getCount();
    }
    //计算小计
    var p = $(this).parents('.p-num').siblings('.p-price').html();
    p = p.substring(1);
    var price = (p * n).toFixed(2);
    $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
    getCount();
    getMoney();
});

/* 修改文本框内容，金额也变化 */
$('.itxt').change(function () {
    var n = $(this).val();
    //计算小计
    var p = $(this).parents('.p-num').siblings('.p-price').html();
    p = p.substring(1);
    var price = (p * n).toFixed(2);
    $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
    getCount();
    getMoney();
});

/* 计算商品总数量 */
function getCount() {
    var count = 0;
    $('.j-checkbox:checked').parent().siblings('.p-num').children('.quantity-form').children('.itxt').each(function (i, ele) {
        count += parseInt($(ele).val());
        $('.amount-sum em').text(count);
    });
};

/* 计算商品总价 */
function getMoney() {
    var money = 0;
    $('.j-checkbox:checked').parent().siblings('.p-sum').each(function (i, ele) {
        money += parseFloat($(ele).text().substring(1));
        $('.price-sum em').text('￥' + money.toFixed(2));
    });
};

/* 删除单个商品 */
$('.p-action a').click(function () {
    $(this).parents('.cart-item').remove();
    if ($('.j-checkbox:checked').length == 0) {
        $('.amount-sum em').text('0');
        $('.price-sum em').text('￥ 0.0');
        $('checkall').prop('checked', false);
    } else {
        getCount();
        getMoney();
    };
});

/* 删除选中物品 */
$('.remove-batch').click(function () {
    $('.j-checkbox:checked').parents('.cart-item').remove();
    if ($('.j-checkbox:checked').length == 0) {
        $('.amount-sum em').text('0');
        $('.price-sum em').text('￥ 0.0');
        $('checkall').prop('checked', false);
    } else {
        getCount();
        getMoney();
    };
});

/* 清空购物车 */
$('.clear-all').click(function () {
    $('.cart-item').remove();
    if ($('.j-checkbox:checked').length == 0) {
        $('.amount-sum em').text('0');
        $('.price-sum em').text('￥ 0.0');
        $('checkall').prop('checked', false);
    } else {
        getCount();
        getMoney();
    };
});