(function () {
    function addEvent(obj, type, handler) {
        if (window.addEventListener) {
            addEvent = function (obj, type, handler) {
                obj.addEventListener(type, handler, false);
            };
        } else if (window.attachEvent) {
            addEvent = function (obj, type, handler) {
                obj.attachEvent('on' + type, handler);
            }
        } else {
            addEvent=function(obj, type, handler){
                obj['on'+type]=handler;
            }
        }
    }

    function removeEvent(obj, type, handler) {
        if (window.removeEventListener) {
            removeEvent = function (obj, type, handler) {
                obj.removeEventListener(type, handler, false);
            };
        } else if (window.detachEvent) {
            removeEvent = function (obj, type, handler) {
                obj.detachEvent('on' + type, handler);
            }
        }else {
            removeEvent=function(obj,type,handler){
                obj['on'+type]=null;
            }
        }
    }

    var subject = ['姓名', '语文', '数学', '英语', '总分'];
    var data = [
        {
            '姓名': '小明',
            '语文': 80,
            '数学': 90,
            '英语': 70,
            '总分': 240
        },
        {
            '姓名': '小红',
            '语文': 90,
            '数学': 60,
            '英语': 90,
            '总分': 240
        },
        {
            '姓名': '小亮',
            '语文': 60,
            '数学': 100,
            '英语': 70,
            '总分': 230
        }
    ];

    var Table = function (subject, data) {
        this.table = null;
        this.subject = subject;
        this.data = data;
        this.sortableItems = [];
    };

    Table.prototype = {
        init: function () {
            this.render();
            this.setSortable(['语文', '数学', '英语', '总分']);
            this.sort('总分');
        },
        render: function () {
            //创建表格
            var table = document.createElement('table');
            var tableHtml = '<thead><tr>';
            for (var i = 0, sub; sub = this.subject[i++];) {
                tableHtml += '<th>' + sub + '</th>';
            }
            tableHtml += '</tr></thead>';
            tableHtml += '<tbody>';
            for (var j = 0, person; person = this.data[j++];) {
                tableHtml += '<tr>';
                for (i = 0; sub = subject[i++];) {
                    tableHtml += '<td>' + person[sub] + '</td>'
                }
                tableHtml += '</tr>';
            }
            tableHtml += '</tbody>';
            table.innerHTML = tableHtml;
            document.body.appendChild(table);
            this.table = table;
        },
        setSortable: function (items) {
            var th = this.table.getElementsByTagName('th');
            var index, domIndex;
            var that = this;
            for (var i = 0, item; item = items[i++];) {
                index = this.sortableItems.indexOf(item);
                domIndex = this.subject.indexOf(item);
                if (index == -1) {
                    this.sortableItems.push(item);
                    th[domIndex].classList.add('sort');
                    addEvent(th[domIndex], 'click', function (event) {
                        that.sort.call(that, this.innerText);
                    });
                } else {
                    this.sortableItems.splice(index, 1);
                    th[domIndex].classList.remove('sort');
                    removeEvent(th[domIndex], 'click', this.sort);
                }
            }
        },
        sort: function (item) {
            var index = this.subject.indexOf(item);
            var tbody = this.table.getElementsByTagName('tbody')[0];
            var rows = tbody.getElementsByTagName('tr');
            rows = Array.prototype.slice.call(rows);
            rows.sort(function (rowA, rowB) {
                var tdA = rowA.getElementsByTagName('td')[index],
                    tdB = rowB.getElementsByTagName('td')[index];
                var valueA = tdA.innerText || tdA.textContent,
                    valueB = tdB.innerText || tdB.textContent;
                return valueB - valueA;
            });
            for (var i = 0, row; row = rows[i++];) {
                tbody.appendChild(row);
            }
        }
    };

    var table = new Table(subject, data);
    table.init();
})();


//只有一个表格  单例模式
//存储数据如何选择数组还是对象
//removeEventListener兼容