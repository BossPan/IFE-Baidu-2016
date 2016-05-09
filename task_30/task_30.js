(function () {
    //使用策略模式优化
    var strategies = {
        isNonEmpty: function (value, errorMsg) {
            if (value === '') {
                return errorMsg;
            }
        },
        isName: function (value, errorMsg) {
            var len = 0, count = 0;
            for (var i = 0; i < value.length; i++) {
                if (value[i].match(/^[\u4e00-\u9fa5]$/)) {
                    count++;
                }
            }
            len = value.length + count;
            if (!(len >= 6 && len <= 16)) {
                return errorMsg;
            }
        },
        isPsw: function (value, errorMsg) {
            if (!value.match(/^[A-z0-9]{6,16}$/)) {
                return errorMsg;
            }
        },
        isPswSame: function (value, errorMsg) {
            var psw = document.getElementById('psw').value;
            if (!(value === psw)) {
                return errorMsg;
            }
        },
        isEmail: function (value, errorMsg) {
            var atPos = value.indexOf('@'),
                dotPos = value.indexOf('.');
            if (atPos < 1 || dotPos - atPos < 2 || !value.match(/^[A-z0-9]/)) {
                return errorMsg;
            }
        },
        isPhoneNumber: function (value, errorMsg) {
            if (!value.match(/^1[3|5|7|8]\d{9}/)) {
                return errorMsg;
            }
        }
    };

    //存储所有input的数组
    var inputs = [
        {
            dom: document.getElementById('name'),
            span: document.getElementById('name-prompt'),
            prompt: '必填，长度为4-16个字符',
            validator: [
                {strategy: strategies.isNonEmpty, errorMsg: '名称不能为空'},
                {strategy: strategies.isName, errorMsg: '长度必须为4-16个字符'}
            ],
            success: '名称可用'
        },
        {
            dom: document.getElementById('psw'),
            span: document.getElementById('psw-prompt'),
            prompt: '请输入6-16位字母或数字',
            validator: [
                {strategy: strategies.isNonEmpty, errorMsg: '密码不能为空'},
                {strategy: strategies.isPsw, errorMsg: '密码必须为6-16位字母或数字'}
            ],
            success: '密码可用'
        },
        {
            dom: document.getElementById('psw-confirm'),
            span: document.getElementById('psw-confirm-prompt'),
            prompt: '再次输入相同密码',
            validator: [{strategy: strategies.isPswSame, errorMsg: '密码输入不一致'}],
            success: '密码输入一致'
        },
        {
            dom: document.getElementById('email'),
            span: document.getElementById('email-prompt'),
            prompt: '输入邮箱',
            validator: [
                {strategy: strategies.isNonEmpty, errorMsg: '邮箱不能为空'},
                {strategy: strategies.isEmail, errorMsg: '邮箱格式错误'}
            ],
            success: '邮箱格式正确'
        },
        {
            dom: document.getElementById('phone-number'),
            span: document.getElementById('phone-number-prompt'),
            prompt: '请输入11位手机号',
            validator: [
                {strategy: strategies.isNonEmpty, errorMsg: '手机不能为空'},
                {strategy: strategies.isPhoneNumber, errorMsg: '手机格式错误'}
            ],
            success: '手机格式正确'
        }
    ];

    var validateBtn = document.getElementById('validate-btn');

    //为所有input添加监听
    for (var i = 0, input; input = inputs[i++];) {
        (function (input) {
            addListener(input.dom, 'focus', function () {
                input.span.className = 'focus';
                input.span.innerText = input.prompt;
            });
            addListener(input.dom, 'blur', function () {
                for (var i = 0, validator; validator = input.validator[i++];) {
                    var errorMsg = validator.strategy(input.dom.value, validator.errorMsg);
                    if (errorMsg) {
                        input.span.className = 'error';
                        input.span.innerText = errorMsg;
                        return;
                    }
                    input.span.className = 'correct';
                    input.span.innerText = input.success;
                }
            });
        })(input);
    }

    addListener(validateBtn, 'click', validator);

    //添加监听函数
    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + type, handler);
        } else obj['on' + type] = handler;
    }

    function validator() {
        for (var i = 0, input; input = inputs[i++];) {
            for (var j = 0, validator; validator = input.validator[j++];) {
                var errorMsg = validator.strategy(input.dom.value, validator.errorMsg);
                if (errorMsg) {
                    alert(errorMsg);
                    return false;
                }
            }
        }
        alert('提交成功');
    }
}());
//innerHtml textContent浏览器支持情况