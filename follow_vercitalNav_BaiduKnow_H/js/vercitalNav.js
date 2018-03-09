function _vercitalNav(section, side) {
  // section内容模块 side导航图标模块 isId/class/Tag 【是父级元素！】
  var section = document.querySelector(section),
    sectionLis = section.children;
  var side = document.querySelector(side),
    sideLis = side.children,
    sideLiHeight = sideLis[0].offsetHeight;

  // 获取每个li的顶部边界距离
  var sectionLisH = [];
  for (var i = 0, len = sectionLis.length; i < len; i++) {
    if (i === 0) {
      sectionLisH.push(0);
    } else {
      sectionLisH.push(sectionLis[i].offsetHeight + sectionLisH[i - 1]);
    }
  }
  // console.log(sectionLisH);

  // 【需要配合html元素进行修改】目前只支持10个导航选项
  var vercitalNav = {
    init: function () {
      var scrollY = window.scrollY;
      if (scrollY >= sectionLisH[0] && scrollY < sectionLisH[1] - sideLiHeight) {} else if (scrollY >= sectionLisH[1] - sideLiHeight * 1 && scrollY < sectionLisH[2] - sideLiHeight * 2) {
        sideLis[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[2] - sideLiHeight * 2 && scrollY < sectionLisH[3] - sideLiHeight * 3) {
        for (var i = 0; i < 2; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[3] - sideLiHeight * 3 && scrollY < sectionLisH[4] - sideLiHeight * 4) {
        for (var i = 0; i < 3; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[4] - sideLiHeight * 4 && scrollY < sectionLisH[5] - sideLiHeight * 5) {
        for (var i = 0; i < 4; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[5] - sideLiHeight * 5 && scrollY < sectionLisH[6] - sideLiHeight * 6) {
        for (var i = 0; i < 5; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[6] - sideLiHeight * 6 && scrollY < sectionLisH[7] - sideLiHeight * 7) {
        for (var i = 0; i < 6; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[7] - sideLiHeight * 7 && scrollY < sectionLisH[8] - sideLiHeight * 8) {
        for (var i = 0; i < 7; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[8] - sideLiHeight * 8 && scrollY < sectionLisH[9] - sideLiHeight * 9) {
        for (var i = 0; i < 8; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[9] - sideLiHeight * 9 && scrollY < sectionLisH[10] - sideLiHeight * 10) {
        for (var i = 0; i < 9; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      } else if (scrollY >= sectionLisH[10] - sideLiHeight * 10 && scrollY < sectionLisH[11] - sideLiHeight * 11) {
        for (var i = 0; i < 10; i++) {
          sideLis[i].style.visibility = 'visible';
        }
      }
    },
    handler: function () {
      var scrollY = window.scrollY;
      // console.log(scrollY);

      // 2 => 600 - 34 * 1
      // 3 => 1200 - 34 * 2

      if (scrollY >= sectionLisH[0] && scrollY < sectionLisH[1] - sideLiHeight) {
        sideLis[0].style.visibility = 'visible';
        sideLis[0].classList.add('navIconAction');
        sectionLis[0].children[0].style.visibility = 'hidden';

        sideLis[1].style.visibility = 'hidden';
        sectionLis[1].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[1] - sideLiHeight * 1 && scrollY < sectionLisH[2] - sideLiHeight * 2) {
        sideLis[0].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[1].style.visibility = 'visible';
        sideLis[1].classList.add('navIconAction');
        sectionLis[1].children[0].style.visibility = 'hidden';

        sideLis[2].style.visibility = 'hidden';
        sectionLis[2].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[2] - sideLiHeight * 2 && scrollY < sectionLisH[3] - sideLiHeight * 3) {
        sideLis[1].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[2].style.visibility = 'visible';
        sideLis[2].classList.add('navIconAction');
        sectionLis[2].children[0].style.visibility = 'hidden';

        sideLis[3].style.visibility = 'hidden';
        sectionLis[3].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[3] - sideLiHeight * 3 && scrollY < sectionLisH[4] - sideLiHeight * 4) {
        sideLis[2].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[3].style.visibility = 'visible';
        sideLis[3].classList.add('navIconAction');
        sectionLis[3].children[0].style.visibility = 'hidden';

        sideLis[4].style.visibility = 'hidden';
        sectionLis[4].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[4] - sideLiHeight * 4 && scrollY < sectionLisH[5] - sideLiHeight * 5) {
        sideLis[3].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[4].style.visibility = 'visible';
        sideLis[4].classList.add('navIconAction');
        sectionLis[4].children[0].style.visibility = 'hidden';

        sideLis[5].style.visibility = 'hidden';
        sectionLis[5].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[5] - sideLiHeight * 5 && scrollY < sectionLisH[6] - sideLiHeight * 6) {
        sideLis[4].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[5].style.visibility = 'visible';
        sideLis[5].classList.add('navIconAction');
        sectionLis[5].children[0].style.visibility = 'hidden';

        sideLis[6].style.visibility = 'hidden';
        sectionLis[6].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[6] - sideLiHeight * 6 && scrollY < sectionLisH[7] - sideLiHeight * 7) {
        sideLis[5].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[6].style.visibility = 'visible';
        sideLis[6].classList.add('navIconAction');
        sectionLis[6].children[0].style.visibility = 'hidden';

        sideLis[7].style.visibility = 'hidden';
        sectionLis[7].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[7] - sideLiHeight * 7 && scrollY < sectionLisH[8] - sideLiHeight * 8) {
        sideLis[6].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[7].style.visibility = 'visible';
        sideLis[7].classList.add('navIconAction');
        sectionLis[7].children[0].style.visibility = 'hidden';

        sideLis[8].style.visibility = 'hidden';
        sectionLis[8].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[8] - sideLiHeight * 8 && scrollY < sectionLisH[9] - sideLiHeight * 9) {
        sideLis[7].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[8].style.visibility = 'visible';
        sideLis[8].classList.add('navIconAction');
        sectionLis[8].children[0].style.visibility = 'hidden';

        sideLis[9].style.visibility = 'hidden';
        sectionLis[9].children[0].style.visibility = 'visible';
      } else if (scrollY >= sectionLisH[9] - sideLiHeight * 9 && scrollY < sectionLisH[10] - sideLiHeight * 10) {
        sideLis[8].classList.remove('navIconAction'); // 垂直导航去除高亮

        sideLis[9].style.visibility = 'visible';
        sideLis[9].classList.add('navIconAction');
        sectionLis[9].children[0].style.visibility = 'hidden';

        sideLis[10].style.visibility = 'hidden';
        sectionLis[10].children[0].style.visibility = 'visible';
      }

    },
    navBtnInit: function () {
      side.onclick = function (e) {
        var e = e || window.event;
        if (e.target.tagName !== 'LI') {
          return;
        }
        var currentSite = window.scrollY;
        var site = e.target.getAttribute('data-nav'); // 侧边导航自定义属性 0~x
        var nextSite = sectionLisH[site] - sideLiHeight * site; // 获取下个位置
        // [当前位置, 下一个位置]
        if (currentSite === nextSite) {
          // console.log('return');
          return;
        }
        move['elastic']([currentSite, nextSite], 1600, function (v) {
          window.scrollTo(currentSite, v);
        })
      }
    }
  };

  return vercitalNav;
}

// 获取使用方法
// var vercitalNav = _vercitalNav('.section', '.side');
// vercitalNav.init(); // 初始化
// vercitalNav.navBtnInit(); // 导航按钮初始化
// window.onscroll = function () {
//   vercitalNav.handler();
// };