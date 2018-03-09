## vue 缓存服务使用文档
场景 A->B->C  
实现 C->B使用缓存，A->B重新加载  

支持开多个不同的缓存  

--------------------------------------------------------------

### 父组件中初始化缓存服务
```
<keep-alive :include="myCache">
  <router-view/>
</keep-alive>

import CacheServer from './assets/CacheServer' // 引入服务
export default {
  data() {
    return {
      myCache: [] // 缓存数组对象
    }
  },
  created() {
    CacheServer('test').reg(this.myCache) // 初始化
  }
}
```
--------------------------------------------------------------

### 子组件使用缓存服务
```
import CacheServer from '../assets/CacheServer' // 引入服务
export default {
  name: 'list', // 组件名用于缓存服务标识
  created() {
    CacheServer('test').add('list') // 将该组件加入缓存数组中
  }
}
```
--------------------------------------------------------------

### 清除缓存
```
import CacheServer from '../assets/CacheServer' // 引入服务
export default {
  methods: {
    // 例如 C->A 时，需要清除B的缓存
    removeCache: function () {
      CacheServer('test').remove('list') // 清除list组件缓存      
      // CacheServer('test').clear() // 清除全部缓存
    }
  }
}
```
--------------------------------------------------------------