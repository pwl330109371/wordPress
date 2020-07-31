<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width='30%'>
      <Login v-if="type === 1"></Login>
      <Register v-if="type === 2"></Register>
    </el-dialog>
  </div>
</template>

<script>
import Login from '@/components/login'
import Register from '@/components/register'
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    type: {
      type: Number,
      default: null
    }
  },
  computed: {
    title () {
      return this.type === 1 ? '登录' : '注册'
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
