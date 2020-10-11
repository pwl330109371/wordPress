<template>
  <div class="comment-container">
    <div class="add-comment">
      <div class="comment-user">
          <el-avatar size="large" :src="circleUrl"></el-avatar>
      </div>
      <div class="comment-content">
          <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入评论内容..."
          maxlength="300"
          show-word-limit
          v-model="commentContent">
          </el-input>
          <div class="add-commit-btn">
          <el-button type="primary" size="small" :disabled='commentContent.length === 0' @click="addComment">评论</el-button>
          </div>
      </div>
    </div>
    <ul class="comment-list-group">
      <li class="comment-list-item" v-for="item in commnetList" :key="item._id">
          <div class="comment-list-user">
            <el-avatar size="large" :src="circleUrl"></el-avatar>
          </div>
          <div class="comment-list-content">
            <div class="user-name">{{item.userName}}</div>
            <p>
              {{item.content}}
            </p>
            <div class="time">{{item.date | fromDate}}</div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import { formatTime } from '@/utils'
export default {
  props: {
    articleId: {
      type: String
    },
    commnetList: {
      type: Array
    }
  },
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 默认头像
      commentContent: '' // 评论内容
    }
  },
  methods: {
    // 发布评论
    async addComment () {
      const params = {
        content: this.commentContent,
        articleId: this.articleId
      }
      await addComment(params)
      this.commentContent = ''
      this.$emit('updataComment')
    }
  },
  filters: {
    fromDate: function (val) {
      return formatTime(new Date(val).getTime())
    }
  }
}
</script>

<style lang='scss' scoped>
  .comment-container {
    margin-top: 20px;
    .add-comment {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .comment-content {
        flex: 1;
        margin-left: 15px;
      }
      .add-commit-btn {
        margin-top: 10px;
        text-align: right;
      }
    }
    .comment-list-item {
      display: flex;
      margin-bottom: 15px;
      border-bottom: 1px solid #DCDFE6;
      padding: 10px 0;
      .comment-list-content {
        flex: 1;
        margin-left: 15px;
        font-size: 14px;
        line-height: 1.6;
        color: #505050;
        .user-name {
          color: #333;
        }
        .time {
          font-size: 12px;
          color: #8a9aa9;
        }
      }
    }
  }
</style>
