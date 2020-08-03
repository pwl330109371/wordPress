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
            <img src="https://user-gold-cdn.xitu.io/2020/5/23/1723f686c1cf68c0?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" srcset="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">写文章</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">我的主页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">我赞过的</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">我的收藏集</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command='6'>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <handDialog :type='type' ref='handDialog'></handDialog>
  </div>
</template>

<script>
import handDialog from '@/components/handDialog'
import Menu from '@/layout/components/menu'
import { mapState } from 'vuex'
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
  methods: {
    showDialog (type) {
      this.type = type
      this.$refs.handDialog.showDialog()
    },
    addArticle () {
      this.$router.push('/addArticle')
    },
    handClick (e) {
      this.$store.dispatch('user/loginOut')
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
        .user-avatar img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
</style>
