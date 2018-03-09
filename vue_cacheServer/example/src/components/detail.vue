<template>
  <div class="wrapper">
    <div>-----------------------</div>
    <div>detail</div>
    <h3>随机数：{{num}}</h3>
    <div>-----------------------</div>
    <div @click="jumpPath('/')">【to -> 首页】</div>
  </div>
</template>

<script>
import Bus from '../assets/Bus'
import CacheServer from '../assets/CacheServer'
export default {
  name: 'detail',
  data() {
    return {
      num: Math.random()
    }
  },
  methods: {
    jumpPath: function(path) {
      this.$router.push(path)
      CacheServer('test').remove('list') // 清除缓存
    }
  },
  created() {
    Bus.$emit('topText', {text: 'detail'})
  }
}
</script>

<style lang='' scoped>
  .wrapper {
    color: rgb(37, 37, 172)
  }
</style>
