<template>
  <div class="follow-list">
      <div class="user-list" v-for="item in followList" :key="item._id">
        <div class="user-avatar">
          <img src="https://user-gold-cdn.xitu.io/2020/5/23/1723f686c1cf68c0?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" alt="" srcset="">
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
  methods: {}
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
