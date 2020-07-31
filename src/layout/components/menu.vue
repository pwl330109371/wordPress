<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-demo" router mode="horizontal" @select="handleSelect">
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/myCloud">云空间</el-menu-item>
      <el-menu-item index="/myProject">话题</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/index'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
