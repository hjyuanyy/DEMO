function Mvvm(params) { //obj鍙兘涓哄璞�
  this.obj = {};
  this.bind = {};
  this.initData = params.data;
  this.initCb = params.cb || {};
  if (params.changeBefore) {
    this.changeBefore = params.changeBefore;
  }
  /******************妯＄増娓叉煋閮ㄥ垎****************************/
  this.ele = typeof params.temEle == "string" ? document.querySelector(params.temEle) : params.temEle;
  this.bindArea = null; //鍌ㄥ瓨瀹瑰櫒
  this._init();
}
Mvvm.prototype = {
  constructor: Mvvm,
  _deepCopy: function (p, c, d) { //娣辨嫹璐濆璞�
    if (!d && typeof p != "object") {
      return p;
    }
    if (Array.isArray(p)) {
      var c = c || [];
      // 銆€
    } else {
      var c = c || {};
    }
    // 銆€
    for (var i in p) {
      var temp = p[i];
      // 銆€ 銆€
      if (typeof temp === 'object') {
        // 銆€ 銆€ 銆€ 銆€ 銆€ 銆€
        c[i] = (temp.constructor === Array) ? [] : {};
        // 銆€ 銆€ 銆€ 銆€ 銆€ 銆€ 銆€
        this._deepCopy(temp, c[i], true); //閫掑綊璋冪敤娣辨嫹璐�,姝ゆ椂c[i]涓哄湴鍧€寮曠敤銆€銆€銆€
      } else {
        // 銆€ 銆€ 銆€ 銆€ 銆€ 銆€ 銆€
        c[i] = temp;
        // 銆€ 銆€ 銆€
      }
      // 銆€ 銆€ 銆€ 銆€
    }
    return c;
    // 銆€ 銆€
  },
  _equal: function (a, b, c) {
    if (!(typeof a == typeof b && typeof a == "object") || typeof a != typeof b && !c) {
      return a === b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length != b.length) {
        return false;
      }
    } else if (!Array.isArray(a) && !Array.isArray(b)) {
      var alength = 0,
        blength = 0;
      for (var i in a) {
        alength += 1;
      }
      for (var i in b) {
        blength += 1;
      }
      if (alength != blength) {
        alength = null;
        blength = null;
        return false;
      }
    } else {
      return false;
    }
    for (var i in a) {
      if (typeof a[i] == 'object' && typeof b[i] == 'object') {
        // 銆€ 銆€ 銆€ 銆€ 銆€ 銆€
        if (!this._equal(a[i], b[i], true)) {
          return false;
        }
      } else {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      // 銆€ 銆€ 銆€ 銆€
    }
    return true;
  },
  _bind: function (atrr, val, cb) { //缁戝畾鏁版嵁鍜寁iew(涓嶈兘缁戝畾鍑芥暟)
    this.obj[atrr] = val;
    this._defineProperty(this.obj, atrr, cb);
  },
  _forBind: function (obj, cb) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        this._defineProperty(obj, i, cb);
      }
    } else {
      for (var i in obj) {
        this._defineProperty(obj, i, cb);
      }
    }
  },
  _defineProperty: function (obj, atrr, cb) {
    var self = this;
    var bind = this._deepCopy(obj[atrr]); //淇濆瓨鑰佸€�
    if (Array.isArray(obj[atrr])) {
      bind = this._ArrayWatch(bind, cb, function () {
        self._forBind(obj[atrr], cb);
      });
    }
    Object.defineProperty(obj, atrr, {
      set: function (newval) {
        var oldval = self._deepCopy(bind); //娣辨嫹璐�,杩斿洖鑰佸€�
        if (self._equal(newval, oldval)) {
          return;
        }
        bind = newval; //璧嬩簣鏂板€�
        cb && cb(oldval, newval);
      },
      get: function () {
        return bind;
      },
      configurable: true,
      enumerable: true
    })
    var temp = obj[atrr];
    if (typeof temp == "object") {
      this._forBind(obj[atrr], cb);
    }
  },
  _inheritPrototype: function (Child, Parent) { //缁ф壙鍘熷瀷閾�
    var F = function () {};
    // 銆€
    F.prototype = Parent.prototype;
    Child.prototype = new F(); //浣緾hild.prototype鍘熷瀷閾鹃殣寮忔寚鍚慞arent.prototype(_proto_灞炴€�)
    Child.prototype.constructor = Child;
    // 銆€
    F = null; //閲婃斁鍐呭瓨
  },
  _ArrayWatch: function (oa, cb, fn) { //鐩戝惉鏁扮粍鏂规硶閫犳垚鐨勫彉鍖�
    var self = this;

    function ArrayOfMine() {
      var args = arguments,
        len = args.length,
        i = 0,
        args$1 = []; // 淇濆瓨鎵€鏈塧rguments
      for (; i < len; i++) {
        // 鍒ゆ柇鍙傛暟鏄惁涓烘暟缁勶紝濡傛灉鏄垯鐩存帴concat
        if (Array.isArray(args[i])) {
          args$1 = args$1.concat(args[i]);
        }
        // 濡傛灉涓嶆槸鏁扮粍锛屽垯鐩存帴push鍒�
        else {
          args$1.push(args[i]);
        }
      }
      // 鎺ユ敹Array.apply鐨勮繑鍥炲€硷紝鍒氭帴鏀剁殑鏃跺€檃rr鏄竴涓狝rray
      var arr = Array.apply(null, args$1); //鑾峰彇杩斿洖鐨勬暟缁�
      // 灏哸rr鐨刜_proto__灞炴€ф寚鍚� ArrayOfMine鐨� prototype
      arr.__proto__ = ArrayOfMine.prototype; //鏀瑰彉鍘熷瀷閾剧殑闅愬紡鎸囧悜
      return arr;
    }
    this._inheritPrototype(ArrayOfMine, Array); //鍘熷瀷閾剧户鎵�
    // 閲嶅啓鐖剁被Array鐨刾ush,pop绛夋柟娉�
    var method = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', "concat", "join"]; //map
    var a; //鎸囧悜鐢熸垚鏁扮粍鐨勫湴鍧€
    for (var i in method) {
      ArrayOfMine.prototype[method[i]] = function () {
        var s = method[i]; //闂寘缂撳瓨涓€涓€�
        return function () {
          console.log('鐩戝惉鍒版暟缁勭殑鍙樺寲鍟︼紒');
          var b = self._deepCopy(a);
          Array.prototype[s].apply(this, arguments); //鏈夎繑鍥炲€�
          if (self._equal(b, a)) {
            return;
          }
          if (s != "join") {
            fn && fn(); //閲嶇疆鐩戝惉鏁扮粍鎵€鏈夋垚鍛�	
          }
          cb && cb(b, a); //鍥炶皟
        }
      }();
    }
    a = new ArrayOfMine(oa);
    return a;
  },
  /******************妯＄増娓叉煋閮ㄥ垎****************************/
  _init: function () {
    this.bindArea = this._findTextNode(this.ele); //妯＄増澶勭悊
    var self = this;
    for (var a in this.initData) {
      (function (i) {
        self._bind(i, self.initData[i], function (oold, onew) { //value atrr cb
          self._dataDeal();
          self.initCb[i] && self.initCb[i](oold, onew);
        });
      })(a)
    }
    this._dataDeal();
  },
  _findTextNode: function (ele) {
    var arr = [];
    var target = ele.childNodes;
    for (var i = 0; i < target.length; i++) {
      var temp = target[i];
      var nodeVal = temp.nodeValue;
      if (temp.nodeType == 3 && !/^\s*$/.test(nodeVal)) {
        var model = nodeVal.match(/{{.+}}/gi);
        model && arr.push({
          ele: temp,
          data: nodeVal //杩欓噷淇濆瓨鍊�,濡�:123{{a.type}}
        });
      }
      if (temp.nodeType == 1) {
        arr = arr.concat(this._findTextNode(temp));
      }
    }
    return arr;
  },
  _dataDeal: function (a) {
    var arr = a || this.bindArea;
    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i];
      var evalVal = temp.data.match(/{{.+}}/)[0].replace(/{{|}}/gi, "") //鐩墠鍙敮鎸佸崟涓獅{}}锛屼笉鏀寔涓€涓枃鏈妭鐐瑰惈澶氫釜'{{}}'鐨勬暟鎹鐞�
      var define_result;
      try {
        with(this.obj) { //鍔犱笂灞€閮ㄤ綔鐢ㄥ煙;(angular鐨�$root鐨勫疄鐜�:$scope.$root=$rootScope(鍒╃敤鍦板潃鎸囧悜))
          eval('define_result=' + evalVal);
        }
      } catch (e) {
        define_result = "";
        //console.error("error");
      }
      //			console.log(define_result)
      var onew = temp.data.replace(/{{.+}}/, define_result);
      if (temp.current != onew) {
        this.changeBefore && this.changeBefore(temp, onew);
        temp.current = onew;
        temp.ele.nodeValue = temp.current; //璧嬪€�			
      }
    }
  }
}
/* 浼樺寲鏂规:
 * 缂撳瓨瀵瑰簲鏁版嵁鐨勫搴旇妭鐐�,鐩戝惉鏀瑰彉鏃剁洿鎺ュ幓鏀瑰彉瀵瑰簲鑺傜偣,涓嶅繀寰幆鎵ц妯＄増鐨勫叏閮ㄥ唴瀹�.
 */