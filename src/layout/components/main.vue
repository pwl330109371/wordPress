<template>
  <div class="main-container">
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
  .main-container {
    margin-top: 15px;
  }
</style>
