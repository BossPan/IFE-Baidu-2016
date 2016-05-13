/* 数据格式演示
 var aqiSourceData = {
 '北京': {
 '2016-01-01': 10,
 '2016-01-02': 10,
 '2016-01-03': 10,
 '2016-01-04': 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date('2016-01-01');
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    '北京': randomBuildData(500),
    '上海': randomBuildData(300),
    '广州': randomBuildData(200),
    '深圳': randomBuildData(100),
    '成都': randomBuildData(300),
    '西安': randomBuildData(500),
    '福州': randomBuildData(100),
    '厦门': randomBuildData(100),
    '沈阳': randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: 'day'
};

/**
 * 渲染图表
 */
function renderChart() {
    var aqiChartWrap = document.querySelectorAll('.aqi-chart-wrap')[0];
    var width = 0, html = '', title = '';
    aqiChartWrap.innerHTML = '';
    switch (pageState.nowGraTime) {
        case 'day':
            width = 12;
            break;
        case 'week':
            width = 40;
            break;
        case 'month':
            width = 80;
    }
    for (var date in chartData) {
        html += '<div style="width: ' + width + 'px;height: ' + chartData[date] + 'px;background-color: ' +
            getColor(chartData[date]) + '" title="' + date + ' ' + chartData[date] + '"></div>';
    }
    aqiChartWrap.innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    if (this.value === pageState.nowGraTime) {
        return;
    }
    // 设置对应数据
    //改变pageState
    pageState.nowGraTime = this.value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    if (this.selectedIndex == pageState.nowSelectCity) {
        return;
    }
    // 设置对应数据
    //改变pageState
    pageState.nowSelectCity = this.value;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var timeRadio = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < timeRadio.length; i++) {
        addListener(timeRadio[i], 'click', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityContainer = document.getElementById('city-select');
    var html = '';
    for (var city in aqiSourceData) {
        html += '<option>' + city + '</option>';
    }
    cityContainer.innerHTML = html;
    pageState.nowSelectCity = '北京';
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    addListener(cityContainer, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};
    var citySelected = pageState.nowSelectCity;
    var dateObj, month;
    var nowMonth = 1;
    var weekCount = 1, dayCount = 0;
    var sum = 0;
    switch (pageState.nowGraTime) {
        case 'day':
            chartData = aqiSourceData[citySelected];
            break;
        case 'week':
            for (var date in aqiSourceData[citySelected]) {
                dateObj = new Date(date);
                dayCount++;
                month = dateObj.getMonth() + 1;
                //先判断月份是否变化
                if (month !== nowMonth) {
                    //假如上个月的最后一天不是周日
                    if (dayCount !== 1) {
                        chartData[nowMonth + '月第' + weekCount + '周'] = Math.floor(sum / dayCount);
                    }
                    nowMonth = month;
                    weekCount = 1;
                    dayCount = 0;
                    sum = 0;
                }
                //再判断周
                if (dateObj.getDay() == 0) {
                    chartData[nowMonth + '月第' + weekCount + '周'] = Math.floor(sum / dayCount);
                    weekCount++;
                    dayCount = 0;
                    sum = 0;
                }
                sum += aqiSourceData[citySelected][date];
            }
            //处理最后一周的数据
            //假如最后一周不是周日，则未被计算
            if (dayCount !== 0) {
                chartData[nowMonth + '月第' + weekCount + '周'] = Math.floor(sum / dayCount);
            }
            break;
        case 'month':
            for (var date in aqiSourceData[citySelected]) {
                dayCount++;
                dateObj = new Date(date);
                month = dateObj.getMonth() + 1;
                //每当月份改变时，计算一次平均值
                if (month !== nowMonth) {
                    chartData[nowMonth + '月'] = Math.floor(sum / dayCount);
                    nowMonth = month;
                    sum = 0;
                }
                sum += aqiSourceData[citySelected][date];
            }
            //处理最后一个月
            chartData[month + '月'] = Math.floor(sum / dayCount);
            break;
    }
}

// 根据空气质量值得到颜色值
function getColor(data) {
    var level = 0;
    var colors = ['#0f0', '#ff0', '#E9967A', '#f00', '#871F78', '#000'];
    if (data > 300) {
        level = 5;
    } else if (data > 200) {
        level = 4;
    } else if (data > 150) {
        level = 3;
    } else if (data > 100) {
        level = 2;
    } else if (data > 50) {
        level = 1;
    }
    return colors[level];
}

// 添加监听
function addListener(obj, type, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(type, handler, false);
    } else if (obj.attachEvent()) {
        obj.attachEvent('on' + type, handler);
    } else {
        obj['on' + type] = handler;
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}
init();