(function () {
    var popUpDiv = document.getElementById('pop-up');
    var mask = document.getElementById('mask');

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + type, handler);
        } else obj['on' + type] = handler;
    }

    var PopUp = function (element, width, height) {
        this.ele = element;
        this.width = width;
        this.height = height;
    };
    PopUp.prototype = {
        init: function () {
            var self = this;
            var header = document.getElementById('header'),
                okBtn = document.getElementById('ok'),
                cancelBtn = document.getElementById('cancel');
            this.ele.style.width = this.width + 'px';
            this.ele.style.height = this.height + 'px';
            self.show();
            addListener(mask, 'click', function () {
                self.hide();
            });
            addListener(okBtn, 'click', function () {
                self.hide();
            });
            addListener(cancelBtn, 'click', function () {
                self.hide();
            });
            addListener(header, 'mousedown', function (event) {
                var pop = this.parentNode;
                var deltaX = event.clientX - pop.offsetLeft,
                    deltaY = event.clientY - pop.offsetTop;
                var moving = function (event) {
                    pop.style.left = event.clientX - deltaX + self.width / 2 + 'px'; //self.width / 2是margin-left的值
                    pop.style.top = event.clientY - deltaY + self.height / 2 + 'px';
                };
                addListener(document, 'mousemove', moving);
                addListener(document, 'mouseup', function () {
                    document.removeEventListener('mousemove', moving);
                });
            });
        },
        show: function () {
            this.ele.style.display = '';
            this.ele.style.position = 'fixed';
            this.ele.style.left = '50%';
            this.ele.style.top = '50%';
            this.ele.style.marginLeft = -this.width / 2 + 'px';
            this.ele.style.marginTop = -this.height / 2 + 'px';
        },
        hide: function () {
            this.ele.style.display = 'none';
            mask.style.display = 'none';
        }
    };

    var pop = new PopUp(popUpDiv, 400, 250);
    pop.init();
})();

//获取元素 鼠标的位置坐标
//获取窗口大小