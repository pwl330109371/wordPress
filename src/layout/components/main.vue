<template>
  <div class="main-container">
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
  .main-container {
    margin-top: 15px;
  }
</style>
