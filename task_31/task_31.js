(function () {
    var studentRadio = document.getElementById('student'),
        nonStudentRadio = document.getElementById('non-student'),
        citySelect = document.getElementById('city'),
        collegeSelect = document.getElementById('college'),
        collegeContainer = document.getElementById('college-container'),
        companyContainer = document.getElementById('company-container');

    var college = {
        '北京': ['北京大学', '清华大学', '北京理工大学', '中国传媒大学'],
        '大连': ['大连理工大学', '大连海事大学', '东北财经大学', '海军大连舰艇学院'],
        '上海': ['复旦大学', '上海交通大学', '同济大学']
    };

    //初始化列表，默认选中北京
    function init() {
        studentRadio.checked='checked';
        var cityHtml = '';
        for (var city in college) {
            cityHtml += '<option>' + city + '</option>';
        }
        citySelect.innerHTML = cityHtml;
        citySelect.value = '北京';
        collegeListRender();
    }

    init();

    function addListener(obj, type, handler) {
        if (obj.addEventListener) {
            obj.addEventListener(type, handler, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + type, handler);
        } else obj['on' + type] = handler;
    }

    addListener(studentRadio, 'click', studentRadioHandler);
    addListener(nonStudentRadio, 'click', nonStudentRadioHandler);
    addListener(citySelect, 'change', collegeListRender);

    function collegeListRender() {
        var collegeHtml = '';
        var citySelected = citySelect.value;
        for (var i = 0; i < college[citySelected].length; i++) {
            collegeHtml += '<option>' + college[citySelected][i] + '</option>';
        }
        collegeSelect.innerHTML = collegeHtml;
    }

    function studentRadioHandler() {
        collegeContainer.style.display = 'inherit';
        companyContainer.style.display = 'none';
    }

    function nonStudentRadioHandler() {
        collegeContainer.style.display = 'none';
        companyContainer.style.display = 'inherit';
    }
})();