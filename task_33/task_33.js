var randomBtn = document.getElementById("random");
var execBtn = document.getElementById("exec");
var colorBox = document.getElementById("color-box");
var tunLef = document.getElementById("tun-lef");
var tunRig = document.getElementById("tun-rig");
var tunBac = document.getElementById("tun-bac");
var go = document.getElementById("go");

addListener(randomBtn, "click", randomBox);
addListener(execBtn, "click", execCommand);
addListener(tunLef, "click", function () {
    execCommand(this.value);
});
addListener(tunRig, "click", function () {
    execCommand(this.value);
});
addListener(tunBac, "click", function () {
    execCommand(this.value);
});
addListener(go, "click", function () {
    execCommand(this.value);
});
var current = 0;

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

function execCommand(commandText) {
    var commandText = commandText || document.getElementById("command").value.trim();
    switch (commandText) {
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
    }
}

function turnRight() {
    switch (current) {
        case 0:
            colorBox.style.transform = "rotate(90deg)";
            current = 1;
            break;
        case 1:
            colorBox.style.transform = "rotate(180deg)";
            current = 2;
            break;
        case 2:
            colorBox.style.transform = "rotate(-90deg)";
            current = 3;
            break;
        case 3:
            colorBox.style.transform = "rotate(0deg)";
            current = 0;
            break;
    }
}

function turnLeft() {
    switch (current) {
        case 0:
            colorBox.style.transform = "rotate(-90deg)";
            current = 3;
            break;
        case 1:
            colorBox.style.transform = "rotate(0deg)";
            current = 0;
            break;
        case 2:
            colorBox.style.transform = "rotate(90deg)";
            current = 1;
            break;
        case 3:
            colorBox.style.transform = "rotate(180deg)";
            current = 2;
            break;
    }
}

function turnBack() {
    switch (current) {
        case 0:
            colorBox.style.transform = "rotate(180deg)";
            current = 2;
            break;
        case 1:
            colorBox.style.transform = "rotate(-90deg)";
            current = 3;
            break;
        case 2:
            colorBox.style.transform = "rotate(0deg)";
            current = 0;
            break;
        case 3:
            colorBox.style.transform = "rotate(90deg)";
            current = 1;
            break;
    }
}

function goAhead() {
    var left = colorBox.style.left || colorBox.getBoundingClientRect().left - 1;
    var top = colorBox.style.top || colorBox.getBoundingClientRect().top - 1;
    left = typeof left === "string" ? left.replace("px", "") : left;
    top = typeof top === "string" ? top.replace("px", "") : top;
    left = Number(left);
    top = Number(top);
    switch (current) {
        case 0:
            if (top - 50 >= 50) {
                colorBox.style.top = (top - 50) + "px";
            }
            break;
        case 1:
            if (left + 50 <= 500) {
                colorBox.style.left = (left + 50) + "px";
            }
            break;
        case 2:
            if (top + 50 <= 500) {
                colorBox.style.top = (top + 50) + "px";
            }
            break;
        case 3:
            if (left - 50 >= 50) {
                colorBox.style.left = (left - 50) + "px";
            }
            break;
    }
}

//注意字符串和数值混合使用时容易引发的类型错误
//colorBox.style.transform = "translate(50px)";
//获取到的left属性为空
















