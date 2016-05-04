(function () {
    var addEvent = function (obj, type, handler) {
        if (window.addEventListener) {
            addEvent = function (obj, type, handler) {
                obj.addEventListener(type, handler, false);
            };
        } else if (window.attachEvent) {
            addEvent = function (obj, type, handler) {
                obj.attachEvent('on' + type, handler);
            }
        } else {
            addEvent = function (obj, type, handler) {
                obj['on' + type] = handler;
            }
        }
        addEvent(obj, type, handler);
    };

    var removeEvent = function (obj, type, handler) {
        if (window.removeEventListener) {
            removeEvent = function (obj, type, handler) {
                obj.removeEventListener(type, handler, false);
            };
        } else if (window.detachEvent) {
            removeEvent = function (obj, type, handler) {
                obj.detachEvent('on' + type, handler);
            }
        } else {
            removeEvent = function (obj, type, handler) {
                obj['on' + type] = null;
            }
        }
        removeEvent(obj, type, handler);
    };

    //获取滚动条位置
    function getScrollOffsets(w) {
        var w = w || window;
        if (w.pageXOffset !== null) {
            return {x: w.pageXOffset, y: w.pageYOffset};
        }
        var d = w.document;
        if (document.compatMode == 'CSS1Compat') {
            return {x: w.documentElement.scrollLeft, y: w.documentElement.scrollTop};
        }
        return {x: w.body.scrollLeft, y: w.body.scrollTop};
    }

    var header = ['姓名', '语文', '数学', '英语', '总分'];
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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

    var Table = function (header, data) {
        this.table = null;
        this.header = header;
        this.data = data;
        this.sortableItems = [];
    };

    Table.prototype = {
        init: function () {
            this.render();
            this.setSortable(['语文', '数学', '英语', '总分']);
            this.sort('总分');
            this.setScroll();
        },
        render: function () {
            //创建表格
            var table = document.createElement('table');
            var tableHtml = '<thead><tr>';
            for (var i = 0, sub; sub = this.header[i++];) {
                tableHtml += '<th>' + sub + '</th>';
            }
            tableHtml += '</tr></thead>';
            tableHtml += '<tbody>';
            for (var j = 0, person; person = this.data[j++];) {
                tableHtml += '<tr>';
                for (i = 0; sub = header[i++];) {
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
                domIndex = this.header.indexOf(item);
                if (index == -1) {
                    this.sortableItems.push(item);
                    th[domIndex].classList.add('sort');
                    addEvent(th[domIndex], 'click', function (event) {
                        that.sort.call(that, this.textContent || this.innerText);
                    });
                } else {
                    this.sortableItems.splice(index, 1);
                    th[domIndex].classList.remove('sort');
                    removeEvent(th[domIndex], 'click', this.sort);
                }
            }
        },
        setScroll: function () {
            var that = this;
            addEvent(window, 'mousewheel', mouseWheelHandler);
            addEvent(window, 'DOMMouseScroll', function () {
                mouseWheelHandler.call(that);
            });
            addEvent(window, 'scroll', function () {
                mouseWheelHandler.call(that);
            });
            function mouseWheelHandler(e) {
                var thead = this.table.getElementsByTagName('thead')[0];
                //var trs=this.table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                var tablePos = this.table.getBoundingClientRect();
                if (tablePos.bottom > 0) {
                    thead.style.position = 'fixed';
                    thead.style.left = '0px';
                    thead.style.top = '0px';
                } else {
                    thead.style.position = 'inherit';
                }
            }
        },
        sort: function (item) {
            var index = this.header.indexOf(item);
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

    var table = new Table(header, data);
    table.init();
})();

//滚轮事件  滚动条事件
//获取表头文档坐标 屏幕坐标
//判断表格在屏幕外