(function () {
    var randomBtn = document.getElementById("random"),
        execBtn = document.getElementById("exec"),
        colorBox = document.getElementById("color-box"),
        tunLef = document.getElementById("tun-lef"),
        tunRig = document.getElementById("tun-rig"),
        tunBac = document.getElementById("tun-bac"),
        go = document.getElementById("go");
    var traLef = document.getElementById("tra-lef"),
        traTop = document.getElementById("tra-top"),
        traRig = document.getElementById("tra-rig"),
        traBot = document.getElementById("tra-bot");
    var movLef = document.getElementById("mov-lef"),
        movTop = document.getElementById("mov-top"),
        movRig = document.getElementById("mov-rig"),
        movBot = document.getElementById("mov-bot");
    var direction = 1;

    addListener(randomBtn, "click", randomBox);
    addListener(execBtn, "click", exec);
    addListener(tunLef, "click", function () {
        exec(this.value);
    });
    addListener(tunRig, "click", function () {
        exec(this.value);
    });
    addListener(tunBac, "click", function () {
        exec(this.value);
    });
    addListener(go, "click", function () {
        exec(this.value);
    });
    addListener(traLef, "click", function () {
        exec(this.value);
    });
    addListener(traTop, "click", function () {
        exec(this.value);
    });
    addListener(traRig, "click", function () {
        exec(this.value);
    });
    addListener(traBot, "click", function () {
        exec(this.value);
    });
    addListener(movLef, "click", function () {
        exec(this.value);
    });
    addListener(movTop, "click", function () {
        exec(this.value);
    });
    addListener(movRig, "click", function () {
        exec(this.value);
    });
    addListener(movBot, "click", function () {
        exec(this.value);
    });

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, handler);
        } else obj["on" + type] = handler;
    }

    function randomBox() {
        var i = 1 + Math.round(Math.random() * 9), j = 1 + Math.round(Math.random() * 9);
        colorBox.style.left = i * 50 + "px";
        colorBox.style.top = j * 50 + "px";
    }

    function exec(command) {
        var command = command || document.getElementById("command").value.trim();
        switch (command) {
            case "TUN LEF":
                turnLeft();
                break;
            case "TUN RIG":
                turnRight();
                break;
            case "TUN BAC":
                turnBack();
                break;
            case "GO":
                goAhead();
                break;
            case "TRA LEF":
                goAhead(4);
                break;
            case "TRA TOP":
                goAhead(1);
                break;
            case "TRA RIG":
                goAhead(2);
                break;
            case "TRA BOT":
                goAhead(3);
                break;
            case "MOV LEF":
                turn(4);
                goAhead();
                break;
            case "MOV TOP":
                turn(1);
                goAhead();
                break;
            case "MOV RIG":
                turn(2);
                goAhead();
                break;
            case "MOV BOT":
                turn(3);
                goAhead();
                break;
        }
    }

    function turnRight() {
        switch (direction) {
            case 1:
                colorBox.style.transform = "rotate(90deg)";
                direction = 2;
                break;
            case 2:
                colorBox.style.transform = "rotate(180deg)";
                direction = 3;
                break;
            case 3:
                colorBox.style.transform = "rotate(-90deg)";
                direction = 4;
                break;
            case 4:
                colorBox.style.transform = "rotate(0deg)";
                direction = 1;
                break;
        }
    }

    function turnLeft() {
        switch (direction) {
            case 1:
                colorBox.style.transform = "rotate(-90deg)";
                direction = 4;
                break;
            case 2:
                colorBox.style.transform = "rotate(0deg)";
                direction = 1;
                break;
            case 3:
                colorBox.style.transform = "rotate(90deg)";
                direction = 2;
                break;
            case 4:
                colorBox.style.transform = "rotate(180deg)";
                direction = 3;
                break;
        }
    }

    function turnBack() {
        switch (direction) {
            case 1:
                colorBox.style.transform = "rotate(180deg)";
                direction = 3;
                break;
            case 2:
                colorBox.style.transform = "rotate(-90deg)";
                direction = 4;
                break;
            case 3:
                colorBox.style.transform = "rotate(0deg)";
                direction = 1;
                break;
            case 4:
                colorBox.style.transform = "rotate(90deg)";
                direction = 2;
                break;
        }
    }

    function turn(to) {
        switch (to) {
            case 1:
                colorBox.style.transform = "rotate(0deg)";
                direction = 1;
                break;
            case 2:
                //rotateAnimation();
                colorBox.style.transform = "rotate(90deg)";
                direction = 2;
                break;
            case 3:
                colorBox.style.transform = "rotate(180deg)";
                direction = 3;
                break;
            case 4:
                colorBox.style.transform = "rotate(-90deg)";
                direction = 4;
                break;
        }
    }

    function goAhead(to) {
        var to = to || direction;
        var left = colorBox.style.left || colorBox.getBoundingClientRect().left + window.pageXOffset;
        var top = colorBox.style.top || colorBox.getBoundingClientRect().top + window.pageYOffset;
        left = typeof left === "string" ? left.replace("px", "") : left;
        top = typeof top === "string" ? top.replace("px", "") : top;
        left = Number(left);
        top = Number(top);
        console.log(left, top);
        switch (to) {
            case 1:
                if (top - 50 >= 50) {
                    colorBox.style.top = (top - 50) + "px";
                }
                break;
            case 2:
                if (left + 50 <= 500) {
                    //moveAnimation(left,50);
                    colorBox.style.left = (left + 50) + "px";
                }
                break;
            case 3:
                if (top + 50 <= 500) {
                    colorBox.style.top = (top + 50) + "px";
                }
                break;
            case 4:
                if (left - 50 >= 50) {
                    colorBox.style.left = (left - 50) + "px";
                }
                break;
        }
    }
})();

// 注意字符串和数值混合使用时容易引发的类型错误

// 获取到的left属性为空

// Uncaught RangeError: Maximum call stack size exceeded

// 通过CSS样式控制动画时间和样式

// requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
// 设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）
// 能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。