<template>
  <div class="wrapper">
    <div>-----------------------</div>
    <div>home</div>
    <h3>随机数：{{num}}</h3>
    <div>-----------------------</div>
    <div @click="jumpPath('/list')">【to -> 列表页】</div>
  </div>
</template>

<script>
import Bus from '../assets/Bus'
export default {
  name: 'home',
  data () {
    return {
      num: Math.random()
    }
  },
  methods: {
    jumpPath: function (path) {
      this.$router.push(path)
    }
  },
  created() {
    Bus.$emit('topText', {
      text: 'home'
    })
  }
}
</script>

<style lang='' scoped>
  .wrapper {
    color: rgb(185, 85, 85);
  }
</style>