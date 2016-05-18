(function () {
    var tagInput = document.getElementById('tag-input');
    var tagContainer = document.getElementById('tag-container');
    var confirmBtn = document.getElementById('confirm-button');
    var hobbyContainer = document.getElementById('hobby-container');
    var hobbyTextarea = document.getElementById('hobby-textarea');
    var tagArr = [];
    var hobbyArr = [];

    addListener(tagInput, 'keyup', addTag);
    addListener(confirmBtn, 'click', addHobby);

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent('on' + type, handler);
        } else {
            obj['on' + type] = handler;
        }
    }

    function addTag(event) {
        var value = tagInput.value;
        if (value.match(/[,\s，]/) || event.keyCode == 13) {
            value = value.trim();
            if (!value || tagArr.indexOf(value) !== -1) {
                return;
            }
            if (tagArr.length == 10) {
                tagArr.shift();
                tagContainer.removeChild(tagContainer.children[0]);
            }
            tagArr.push(value);
            var span = document.createElement('span');
            span.innerText = value;
            tagContainer.appendChild(span);
            tagInput.value = '';
        }
    }

    function addHobby() {
        var hobbyText = document.getElementById('hobby-textarea').value.trim().split(/[,\s，]/);
        hobbyText.map(function (item) {
            if (!item || hobbyArr.indexOf(item) !== -1) {
                return;
            }
            if (hobbyArr.length == 10) {
                hobbyArr.shift();
                hobbyContainer.removeChild(hobbyContainer.children[0]);
            }
            hobbyArr.push(item);
            var span = document.createElement('span');
            span.innerText = item;
            hobbyContainer.appendChild(span);
        });
    }

    var Block = function (container) {
        this.container = container;
    };
    Block.prototype = {
        init: function () {
            addListener(this.container, 'mouseover', this.enterHandler);
            addListener(this.container, 'mouseout', this.outHandler);
            addListener(this.container, 'click', this.clickHandler);
        },
        enterHandler: function (event) {
            var e = event.target || event.srcElement;
            if (e.tagName.toLowerCase() == 'span') {
                e.innerText = '点击删除 ' + e.innerText;
                e.className = 'entering';
            }
        },
        outHandler: function (event) {
            var e = event.target || event.srcElement;
            if (e.tagName.toLowerCase() == 'span') {
                e.innerText = e.innerText.substring(5);
                //e.innerText = e.innerText.replace('点击删除', '');
                e.className = '';
            }
        },
        clickHandler: function (event) {
            var e = event.target || event.srcElement;
            var index = Array.prototype.indexOf.call(e.parentNode.children, e);
            tagArr.splice(index, 1);
            e.parentNode.removeChild(e);
        }
    };

    var tagBlock = new Block(tagContainer, tagInput, tagArr);
    tagBlock.init();
    var hobbyBlock = new Block(hobbyContainer, hobbyTextarea, hobbyArr);
    hobbyBlock.init();
})();
//获取键值
