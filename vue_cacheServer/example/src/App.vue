<template>
  <div id="app">
    <Top></Top>
    <keep-alive :include="myCache">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Top from './components/top'
import CacheServer from './assets/CacheServer'
export default {
  name: 'App', // 允许组件模板递归调用自身
  components: {
    Top
  },
  data() {
    return {
      myCache: [] // 缓存数组对象
    }
  },
  created() {
    CacheServer('test').reg(this.myCache)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
