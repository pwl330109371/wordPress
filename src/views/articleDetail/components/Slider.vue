<template>
  <div class="user-setting">
    <el-badge :value="articleDetail.praiseCount" class="item">
      <div class="praise" @click="praise" v-if="isPrauseState === 2">
        <i class="iconfont icon-good"></i>
      </div>
      <div class="praise active" @click="canclPraise" v-if="isPrauseState === 1">
        <i class="iconfont icon-good"></i>
      </div>
    </el-badge>
    <el-badge  class="item">
      <div class="praise" @click="addFavorite"  v-if="isFavoriteState === 2">
        <i class="iconfont icon-collection"></i>
      </div>
      <div class="praise active" @click="canclFavorite"  v-if="isFavoriteState === 1">
        <i class="iconfont icon-collection"></i>
      </div>
    </el-badge>
    <el-badge :value="12" class="item">
      <div class="praise">
        <i class="iconfont icon-comments"></i>
      </div>
    </el-badge>
  </div>
</template>

<script>
import { addPraise, canclPraise, addFavorite, canclFavorite, isFavorite, isPraise } from '@/api/article'
export default {
  props: {
    articleId: String,
    articleDetail: Object
  },
  name: 'slider',
  data () {
    return {
      isPrauseState: null, // 是否点赞
      isFavoriteState: null // 是否收藏
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    this.isPraise() // 用户是否点赞
    this.isFavorite() // 用户是否收藏
  },
  methods: {
    async isPraise () {
      const { data } = await isPraise(this.articleId)
      if (data.state === 200) {
        const type = data.data.state
        this.isPrauseState = type
        this.$emit('uploadPraise', type === 1 ? 1 : -1)
      }
    },
    // 点赞
    async praise () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await addPraise(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.isPraise()
      }
    },
    // 取消点赞
    async canclPraise () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await canclPraise(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.isPraise()
      }
    },
    // 添加收藏
    async addFavorite () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await addFavorite(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.isFavorite()
        // this.$emit('uploadPraise', -1)
      }
    },
    // 取消收藏
    async canclFavorite () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await canclFavorite(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.isFavorite()
        // this.$emit('uploadPraise', -1)
      }
    },
    // 是否收藏
    async isFavorite () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await isFavorite(params)
      this.isFavoriteState = data.data.state
      console.log(this.isFavoriteState)
    }
  }
}
</script>

<style lang='scss' scoped>
.user-setting {
  position: absolute;
  left: -110px;
  top: 16rem;
  margin-right: 30px;
  /deep/.el-badge {
    display: block;
  }
  .praise {
    position: relative;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    padding: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    i {
      font-size: 23px;
    }
    .count {
      position: absolute;
      top: -15px;
      right: 0;
    }
  }
  .active {
    i {
      color: #67C23A;
    }
  }
}
</style>
