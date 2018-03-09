function View_watcher(params) {
	this.context = {}; //context	
	this.data = params.data;
	this.watcher = params.watch; //监听的属性集
	this.initId = 0;
	this.events = [];
	//	this.initCb = params.cb || {};
	//	if(params.changeBefore) {
	//		this.changeBefore = params.changeBefore;
	//	}
	/******************模版渲染部分****************************/
	this.ele = typeof params.temEle == "string" ? document.querySelector(params.temEle) : params.temEle;
	this.bindArea = null; //储存容器
	this.init();
}
View_watcher.prototype = {
	init: function () {
		this.extend(this.context, this.data); //扩展作用域
		var context = this.context,
			callback = this.callback;
		for (var i in context) {
			this._defineProperty(context, i, callback, i);
		}
		this.expDeal();
		this.$emit('expDeal', {
			exp: "ok+1",
			cb: function (r) {
				console.log(r)
			}
		})
		this.$emit('expDeal', {
			exp: "Number(test.id)+8",
			cb: function (r) {
				console.log(r)
			}
		})
	},
	extend: function (to, _from) {
		for (var key in _from) {
			to[key] = _from[key];
		}
		return to;
	},
	"$on": function (n, fn) {
		this.events[n] = fn;
	},
	"$emit": function (n, p) {
		this.events[n] && this.events[n](p);
	},
	_deepCopy: function (p, c, d) { //深拷贝对象_deepCopy(obj);
		if (!d && typeof p != "object") {
			return p;
		}
		if (Array.isArray(p)) {
			var c = c || [];　
		} else {
			var c = c || {};
		}　
		for (var i in p) {
			var temp = p[i];　　
			if (typeof temp === 'object') {　　　　　　
				c[i] = (temp.constructor === Array) ? [] : {};　　　　　　　
				this._deepCopy(temp, c[i], true); //递归调用深拷贝,此时c[i]为地址引用　　　
			} else {　　　　　　　
				c[i] = temp;　　　
			}　　　　
		}
		return c;　　
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
				if (!this._equal(a[i], b[i], true)) {
					return false;
				}
			} else {
				if (a[i] !== b[i]) {
					return false;
				}
			}　　　　
		}
		return true;
	},
	_inheritPrototype: function (Child, Parent) { //继承原型链
		var F = function () {};　
		F.prototype = Parent.prototype;
		Child.prototype = new F(); //使Child.prototype原型链隐式指向Parent.prototype(_proto_属性)
		Child.prototype.constructor = Child;　
		F = null; //释放内存
	},
	_ArrayWatch: function (oa, cb, fn) { //监听数组方法造成的变化
		var self = this;

		function ArrayOfMine() {
			var args = arguments,
				len = args.length,
				i = 0,
				args$1 = []; // 保存所有arguments
			for (; i < len; i++) {
				// 判断参数是否为数组，如果是则直接concat
				if (Array.isArray(args[i])) {
					args$1 = args$1.concat(args[i]);
				}
				// 如果不是数组，则直接push到
				else {
					args$1.push(args[i]);
				}
			}
			// 接收Array.apply的返回值，刚接收的时候arr是一个Array
			var arr = Array.apply(null, args$1); //获取返回的数组
			// 将arr的__proto__属性指向 ArrayOfMine的 prototype
			arr.__proto__ = ArrayOfMine.prototype; //改变原型链的隐式指向
			return arr;
		}
		this._inheritPrototype(ArrayOfMine, Array); //原型链继承
		var method = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', "concat", "join"]; //map
		for (var i in method) {
			ArrayOfMine.prototype[method[i]] = function () {
				var s = method[i]; //闭包缓存一个值
				return function () {
					var old = self._deepCopy(this); //此处this为数组对象
					Array.prototype[s].apply(this, arguments); //有返回值
					if (self._equal(this, old)) {
						return;
					}
					if (s != "join") {
						fn && fn(); //重置监听数组所有成员	
					}
					cb && cb(this, old); //回调
				}
			}();
		}
		return new ArrayOfMine(oa);
	},
	callback: function (newval, oldval, name) { //总的回调
		console.log(newval, oldval, name);
	},
	_forBind: function (obj, cb, name) {
		if (Array.isArray(obj)) {
			for (var i = 0; i < obj.length; i++) {
				this._defineProperty(obj, i, cb, name);
			}
		} else {
			for (var i in obj) {
				this._defineProperty(obj, i, cb, name);
			}
		}
	},
	_defineProperty: function (obj, atrr, cb, name) {
		//		if(obj.__ob__)= {
		//			attr: name,
		//		};
		var self = this,
			temp = obj[atrr],
			bind = null;
		if (Array.isArray(temp)) { //数组处理
			bind = this._ArrayWatch(temp, function (newval, oldval) {
				cb(newval, oldval, name);
			}, function () {
				self._forBind(temp, cb, name); //重新更新
			});
		} else {
			bind = temp; //保存老值,引用类型则为指向地址
		}
		Object.defineProperty(obj, atrr, {
			set: function (newval) {
				console.log(newval)
				var oldval = self._deepCopy(bind); //深拷贝,返回老值
				if (self._equal(newval, oldval)) {
					return;
				}
				bind = newval; //赋予新值
				cb && cb(newval, oldval, name); //新值,老值
			},
			get: function () { //会使属性值指向bind
				return bind;
			},
			configurable: true,
			enumerable: true
		});
		if (typeof bind == "object") { //监听数组或对象的各个属性
			if (!bind.__ob__) {
				self.set_ob(bind, { //会使属性值指向bind
					rootAttr: name,
					id: ++this.initId,
					value: bind
				});
			};
			this._forBind(bind, cb, name); //此时obj[atrr]的地址指向bind
		}
	},
	set_ob: function (a, val) {
		Object.defineProperty(a, '__ob__', {
			get: function () {
				return val;
			},
			configurable: false,
			enumerable: false
		});
	},
	_dataDeal: function (a) {
		var arr = a || this.bindArea;
		for (var i = 0; i < arr.length; i++) {
			var temp = arr[i];
			var evalVal = temp.data.match(/{{.+}}/)[0].replace(/{{|}}/gi, "") //目前只支持单个{{}}，不支持一个文本节点含多个'{{}}'的数据处理
			var define_result;
			try {
				with(this.obj) { //加上局部作用域;(angular的$root的实现:$scope.$root=$rootScope(利用地址指向))
					eval('define_result=' + evalVal);
				}
			} catch (e) {
				define_result = "";
				//console.error("error");
			}
			//console.log(define_result)
			var onew = temp.data.replace(/{{.+}}/, define_result);
			if (temp.current != onew) {
				this.changeBefore && this.changeBefore(temp, onew);
				temp.current = onew;
				temp.ele.nodeValue = temp.current; //赋值			
			}
		}
	},
	expDeal: function () {
		var self = this,
			keys = [],
			vals = [],
			temp = this.context;
		for (var i in temp) {
			keys.push(i); //作用域
			vals.push(temp[i]); //作用域的值
		}

		self.$on('expDeal', function (p) {
			var expFN = Function.apply(null, keys.concat(['return ' + p.exp])); //作用域始终是全局的
			var result = expFN.apply(null, vals);
			p.cb(result);
			result = null;
		});
	}

}