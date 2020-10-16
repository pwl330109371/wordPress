/*
 * @name: 文章详情页
 * @Author: L
 * @Date: 2020-09-30 17:45:08
 * @Last Modified by:L
 * @Last Modified time: 2020-09-30 17:46:00
 */
<template>
  <div class="article-content">
    <slider :article-id='articleId' :article-detail='articleDetail' :comment-count='commentCount' @uploadPraise='uploadPraise'></slider>
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
          <div class="follow" v-if="userId !== userInfo.id">
            <el-button type="success" size="mini" v-if="isFollowState === 2" @click="addFollow">关注</el-button>
            <el-button type="success" plain size="mini" v-if="isFollowState === 1" @click="canclFollow">取消关注</el-button>
          </div>
        </div>
        <div class="article-title">{{articleDetail.title}}</div>
        <article>
          <pre class="language-markup">
            <code v-html="articleDetail.content"></code>
          </pre>
        </article>
        <comment :article-id='articleId' :commnet-list='commnetList' @updataComment='updataComment'></comment>
      </div>
      <div class="user-info">
        <!-- 用户信息 -->
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
import { parseTime } from '@/utils'
import { getArticleDetail, getArticle } from '@/api/article'
import { isFollow, addFollow, canclFollow } from '@/api/follow'
import { getCommentList } from '@/api/comment'
import { mapState } from 'vuex'
import slider from './components/Slider'
import comment from './components/Comment'

const highlightCode = () => {
  const block = document.querySelectorAll('pre code')
  block.forEach((el) => {
    hljs.highlightBlock(el)
  })
}
export default {
  data () {
    return {
      isFollowState: 2,
      loading: true, // loading
      articleDetail: {}, // 详情数据
      userInfo: {}, // 用户信息
      commnetList: [], // 评论列表
      commentCount: 0 // 评论数量
    }
  },
  mounted () {
    // 登录 跟 没有登录调用不一样的接口
    if (this.userId) {
      this.getArticleDetail()
    } else {
      this.getArticle()
    }
    this.getCommentList() // 获取评论列表
    highlightCode()
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo._id
    }),
    articleId () {
      return this.$route.query.articleId
    }
  },
  watch: {
    userId (val) {
      if (val) {
        this.getArticleDetail()
      } else {
        this.getArticle()
      }
    }
  },
  components: {
    slider,
    comment
  },
  updated () {
    highlightCode()
  },
  filters: {
    // 时间格式过滤
    parseTime (value) {
      return parseTime(value, '{y}-{m}-{d}')
    }
  },
  methods: {
    // 是否关注作者
    async isFollow (id) {
      const { data } = await isFollow(id)
      console.log(data)
      this.isFollowState = data.data.state
    },
    // 获取详情数据
    async getArticleDetail () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
      })
      const { data } = await getArticleDetail(this.articleId)
      this.articleDetail = data
      this.userInfo = data.authorInfo
      this.isFollow(data.authorInfo.id)
      loading.close()
    },
    // 没有登录获取详情的接口
    async getArticle () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
      })
      const { data } = await getArticle(this.articleId)
      this.articleDetail = data
      this.userInfo = data.authorInfo
      loading.close()
    },
    // 添加关注
    async addFollow () {
      const params = {
        userId: this.userId,
        authorId: this.userInfo.id
      }
      const { data } = await addFollow(params)
      if (data.state === 200) {
        this.$message.success('关注成功!')
        this.isFollow(this.userInfo.id)
      }
    },
    // 取消关注
    async canclFollow () {
      const params = {
        userId: this.userId,
        authorId: this.userInfo.id
      }
      const { data } = await canclFollow(params)
      if (data.state === 200) {
        this.$message.success('取消关注!')
        this.isFollow(this.userInfo.id)
      }
    },
    // 更新点赞
    uploadPraise (e) {
      if (e === 1) {
        this.articleDetail.isPraise = true
      } else {
        this.articleDetail.isPraise = false
      }
      this.articleDetail.praiseCount = this.articleDetail.praiseCount + e
    },
    // 更新评论列表
    updataComment () {
      this.getCommentList()
    },
    // 获取评论列表
    async getCommentList () {
      const { data } = await getCommentList(this.articleId)
      this.commnetList = data.data
      this.commentCount = data.data.length
    }
  }
}
</script>

<style lang='scss' scoped>
.article-content {
  display: flex;
  position: relative;
  .article-detail {
    display: flex;
    flex: 1;
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
      article {
        max-width: 1200px;
      }
    }
    .user-info {
      width: 240px;
      background: #fff;
      margin-left: 20px;
    }
    .el-icon-loading {
      font-size: 20px;
    }
  }
}
</style>
