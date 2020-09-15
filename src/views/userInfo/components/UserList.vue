<template>
  <div class="follow-list">
      <div class="user-list" v-for="item in followList" :key="item._id">
        <div class="user-avatar" @click="goUserInfo(item._id)">
          <img :src="item.avatar" alt="" srcset="">
        </div>
        <div class="user-info">
          <h3>{{item.name}}</h3>
          <p>微信公众号：阿里前端</p>
        </div>
        <div class="is-follow-btn">
          <el-button type="success" size="small">已关注</el-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FollowList',
  props: {
    followList: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 跳转用户的个人信息页面
    goUserInfo (userId) {
      this.$router.push({
        path: '/userInfo',
        query: {
          userId
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.follow-list  {
  background: #fff;
  .user-list {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    .user-avatar {
      width: 45px;
      height: 45px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-info {
      flex: 1;
      h3 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
      }
      p {
        font-size: 12px;
        color: #b9c0c8;
      }
    }
  }
}
</style>
