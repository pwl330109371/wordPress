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
            <el-menu-item index="1">我的文章</el-menu-item>
            <el-menu-item index="2">我的收藏</el-menu-item>
            <el-menu-item index="3">我的点赞</el-menu-item>
            <el-menu-item index="4">我的关注</el-menu-item>
            <el-menu-item index="5">粉丝列表</el-menu-item>
          </el-menu>
        </div>
        <div class="user-container-list">
          <article-list v-if="activeIndex == 1 || activeIndex == 2 || activeIndex == 3" :articleList='articleList'></article-list>
          <user-list v-if="activeIndex == 4 || activeIndex == 5"></user-list>
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
import { getMyArticle, getMyFavorite, getMyPraise, getMyFollow, getMyFens } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      activeIndex: '1',
      articleList: [] // 数据列表
    }
  },
  components: {
    ArticleList,
    UserList
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  watch: {
  },
  mounted () {
    this.getMyArticle()
  },
  methods: {
    handleSelect (e) {
      console.log(e)
      /**
       * 1 获取我的文章列表
       * 2 获取我的收藏列表
       * 3 获取我的点赞列表
       * 4 获取我的关注列表
       * 5 获取我的粉丝列表
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
    // 获取我的文章列表
    async getMyArticle () {
      const { data } = await getMyArticle()
      console.log(data)
      this.articleList = data
    },
    // 获取我的收藏列表
    async getMyFavorite () {
      const { data } = await getMyFavorite()
      console.log(data)
      this.articleList = data.data
    },
    // 获取我的点赞列表
    async getMyPraise () {
      const { data } = await getMyPraise()
      console.log(data)
      this.articleList = data.data
    },
    // 获取我的关注列表
    async getMyFollow () {
      const { data } = await getMyFollow()
      console.log(data)
    },
    // 获取我的粉丝列表
    async getMyFens () {
      const { data } = await getMyFens()
      console.log(data)
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
