(function () {
    var leftIn = document.getElementById('left-in');
    var rightIn = document.getElementById('right-in');
    var leftOut = document.getElementById('left-out');
    var rightOut = document.getElementById('right-out');
    var btnSort = document.getElementById('btn-sort');
    var divContainer = document.getElementById('div-container');
    var btnRandom = document.getElementById('btn-random');

    var numBefore = [];
    var numAfter = [];

    addListener(leftIn, 'click', leftInHandler);
    addListener(rightIn, 'click', rightInHandler);
    addListener(leftOut, 'click', leftOutHandler);
    addListener(rightOut, 'click', rightOutHandler);
    addListener(btnRandom, 'click', randomHandler);
    addListener(btnSort, 'click', sort);
    addListener(divContainer, 'click', removeDiv);

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent('on' + type, handler);
        } else {
            obj['on' + type] = handler;
        }
    }

    function getNum() {
        if (numAfter.length > 60) {
            return numAfter;
        }
        var numberInput = document.getElementById('input-number');
        var numBefore = numberInput.value.match(/\d+/g) || [];
        numBefore = numBefore.map(function (item) {
            return Number(item);
            //return +item;
        });
        numBefore = numBefore.filter(function (item) {
            return item >= 10 && item <= 100;
        });
        return numBefore;
    }

    function leftInHandler() {
        numBefore = getNum();
        for (var i = 0; i < numBefore.length; i++) {
            numAfter.unshift(numBefore[i]);
        }
        renderDiv();
    }

    function rightInHandler() {
        numBefore = getNum();
        for (var i = 0; i < numBefore.length; i++) {
            numAfter.push(numBefore[i]);
        }
        renderDiv();
    }

    function leftOutHandler() {
        alert(numAfter.shift());
        var firstDiv = divContainer.children[0];
        divContainer.removeChild(firstDiv);
    }

    function rightOutHandler() {
        alert(numAfter.pop());
        var lastDiv = divContainer.children[numAfter.length];
        divContainer.removeChild(lastDiv);
    }

    function randomHandler() {
        numAfter = [];
        for (var i = 0; i < 40; i++) {
            numAfter[i] = Math.round(Math.random() * 500 + 50);
        }
        renderDiv();
    }

    function renderDiv() {
        var htmlText = '';
        divContainer.innerHTML = '';
        for (var i = 0; i < numAfter.length; i++) {
            htmlText += '<div class="chart-div" style="height: ' + numAfter[i] + 'px"' + '></div>';
        }
        divContainer.innerHTML = htmlText;
    }

    function removeDiv(event) {
        var e = event.target || event.srcElement;
        if (e.className !== 'chart-div') {
            return;
        }
        var index = Array.prototype.indexOf.call(e.parentNode.children, e);
        numAfter.splice(index, 1);
        e.parentNode.removeChild(e);
    }

    function sort() {
        var temp = 0;
        var timer = null;
        var len = numAfter.length;
        //冒泡 大值后移
        var i = 0, j = 1;
        timer = setInterval(step, 10);
        function step() {
            if (i < len) {
                if (j < len) {
                    if (numAfter[i] > numAfter[j]) {
                        temp = numAfter[i];
                        numAfter[i] = numAfter[j];
                        numAfter[j] = temp;
                        renderDiv();
                    }
                    j++;
                }
                else {
                    i++;
                    j = i + 1;
                }
            }
            else {
                clearInterval(timer);
            }
        }
    }
})();