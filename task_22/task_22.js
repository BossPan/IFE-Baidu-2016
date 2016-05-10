(function () {
    var root = document.getElementById('root'),
        preBtn = document.getElementById('pre-btn'),
        inBtn = document.getElementById('in-btn'),
        postBtn = document.getElementById('post-btn');
    var traverseResult = [];

    addListener(preBtn, 'click', function () {
        traverseResult = [];
        preOrder(root);
        render();
    });
    addListener(inBtn, 'click', function () {
        traverseResult = [];
        inOrder(root);
        render();
    });
    addListener(postBtn, 'click', function () {
        traverseResult = [];
        postOrder(root);
        render();
    });

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent()) {
            obj.attachEvent('on' + type, handler);
        } else {
            obj['on' + type] = handler;
        }
    }

    //先序遍历
    function preOrder(node) {
        if (node !== null) {
            traverseResult.push(node);
            preOrder(node.firstElementChild);
            preOrder(node.lastElementChild);
        }
    }

    //中序遍历
    function inOrder(node) {
        if (node !== null) {
            preOrder(node.firstElementChild);
            traverseResult.push(node);
            preOrder(node.lastElementChild);
        }
    }

    //后序遍历
    function postOrder(node) {
        if (node !== null) {
            preOrder(node.firstElementChild);
            preOrder(node.lastElementChild);
            traverseResult.push(node);
        }
    }

    //展示遍历过程的函数
    function render() {
        var i = 0;
        traverseResult[i].classList.add('traversing');
        var timer = setInterval(function () {
            i++;
            if (i < traverseResult.length) {
                traverseResult[i - 1].classList.remove('traversing');
                traverseResult[i].classList.add('traversing');
            } else {
                traverseResult[i - 1].classList.remove('traversing');
                clearInterval(timer);
            }
        }, 500)
    }
})();