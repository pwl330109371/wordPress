<template>
  <div class="main-center">
    <div class="infinite-list-wrapper" >
      <ul
        class="infinite-list"
        infinite-scroll-immediate='immediate'
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
      <p class="loading-text" v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 10,
      loading: false,
      immediate: true
    }
  },
  computed: {
    noMore () {
      return this.count >= 2000
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 500)
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
    .infinite-list .infinite-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #e8f3fe;
      margin: 10px;
      color: #7dbcfc;
    }
    .loading-text {
      text-align: center;
    }
  }
</style>
