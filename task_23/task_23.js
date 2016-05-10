(function (){
    var root = document.getElementById("root"),
        dfsBtn = document.getElementById("dfs-btn"),
        bfsBtn = document.getElementById("bfs-btn"),
        dfsSearchBtn = document.getElementById("dfs-search-btn"),
        bfsSearchBtn = document.getElementById("bfs-search-btn");
    var include = false;
    var traverseResult = [];

    addListener(dfsBtn, "click", function () {
        traverseResult = [];
        depthFirstSearch(root);
        render();
    });
    addListener(bfsBtn, "click", function () {
        traverseResult = [];
        breadthFirstSearch(root);
        render();
    });
    addListener(dfsSearchBtn, "click", function () {
        var text = document.getElementById("search-input").value;
        traverseResult = [];
        depthFirstSearch(root);
        render(text);
    });
    addListener(bfsSearchBtn, "click", function () {
        var text = document.getElementById("search-input").value;
        traverseResult = [];
        breadthFirstSearch(root);
        render(text);
    });

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent("on" + type, handler);
        } else {
            obj["on" + type] = handler;
        }
    }

    //深度优先遍历
    function depthFirstSearch(node) {
        traverseResult.push(node);
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                depthFirstSearch(node.children[i]);
            }
        }
    }

    //广度优先遍历
    function breadthFirstSearch(node) {
        var stack = [];
        var traversingNode = node;
        traverseResult.push(node);
        while (traversingNode) {
            for (var i = 0; i < traversingNode.children.length; i++) {
                stack.push(traversingNode.children[i]);
            }
            traversingNode = stack.shift();
            if (traversingNode) {
                traverseResult.push(traversingNode);
            }
        }
    }
    //展示遍历过程的函数
    function render(text) {
        var text = text || null;
        var i = 0;
        traverseResult[i].classList.add("traversing");
        var timer = setInterval(function () {
            i++;
            if (i < traverseResult.length) {
                traverseResult[i - 1].classList.remove("traversing");
                traverseResult[i].classList.add("traversing");
                if (traverseResult[i].childNodes[0].textContent == text) {
                    traverseResult[i].classList.add("include");
                }
            } else {
                traverseResult[i - 1].classList.remove("traversing");
                clearInterval(timer);
            }
        }, 500);
    }
})();

//深度优先遍历 广度优先遍历
//如何进行事件模拟
//获取节点中的文本的兼容方法
//如何在搜索动画结束后才显示结果提示
