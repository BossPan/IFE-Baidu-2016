(function () {
    var leftIn = document.getElementById('left-in');
    var rightIn = document.getElementById('right-in');
    var leftOut = document.getElementById('left-out');
    var rightOut = document.getElementById('right-out');
    var spanContainer = document.getElementById('span-container');
    //添加监听事件
    addListener(leftIn, 'click', leftInHandler);
    addListener(rightIn, 'click', rightInHandler);
    addListener(leftOut, 'click', leftOutHandler);
    addListener(rightOut, 'click', rightOutHandler);
    addListener(spanContainer, 'click', removeSpan);
    var numBefore = [];
    var numAfter = [];
    //获取输入值，存储在初始数组numBefore中
    function getNum() {
        var numberInput = document.getElementById('number-input');
        var numBefore = numberInput.value.match(/\d+/g);
        numBefore = numBefore.map(function (item) {
            return Number(item);
            //return +item;
        });
        return numBefore;
    }

    //添加事件监听
    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent('on' + type, handler);
        } else {
            obj['on' + type] = handler;
        }
    }

    function leftInHandler() {
        numBefore = getNum();
        for (var i = 0; i < numBefore.length; i++) {
            numAfter.unshift(numBefore[i]);
        }
        addSpan(numAfter);
    }

    function rightInHandler() {
        numBefore = getNum();
        for (var i = 0; i < numBefore.length; i++) {
            numAfter.push(numBefore[i]);
        }
        addSpan(numAfter);
    }

    function leftOutHandler() {
        alert(numAfter.shift());
        var firstSpan = document.getElementsByTagName('span')[0];
        spanContainer.removeChild(firstSpan);
    }

    function rightOutHandler() {
        alert(numAfter.pop());
        var lastSpan = document.getElementsByTagName('span')[numAfter.length];
        spanContainer.removeChild(lastSpan);
    }

    function addSpan(numArr) {
        spanContainer.innerHTML = '';
        for (var i = 0; i < numArr.length; i++) {
            var span = document.createElement('span');
            span.innerText = numArr[i];
            spanContainer.appendChild(span);
        }
    }

    function removeSpan(event) {
        var e = event.target || event.srcElement;
        var index = Array.prototype.indexOf.call(e.parentNode.children, e);
        alert(e.innerText);
        numAfter.splice(index, 1);
        spanContainer.removeChild(e);
    }
})();

//如何给动态添加的元素添加监听事件
//通过在父元素上添加监听来实现

//如何判断子元素是父元素的第几个子元素
//Array.prototype.indexOf.call(parentNode.children,childNode);

//on,delegate,bind,live