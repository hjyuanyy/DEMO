//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indexMenu: [],    
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 页面加载完毕后执行
  onLoad: function () {
    this.fetchData()
  },
  // 获取模拟数据的方法 实际为ajax异步获取数据
  fetchData: function () {
    this.setData({
      imgUrls: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514896309530&di=89fdcaa11bfb279f3f7698056fc47ecc&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F00%2F40%2F82%2F4e12bc6cdc5773640b6b17e7ff499e1b.png',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1773762743,2640233846&fm=27&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3845276233,2999346508&fm=27&gp=0.jpg'
      ],
      indexMenu: [
        {
          'icon': '../../images/icon_01.png',
          'text': 'module1',
          'url': 'menu1'
        },
        {
          'icon': '../../images/icon_02.png',
          'text': 'module2',
          'url': 'menu2'
        },
        {
          'icon': '../../images/icon_03.png',
          'text': 'module3',
          'url': 'menu3'
        },
        {
          'icon': '../../images/icon_04.png',
          'text': 'module4',
          'url': 'conference'
        },
        {
          'icon': '../../images/icon_05.png',
          'text': 'module5',
          'url': 'resource'
        },
        {
          'icon': '../../images/icon_06.png',
          'text': 'module6',
          'url': 'question'
        }
      ]
    })
  }
})
