const wxCharts = require('../../utils/wxcharts')
let app = getApp()
let lineChart = null,
  scrollLineChart = null,
  pieChart = null,
  columnChart = null,
  areaChart = null,
  ringChart = null,
  radarChart = null
Page({
  data: {
    chartTitle: '总成交量',
    // column退出详情按钮显示隐藏
    isMainChartDisplay: true,
    // columnData
    chartData: {
      main: {
        title: '总成交量',
        data: [15, 20, 45, 37, 66, 33, 44, 55, 88],
        categories: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
      },
      sub: [{
          title: '2009年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        },
        {
          title: '2010年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        },
        {
          title: '2011年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2012年度成交量',
          data: [70, 40, 65, 100, 34, 18],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2013年度成交量',
          data: [55, 30, 45, 36, 56, 13],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2014年度成交量',
          data: [76, 45, 32, 74, 54, 35],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2015年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2016年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }, {
          title: '2017年度成交量',
          data: [76, 54, 23, 12, 45, 65],
          categories: ['标题一', '标题二', '标题三', '标题四', '标题五', '标题六']
        }
      ]
    }
  },

  // line数据提示框
  lineTooltip: function (e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    })
  },

  // area数据提示框
  areaTooltip: function (e) {
    areaChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    })
  },

  // column详情回退
  backToMainChart: function () {
    this.setData({
      chartTitle: this.data.chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: this.data.chartData.main.categories,
      series: [{
        name: '成交量',
        data: this.data.chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }]
    });
  },
  // column数据详情
  columnTouchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < this.data.chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: this.data.chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: this.data.chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: this.data.chartData.sub[index].data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });
    }
  },

  // 可滚动线图
  touchHandler: function (e) {
    scrollLineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    scrollLineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    scrollLineChart.scrollEnd(e);
    scrollLineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  // 页面加载完毕
  onLoad: function (e) {
    // 获取设备宽度
    var systemInfo = wx.getSystemInfoSync();
    var windowWidth = systemInfo.windowWidth;

    // line
    lineChart = new wxCharts({
      animation: true,
      // background: '#f5f5f5',
      canvasId: 'lineCanvas',
      type: 'line',
      dataPointShape: false,
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // 【x轴数据】
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      series: [{
          name: '成交量1',
          data: [4, 7, 3, 2, 5, 2, 8, 6, 3, 1],
          format: function (val) {
            return val.toFixed(2) + '万';
          }
        },
        {
          name: '成交量2',
          data: [null, 1, 4, 3, 1, 4, 0, 0, 2, 0],
          format: function (val) {
            return val.toFixed(2) + '万';
          }
        }
      ],
      width: windowWidth,
      height: 220,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    })
    // scrollLine
    scrollLineChart = new wxCharts({
      canvasId: 'scrollLineCanvas',
      type: 'line',
      categories: ["201720162-1", "201720162-2", "201720162-3", "201720162-4", "201720162-5", "201720162-6", "201720162-7", "201720162-8", "201720162-9", "201720162-10"],
      animation: false,
      series: [{
        name: '成交量1',
        data: [11.601936565601482, 16.037290177920987, 18.07842417900766, 10.669950380869004, 15.389062993578671, 17.974183170702666, 14.452252765338953, 19.817539241829955, 11.230161721797803, 17.1293359166598],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 220,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
    // pie
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '成交量1',
        data: 15,
      }, {
        name: '成交量2',
        data: 35,
      }, {
        name: '成交量3',
        data: 78,
      }, {
        name: '成交量4',
        data: 63,
      }, {
        name: '成交量5',
        data: 35,
      }],
      width: windowWidth,
      height: 220,
      dataLabel: true
    })
    // column
    columnChart = new wxCharts({
      animation: true,
      canvasId: 'columnCanvas',
      type: 'column',
      categories: this.data.chartData.main.categories,
      series: [{
        name: '成交量1',
        data: this.data.chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        title: '￥',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200
    })
    // area
    areaChart = new wxCharts({
      animation: true,
      canvasId: 'areaCanvas',
      type: 'area',
      categories: ['1', '2', '3', '4', '5', '6'],
      xAxis: {
        fontColor: '#7cb5ec',
        gridColor: '#7cb5ec'
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
        fontColor: '#8085e9',
        gridColor: '#8085e9',
        titleFontColor: '#f7a35c'
      },
      series: [{
        name: '成交量1',
        data: [32, 45, 50, 56, 33, 34],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      extra: {
        legendTextColor: '#cb2431'
      },
      width: windowWidth,
      height: 220
    })
    // ring
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '70%',
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '收益率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 220,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    // radar
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['1', '2', '3', '4', '5', '6'],
      series: [{
        name: '成交量',
        data: [90, 110, 125, 95, 87, 122]
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  },
})