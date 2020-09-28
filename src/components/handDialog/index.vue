<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width='400px' :before-close='hideModal'>
      <Login v-if="type === 1"></Login>
      <Register v-if="type === 2"></Register>
    </el-dialog>
  </div>
</template>

<script>
import Login from '@/components/login'
import Register from '@/components/register'
import { mapState, mapMutations } from 'vuex'
// before-close
export default {
  data () {
    return {
      // dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.app.dialogVisible,
      type: state => state.app.type
    }),
    title () {
      return this.type === 1 ? '登录' : '注册'
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    ...mapMutations({
      hideModal: 'app/hideModal'
    })
  }
}
</script>

<style lang='scss' scoped>

</style>
