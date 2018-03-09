const WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    // 轮播图组件参数配置
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentIndex: 0
  },
  // 模拟数据
  fetchData: function () {
    this.setData({
      imgUrls: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514522477305&di=6360456b0482da83c48955a58c332db2&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F46%2F12%2F09358PIC968_1024.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=492596706,3806314476&fm=11&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2176082129,2873095377&fm=27&gp=0.jpg'
      ]
    })
  },
  imgPreview: function () { //图片预览
    const imgs = this.data.imgUrls // isArr allUrl
    wx.previewImage({
      current: imgs[this.data.currentIndex], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  setCurrent: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  // 跳转去地图
  to_map: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // res 包含用户当前的位置
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // console.log("经度:"+ longitude+" 纬度:" +latitude)
        // 深圳北 经度 114.0275  纬度纬度 22.6083
        wx.openLocation({
          address: '深圳北站',
          longitude: 114.02754000000004,
          latitude: 22.60832,
          scale: 18
        })
      }
    })
  },
  // 页面加载完毕后执行
  onLoad: function (options) {
    // 载入轮播数据
    this.fetchData()
    // wxParse
    const article = `
      <div>
        <h1>使用wxParse，解析html片段</h1>
        <h2>h2&lt;&nbsp;&nbsp;&gt;</h2>
        <h3>h3</h3>
        <h4>h4</h4>
      </div>
    `;
    const that = this;
    // 使用第三方插件解析html片段
    WxParse.wxParse('article', 'html', article, that, 1);
  }
})