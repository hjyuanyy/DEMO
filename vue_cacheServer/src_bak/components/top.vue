<template>
  <div class="top">
    <span @click="back">{{btn}}</span>
    <span>当前为{{text}}页</span>
  </div>
</template>

<script>
import Bus from '../assets/Bus'
import CacheServer from '../assets/CacheServer'
export default {
  data() {
    return {
      btn: '',
      text: ''
    }
  },
  methods: {
    back: function() {
      // 判断是不是在list页进行回退，如果是就要清除缓存
      if (this.$route.path === '/list') {
        CacheServer('test').remove('list') // 清除缓存
      }
      this.$router.go(-1)
    }
  },
  created() {
    const _self = this
    Bus.$on('topText', function(param) {
      const text = param.text
      if (text === 'home') {
        _self.btn = '【home】'
      } else {
        _self.btn = '【back】'
      }
      _self.text = text
    })
  }
}
</script>

<style lang='' scoped>

</style>
