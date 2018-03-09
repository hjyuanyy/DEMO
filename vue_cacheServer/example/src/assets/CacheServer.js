let serverObj = {
  keys: [],
  storage: {}
}

let CacheClass = function(name) {
  this.key = name // id
  this.caches = null // 传入地址引用
  this.isReg = false
}

CacheClass.prototype = {
  //可重复注册切换
  reg: function(arr) {
    if (Array.isArray(arr)) {
      this.caches = arr
      this.isReg = true
    }
  },
  check: function() {
    if (!this.isReg) {
      console.error('it are not activated,Please firstly register it!')
      return false // failure
    }
    return true // success
  },
  add: function(val, cache) {
    // val支持数组
    if (!this.check) {
      return
    }
    let arr = this.caches,
      temp = null
    if (Array.isArray(val)) {
      if (!cache) {
        cache = 0
      } else {
        cache++
      }
      if (val.length - 1 < cache) {
        return
      }
      temp = val[cache]
      index = arr.indexOf(temp)
      if (index == -1) {
        arr.push(temp)
      }
      return this.add(val, cache)
    }
    arr.push(val)
  },
  remove: function(val, cache) {
    // val支持数组
    if (!this.check) {
      return
    }
    let arr = this.caches,
      index = null
    if (Array.isArray(val)) {
      if (!cache) {
        cache = 0
      } else {
        cache++
      }
      if (val.length - 1 < cache) {
        return
      }
      index = arr.indexOf(val[cache])
      if (index > -1) {
        index = arr.splice(index, 1)
      }
      return this.remove(val, cache)
    }
    index = arr.indexOf(val)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  clear: function() {
    if (!this.check) {
      return
    }
    // this.caches=[]; // 会改变引用,不能直接赋值
    let arr = this.caches
    arr.splice(0, arr.length)
  }
}

export const cacheServer = function(name) {
  let storage = serverObj.storage,
    keys = serverObj.keys
  if (keys.indexOf(name) > -1) {
    return storage[name]
  }
  keys.push(name)
  storage[name] = new CacheClass(name)
  return storage[name]
}

export default cacheServer

// // 清除不需要的缓存服务
// export const destroyCache = function(nameArr) {
//   let keys = serverObj.keys,
//     storage = serverObj.storage

//   // 如果设置nameArr,则清除对应
//   if (nameArr && Array.isArray(nameArr)) {
//     nameArr.forEach(function(x) {
//       let index = keys.indexOf(x)
//       if (index > -1) {
//         keys.splice(index, 1)
//         storage[x] = null
//       }
//     })
//   }
//   // 如果不设置nameArr,则清除所有
//   if (!nameArr) {
//     serverObj = {
//       keys: [],
//       storage: {}
//     }
//   }
// }
