function _ringMenu(param) { // chart-menu-item
  var _doc = document,
    chartMenuRing = _doc.querySelector(param.chartMenuRing),
    chartMenuCenter = _doc.querySelector(param.chartMenuCenter),
    chartMenuCircle = _doc.querySelector(param.chartMenuCircle),
    // chartLoading = _doc.querySelector(param.chartLoading), // 【loading】
    chartMenuItem = _doc.querySelectorAll(param.chartMenuItem), // 选项元素
    chartMenuOpen = param.chartMenuOpen;

  // 算法
  for (var i = 0, l = chartMenuItem.length; i < l; i++) {
    chartMenuItem[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

    chartMenuItem[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
  }

  // 点击menu显示圆
  chartMenuCenter.onclick = function (e) {
    chartMenuCircle.classList.toggle(chartMenuOpen);
  }

  // 移入menu显示圆
  chartMenuCenter.onmouseenter = function (e) {
    chartMenuCircle.classList.add(chartMenuOpen);
  }

  chartMenuRing.onmouseleave = function (e) {
    chartMenuCircle.classList.remove(chartMenuOpen);
  }

  chartMenuRing.onclick = function (e) {
    // chartLoading.style.display = 'block'; // 显示loading 【loading】
    var e = e || window.event;
    var target = e.target || e.srcElement; // 假装兼容ie
    // 获取字体图标类
    for (var i = 0, len = target.classList.length; i < len; i++) {
      if (target.classList[i].indexOf('chart-icon-') !== -1) {
        // 移除menu当前字体图标类
        for (var j = 0, l = chartMenuCenter.classList.length; j < l; j++) {
          if (chartMenuCenter.classList[j].indexOf('chart-icon-') !== -1) {
            chartMenuCenter.classList.remove(chartMenuCenter.classList[j]);
          }
        }
        chartMenuCenter.classList.add(target.classList[i]);
        chartMenuCircle.classList.remove(chartMenuOpen);
        // 获取自定义属性 拼接url
        var targetDIYAttr = target.getAttribute('data-type');

        // 发送ajax请求
        param.update({
          targetDIYAttr: targetDIYAttr
        });
      }
    }
  }
}
