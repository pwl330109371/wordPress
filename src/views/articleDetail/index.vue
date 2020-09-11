<template>
  <div class="article-detail">
    <div class="head">
      <div class="head-user">
        <div class="user-avatar">
          <img :src="userInfo.avatar" alt="" srcset="">
        </div>
        <div class="user-info">
          <div class="user-name">{{userInfo.name}}</div>
          <div class="article-info">
            <span class="create-time">{{articleDetail.date | parseTime}}</span>
            <span class="count">阅读 {{articleDetail.count}}</span>
          </div>
        </div>
        <div class="follow">
          <el-button type="success" plain size="mini">关注</el-button>
        </div>
      </div>
      <div class="article-title">{{articleDetail.title}}</div>
      <article>
        <pre class="language-markup">
          <code v-html="articleDetail.content"></code>
        </pre>
      </article>
    </div>
    <div class="user-info">
      <!-- 用户信息 -->
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
import { parseTime } from '@/utils'
import { getArticleDetail } from '@/api/article'

const highlightCode = () => {
  const block = document.querySelectorAll('pre code')
  block.forEach((el) => {
    hljs.highlightBlock(el)
  })
}
export default {
  data () {
    return {
      articleDetail: {}, // 详情数据
      userInfo: {} // 用户信息
    }
  },
  mounted () {
    const articleId = this.$route.query.articleId
    this.getArticleDetail(articleId)
    highlightCode()
  },
  updated () {
    highlightCode()
  },
  filters: {
    parseTime (value) {
      return parseTime(value, '{y}-{m}-{d}')
    }
  },
  methods: {
    // 获取详情数据
    async getArticleDetail (articleId) {
      const { data } = await getArticleDetail(articleId)
      this.articleDetail = data
      this.userInfo = data.authorInfo
    }
  }
}
</script>

<style lang='scss' scoped>
.article-detail {
  display: flex;
  height: 100%;
  .head {
    padding: 1rem;
    flex: 1;
    background: #fff;
    .head-user {
      display: flex;
      align-items: center;
      .user-avatar {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-info {
        flex: 1;
        margin-left: 10px;
        .user-name {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin-bottom: 3px;
        }
        .article-info {
          font-size: 13px;
          color: #909090;
          .count {
            margin-left: 10px;
          }
        }
      }
    }
    .article-title {
      font-size: 30px;
      font-weight: 700;
      margin: 20px 0;
      color: #333;
    }
  }
  .user-info {
    width: 240px;
    background: #fff;
    margin-left: 20px;
  }
}
</style>
