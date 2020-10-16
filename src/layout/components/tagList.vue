<!--
 * @文件描述: 文件描述
 * @作者: L
 * @Date: 2020-10-13
 * @LastEditTime: 2020-10-13
 * @Description: 1
 * @Author: L
-->
<template>
  <div class="tagList">
    <ul>
      <li
      v-for="item in tagList"
      :class="select === item._id ? 'active' : ''"
      :key="item._id"
      @click="selectClick(item)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { getTagist } from '@/api/tag'
export default {
  data () {
    return {
      tagList: [], // 标签列表
      select: 0 // 当前选中的标签
    }
  },
  mounted () {
    this.getTagist()
  },
  methods: {
    // 获取标签列表
    async getTagist () {
      const { data } = await getTagist()
      this.tagList = data.data
      this.tagList.unshift({
        name: '全部',
        _id: 0
      })
    },
    // 点击标签
    selectClick (item) {
      this.select = item._id
    }
  }
}
</script>

<style lang='scss' scoped>
.tagList {
    width: auto;
    max-width: 960px;
    margin: 0 auto;
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    box-sizing: border-box;
    ul {
        overflow: hidden;
        li {
            float: left;
            margin-right: 20px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            &.active {
                color: #66b1ff;
            }
        }
    }
}
</style>
