<template>
  <div class="headers">
    <div class="container">
      <div class="head-menu">
        <Menu></Menu>
      </div>
      <div class="head-right">
        <div class="head-search">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="searchVal">
          </el-input>
        </div>
        <div class="head-add-article">
          <el-button type="primary" @click="addArticle">写文章<i class="el-icon-edit el-icon--right"></i></el-button>
        </div>
        <div class="head-notice"><i class="el-icon-message-solid"></i></div>
        <div class="hand-btn" v-if="!userInfo">
          <span class="hand-login-btn" @click="showDialog(1)">登录</span>
          <span class="hand-rigister-btn" @click="showDialog(2)">注册</span>
        </div>
        <div class="user-avatar" v-else>
          <el-dropdown trigger="click" placement='top' @command='handClick'>
            <img :src="userInfo.avatar" alt="" srcset="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command='1'>写文章</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command='2'>我的主页</el-dropdown-item>
              <!-- <el-dropdown-item icon="el-icon-circle-plus-outline" command='3'>我赞过的</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check" command='4'>我的收藏集</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command='5'>设置</el-dropdown-item> -->
              <el-dropdown-item icon="el-icon-circle-check" command='6'>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <handDialog></handDialog>
  </div>
</template>

<script>
import handDialog from '@/components/handDialog'
import Menu from '@/layout/components/menu'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      type: null,
      searchVal: '' // 搜索
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    handDialog,
    Menu
  },
  mounted () {
    console.log(this.userInfo)
  },
  methods: {
    ...mapActions({
      showModal: 'app/showModal'
    }),
    // 登录注册
    showDialog (type) {
      this.showModal(type)
    },
    // 发布文章
    addArticle () {
      if (this.userInfo) {
        this.$router.push('/addArticle')
      } else {
        this.open()
      }
    },
    // 打开模态弹窗
    open () {
      this.$confirm('请先进行登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.showDialog(1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 点击用户菜单栏
    handClick (e) {
      console.log(e)
      switch (parseInt(e)) {
        case 1:
          console.log(222)
          this.addArticle()
          break
        case 2:
          this.$router.push('/userInfo')
          break
        case 6:
          this.$store.dispatch('user/loginOut').then(() => {
            this.$router.replace('/')
          })
          break
        default:
          this.$router.push('/userInfo')
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .headers{
    overflow: hidden;
    background: #fff;
    height: 60px;
    .container {
      display: flex;
      align-items: center;
      .head-menu {
        flex: 1;
      }
      .head-right {
        background: #fff;
        display: flex;
        align-items: center;
        .head-add-article {
          margin-left: 20px;
          margin-right: 20px;
        }
        .head-notice {
          color: #ccc;
          margin-right: 20px;
          font-size: 25px;
          cursor: pointer;
        }
        .hand-btn {
          font-size: 18px;
          color: #409EFF;
          cursor: pointer;
          .hand-login-btn {
            margin-right: 10px;
          }
        }
        .user-avatar {
          width: 30px;
          height: 30px;
        }
        .user-avatar img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
</style>
