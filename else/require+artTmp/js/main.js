require.config({
  paths: {
    artTemplate: 'lib/art-template',
    head: 'art-common/head',
    center: 'art-common/center',
    footer: 'art-common/footer',
    swiper: 'lib/swiper-3.4.2.min'
  }
});

define(['artTemplate', 'head', 'center', 'footer', 'swiper'], function (template, artHead, artCenter, artFooter, swiper) {
  var head = {
    ele: 'head',
    artTmp: artHead,
    data: {}
  };

  var center = {
    ele: 'center',
    artTmp: artCenter,
    data: {}
  };
  
  var footer = {
    ele: 'footer',
    artTmp: artFooter,
    data: {}
  };

  renderTmp(head);
  renderTmp(center);
  renderTmp(footer);

  // 模板渲染函数
  function renderTmp(param) {
    var render = template.compile(param.artTmp);
    var content = render(param.data);
    document.getElementById(param.ele).innerHTML = content;
  }

  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // horizontal vertical
    loop: true,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  });

})