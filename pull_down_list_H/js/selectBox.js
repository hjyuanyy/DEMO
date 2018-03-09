var select_user = document.querySelector('.select_user');

var selectOptions = [{
  bank: ['工商银行', '建设银行', '平安银行']
}, {
  payWay: ['微信', '支付宝']
}, {
  payAisle: ['渠道1', '渠道2']
}, {
  user: ['商户1', '商户2', '商户3', '商户4', '商户5', '商户6', '商户7', '商户8', '商户9', '商户10', '商户11', '商户12', '商户13', '商户14', '商户15', '商户16', '商户17', '商户18', '商户19', '商户20', '商户21']
}]

for (var i = 0, len = selectOptions.length; i < len; i++) {
  for (var k in selectOptions[i]) {
    // selectOptions[i][k]

    var dataLen = selectOptions[i][k].length;
    var order = 1;

    // 每10个数据一个列表
    while (dataLen > 0) {
      var ulEle = document.createElement('ul');
      ulEle.classList.add('second_nav');
      ulEle.classList.add('second_nav' + order);

      var selectOption = document.querySelector('.select_' + k);

      var cutArr = selectOptions[i][k].slice((order - 1) * 10, order * 10);

      var lisStr = '';
      for (var j = 0; j < cutArr.length; j++) {
        lisStr += '<li>' + cutArr[j] + '</li>';
      }

      ulEle.innerHTML = lisStr;
      selectOption.appendChild(ulEle);

      var second_nav = selectOption.querySelector('.second_nav' + order);
      second_nav.style.left = 100 * order + order + '%'; // 控制二级导航偏移量

      order++;
      dataLen -= 10;
    }

  }
}

_dropDownList({
  selectBox: '.selectBox', // 盒子元素
  selectBox_cur: '.selectBox_cur', // 点击显隐元素
  selectBox_trigon: '.selectBox_trigon', // 小三角
  selectBox_action: 'selectBox_action', // 点击后的样式类名
  second_nav: '.second_nav'
});

function _dropDownList(param) { // isObj
  var selectBox = document.querySelector(param.selectBox), // 控制overflow属性
    selectBox_cur = document.querySelector(param.selectBox_cur), // 点击显隐导航
    selectBox_trigon = document.querySelector(param.selectBox_trigon); // 小三角



  // 点击显/隐导航
  var trigger = false; // 开关
  selectBox_cur.onclick = function (e) {
    var e = e || window.event;

    // 使用hidden的条件
    if (e.target.className.indexOf(param.selectBox_cur.replace(/\./, '')) === -1) {
      return;
    }

    if (trigger) {
      selectBox.style.overflow = 'hidden';
      selectBox.style.boxShadow = 'none';
      selectBox_trigon.classList.remove(param.selectBox_action);
      trigger = false;
    } else {
      // selectBoxAction    
      selectBox.style.overflow = 'visible';
      selectBox.style.boxShadow = '0 0 2px #1E90FF';
      selectBox_trigon.classList.add(param.selectBox_action);
      trigger = true;
    }
  }

  // 二级导航li点击事件
  var secondNavs = document.querySelectorAll(param.second_nav);
  for (var i = 0, len = secondNavs.length; i < len; i++) {
    (function (i) {
      secondNavs[i].onclick = function (e) {
        selectBox_cur.innerHTML = e.target.innerHTML; // 替换第一选项文本
        // 隐藏操作
        selectBox.style.overflow = 'hidden';
        selectBox.style.boxShadow = 'none';
        selectBox_trigon.classList.remove(param.selectBox_action);
        trigger = false;
      }
    })(i)
  }
}