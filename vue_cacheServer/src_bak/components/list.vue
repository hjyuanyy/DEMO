<template>
  <div class="wrapper">
    <div>-----------------------</div>
    <div>list</div>
    <h3>随机数：{{num}}</h3>
    <div>-----------------------</div>
    <div @click="jumpPath('/detail')">【to -> 查看详情】</div>
  </div>
</template>

<script>
import Bus from '../assets/Bus'
import CacheServer from '../assets/CacheServer'
export default {
  name: 'list',
  data() {
    return {
      num: Math.random()
    }
  },
  methods: {
    jumpPath: function(path) {
      this.$router.push(path)
    }
  },
  created() {
    Bus.$emit('topText', {text: 'list'})
    CacheServer('test').add('list') // 设置缓存
  }
}
</script>

<style lang='' scoped>
.wrapper {
  color: rgb(117, 175, 68);
}
</style>