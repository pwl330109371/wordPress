<template>
  <div>
    <Head></Head>
    <Main class="container"></Main>
  </div>
</template>

<script>
import Head from './components/header'// 头部
import Main from './components/main'// 头部
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Head,
    Main
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>

</style>
