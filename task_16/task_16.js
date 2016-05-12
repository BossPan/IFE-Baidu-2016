/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var num = document.getElementById("aqi-value-input").value;
    city = city.trim();
    num = num.trim();
    if (!city.match(/^[A-z\u4e00-\u9fa5]+$/)) {
        alert("城市名称只能包含中英文字母，请重新输入。")
    } else if (!num.match(/^\d+$/)) {
        alert("空气质量必须为整数，请重新输入。");
    } else aqiData[city] = num;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tableHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        tableHTML += "<tr><td>" + city + "</td>" + "<td>" + aqiData[city] + "</td>" + "<td><button>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = city ? tableHTML : '';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    var ele = event.target || event.srcElement;
    var cityTd = ele.parentNode.parentNode.childNodes[0];
    var city = cityTd.textContent || cityTd.innerText;
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function (event) {
        if (event.target.nodeName.toLowerCase() === 'button') delBtnHandle(event);
    });
}
init();