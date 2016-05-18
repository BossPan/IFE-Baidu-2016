(function () {
    var leftIn = document.getElementById("left-in");
    var rightIn = document.getElementById("right-in");
    var leftOut = document.getElementById("left-out");
    var rightOut = document.getElementById("right-out");
    var spanContainer = document.getElementById("span-container");
    var queryBtn = document.getElementById("query-btn");
    addListener(leftIn, "click", leftInHandler);
    addListener(rightIn, "click", rightInHandler);
    addListener(leftOut, "click", leftOutHandler);
    addListener(rightOut, "click", rightOutHandler);
    addListener(spanContainer, "click", removeSpan);
    addListener(queryBtn, "click", queryHandler);
    var numBefore = [];
    var numAfter = [];
    //获取输入值，存储在初始数组numBefore中
    function getNum() {
        var text = document.getElementById("text").value;
        //除数字，字母，中文以外的都作为切分依据
        return text.trim().split(/[^A-z0-9\u4e00-\u9fa5]/);
    }
    //添加事件监听
    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent("on" + type, handler);
        } else {
            obj["on" + type] = handler;
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
        var firstSpan = document.getElementsByTagName("span")[0];
        spanContainer.removeChild(firstSpan);
    }

    function rightOutHandler() {
        alert(numAfter.pop());
        var lastSpan = document.getElementsByTagName("span")[numAfter.length];
        spanContainer.removeChild(lastSpan);
    }

    function queryHandler() {
        numAfter = getNum();
        addSpan(numAfter);
        var queryText = document.getElementById("query-text").value;
        var queryReg = new RegExp(queryText, "g");
        for (var i = 0; i < spanContainer.children.length; i++) {
            if (spanContainer.children[i].innerText.match(queryReg)) {
                spanContainer.children[i].style.backgroundColor = "#000";
            } else {
                spanContainer.children[i].style.backgroundColor = "#f00";
            }
        }
    }

    function addSpan(numArr) {
        spanContainer.innerHTML = '';
        for (var i = 0; i < numArr.length; i++) {
            var span = document.createElement("span");
            span.innerText = numArr[i];
            spanContainer.appendChild(span);
        }
    }

    function removeSpan(event) {
        var e = event.target || event.srcElement;
        var index = Array.prototype.indexOf.call(e.parentNode.children, e);
        numAfter.splice(index, 1);
        spanContainer.removeChild(e);
    }
})();
