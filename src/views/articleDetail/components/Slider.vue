<template>
  <div class="user-setting">
    <el-badge :value="articleDetail.praiseCount" class="item">
      <div class="praise" @click="praise" v-if="!articleDetail.isPraise">
        <i class="iconfont icon-good"></i>
      </div>
      <div class="praise active" @click="canclPraise" v-if="articleDetail.isPraise">
        <i class="iconfont icon-good"></i>
      </div>
    </el-badge>
    <el-badge :value="12" class="item">
      <div class="praise">
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
import { addPraise, canclPraise } from '@/api/article'
export default {
  props: {
    articleId: String,
    articleDetail: Object
  },
  name: 'slider',
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 点赞
    async praise () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await addPraise(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.$emit('uploadPraise', 1)
      }
    },
    async canclPraise () {
      const params = {
        articleId: this.articleId
      }
      const { data } = await canclPraise(params)
      if (data.state === 200) {
        this.$message.success('操作成功')
        this.$emit('uploadPraise', -1)
      }
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
