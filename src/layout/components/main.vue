<template>
  <div class="main">
    <router-view></router-view>
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
  .main {
    margin-top: 15px;
  }
</style>
