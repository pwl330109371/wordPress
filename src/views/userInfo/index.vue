<template>
  <div class="user-info">
    <div class="user-left">
      <div class="user-info-head">
        <div class="user-avatar">
          <img :src="userInfo.avatar" alt="" srcset="">
        </div>
        <div class="user-desc">
          <h3 class="user-name">{{userInfo.name}}</h3>
          <div class="user-work">前端工程师</div>
        </div>
        <div class="edit-user">
          <el-button type="primary" plain>编辑资料</el-button>
        </div>
      </div>
      <div class="user-container">
        <div class="user-container-tab">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">用户文章</el-menu-item>
            <el-menu-item index="2">用户收藏</el-menu-item>
            <el-menu-item index="3">用户点赞</el-menu-item>
            <el-menu-item index="4">用户关注</el-menu-item>
            <el-menu-item index="5">粉丝列表</el-menu-item>
          </el-menu>
        </div>
        <div class="user-container-list">
          <article-list v-if="activeIndex == 1 || activeIndex == 2 || activeIndex == 3" :articleList='articleList'></article-list>
          <user-list v-if="activeIndex == 4 || activeIndex == 5" :follow-list='followList'></user-list>
        </div>
      </div>
    </div>

    <div class="user-right">
      1
    </div>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList'
import UserList from './components/UserList'
import { mapState } from 'vuex'
import { getUserInfo, getMyArticle, getMyFavorite, getMyPraise, getMyFollow, getMyFens } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      activeIndex: '1',
      userInfo: {}, // 用户信息
      articleList: [], // 数据列表
      followList: [] // 用户列表
    }
  },
  components: {
    ArticleList,
    UserList
  },
  computed: {
    ...mapState({
      user: state => state.user.userInfo
    }),
    userId () {
      const userId = this.$route.query.userId
      const uid = !userId ? this.user._id : userId
      return uid
    }
  },
  watch: {
  },
  mounted () {
    this.getUserInfo()
    this.getMyArticle()
  },
  methods: {
    handleSelect (e) {
      console.log(e)
      /**
       * 1 获取用户文章列表
       * 2 获取用户收藏列表
       * 3 获取用户点赞列表
       * 4 获取用户关注列表
       * 5 获取用户粉丝列表
       */
      switch (e) {
        case '1':
          this.getMyArticle()
          break
        case '2':
          this.getMyFavorite()
          break
        case '3':
          this.getMyPraise()
          break
        case '4':
          this.getMyFollow()
          break
        case '5':
          this.getMyFens()
          break
        default:
      }
      this.activeIndex = e
    },
    // 获取用户信息
    async getUserInfo () {
      const { data } = await getUserInfo(this.userId)
      this.userInfo = data
    },
    // 获取用户文章列表
    async getMyArticle () {
      const { data } = await getMyArticle(this.userId)
      console.log(data)
      this.articleList = data
    },
    // 获取用户收藏列表
    async getMyFavorite () {
      const { data } = await getMyFavorite(this.userId)
      console.log(data)
      this.articleList = data.data
    },
    // 获取用户点赞列表
    async getMyPraise () {
      const { data } = await getMyPraise(this.userId)
      console.log(data)
      this.articleList = data.data
    },
    // 获取用户关注列表
    async getMyFollow () {
      const { data } = await getMyFollow(this.userId)
      console.log(data)
      this.followList = data.data
    },
    // 获取用户粉丝列表
    async getMyFens () {
      const { data } = await getMyFens()
      console.log(data)
      this.followList = data.data
    }
  }
}
</script>

<style lang='scss' scoped>
.user-info {
  overflow: hidden;
  display: flex;
  .user-left {
    flex: 1;
    .user-info-head {
      display: flex;
      padding: 30px;
      background: #ffffff;
      .user-avatar {
        width: 90PX;
        height: 90px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-desc {
        flex: 1;
        .user-name {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .user-work {
          font-size: 14px;
        }
      }
    }
  }
  .user-right {
    width: 230px;
    background: #ffffff;
    margin-left: 10px;
  }
}

</style>
