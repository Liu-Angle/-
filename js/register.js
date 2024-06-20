var Tel1 = document.querySelector('#tel');  //电话
var Captcha1 = document.querySelector('#captcha');  //验证码
var Send = document.querySelector('button');  //发送按钮
var Password1 = document.querySelector('#password');   //密码
var ConfirmPassword1 = document.querySelector('#confirm_password');  //确认密码

var Tel2 = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;  //电话
var Captcha2 = /^[a-zA-Z0-9]{4}$/;   //验证码
var Password2 = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?])\S*$/;  //密码

regexp(Tel1, Tel2);
regexp(Captcha1, Captcha2);
regexp(Password1, Password2);

//判断密码是否一样
ConfirmPassword1.onblur = function () {
    if (ConfirmPassword1.value != Password1.value || ConfirmPassword1.value == '') {
        this.nextElementSibling.className = 'error';
        this.nextElementSibling.innerHTML = '<i class="error-icon"></i> 输入不正确';
    } else {
        this.nextElementSibling.className = 'success';
        this.nextElementSibling.innerHTML = '<i class="success-icon"></i> 输入正确';
    };
};

//验证码倒计时
Send.addEventListener('click', function () {
    if (Tel2.test(Tel1.value)) {
        Captcha1.removeAttribute('disabled')
        var time = 60;    // 定义剩下的秒数
        Send.disabled = true;
        Send.innerHTML = '还剩下' + time-- + '秒';
        var timer = setInterval(function () {
            if (time == 0) {
                clearInterval(timer);
                Send.disabled = false;
                Send.innerHTML = '发送验证码';
            } else {
                Send.innerHTML = '还剩下' + time-- + '秒';
            }
        }, 1000);
    } else {
        Captcha1.value = '';
        Captcha1.setAttribute('disabled', 'disabled');
        alert('电话号码输入错误！请重新输入。');
    }
});

//判断输入的函数封装
function regexp(ele, reg) {
    ele.onblur = function () {
        if (reg.test(this.value)) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success-icon"></i> 输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error-icon"></i> 输入不正确';
        };
    };
};

var Protocol = document.querySelector('#protocol');  //同意协议
var Enroll = document.querySelector('.btn');  //注册按钮
Enroll.onclick = function () {
    if (Protocol.checked == false) {
        alert('请勾选用户协议！');
    } else if (Tel2.test(Tel1.value) && Captcha2.test(Captcha1.value) && Password2.test(Password1.value) && ConfirmPassword1.value == Password1.value) {
        alert('恭喜注册成功！');
    } else {
        alert('信息输入错误！');
    }
};