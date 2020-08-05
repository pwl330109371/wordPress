<template>
  <div class="main-center">
    <div class="infinite-list-wrapper" >
      <ul
        class="infinite-list"
        infinite-scroll-immediate='immediate'
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <li v-for="item in articleList" :key="item._id" class="infinite-list-item">
          <div class="aticle-left">
            <div class="user-info">
              <span>{{item.author}}#</span>
              <em>{{item.date | fromDate}}#</em>
              <span>{{item.author}}#</span>
              <span>面试</span>
              <span>/javascript#</span>
            </div>
            <div class="aticle-title">{{item.title}}</div>
            <div v-html="item.content"></div>
            <div class="aticle-share">
              <span><i class="el-icon-thumb"></i>17</span>
              <span><i class="el-icon-chat-dot-square"></i>17</span>
            </div>
          </div>
          <div class="aticle-right" v-if="item.articleImg">
              <el-image :src="item.articleImg" lazy fit='cover'></el-image>
          </div>
        </li>
      </ul>
      <p class="loading-text" v-if="loading">加载中...</p>
      <p v-if="noMore" class="no-more">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import { formatTime } from '@/utils'
export default {
  data () {
    return {
      articleList: [],
      pageSize: 10,
      currentPage: 1,
      noData: false, // 是否能加载
      tag: '', // 根据标签分类查询
      keyword: '', // 模糊搜索
      loading: false,
      immediate: false
    }
  },
  computed: {
    noMore () {
      return this.noData
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
        // keyword: this.keyword,
        // tag: this.tag
      }
      const { data } = await getArticleList(params)
      const articleList = data.list
      this.loading = false // 请求到数据后才能继续加载
      console.log(articleList)
      if (articleList.length === 0) {
        this.noData = true
        return
      }
      this.articleList = this.articleList.concat(articleList)
      console.log(this.articleList)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.currentPage++
        this.getArticleList()
      }, 500)
    }
  },
  filters: {
    fromDate: function (val) {
      console.log(new Date(val).getTime())
      return formatTime(new Date(val).getTime())
    }
  }
}
</script>

<style lang='scss' scoped>
  .main-center {
    width: 960px;
    height: 800px;
    position: absolute;
    overflow-y: auto;
    background: #fff;
    &::-webkit-scrollbar {
        display: none;
    }
    .infinite-list .infinite-list-item {
      display: flex;
      padding: 18px 24px;
      box-sizing: border-box;
      align-items: center;
      // justify-content: center;
      border-bottom: 1px solid #f1f1f1;
      background: #fff;
      cursor: pointer;
      &:hover {
        background: rgba(227,231,236,.2);
      }
      .aticle-left{
        flex: 1;
        .aticle-title {
          font-size: 20px;
          font-weight: 600;
          color: #2e3135;
          margin-top: 5px;
          margin-bottom: 15px;
        }
        em {
          font-size: 12px;
          color: #B2BAC2;
        }
        .user-info  {
          span {
            color: #B2BAC2;
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
          }
          &:hover{
            color: #409EFF;
          }
        }
        .aticle-share {
          color: #B2BAC2;
          span {
            margin-right: 10px;
            cursor: pointer;
            i {
              margin-right: 3px;
            }
          }
        }
      }
    }
    .loading-text {
      text-align: center;
    }
    .no-more {
      text-align: center;
    }
  }
</style>
