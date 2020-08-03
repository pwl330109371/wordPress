/*
 * @文件描述: 文件描述
 * @作者: 作者
 * @Date: 2019-12-08
 * @LastEditors  : gaopf
 * @LastEditTime : 2019-12-20
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  getters: {
    userData (state, getters) {
      return state.user.user
      // return getters['user/user']
    }
    // vuex 全局getters引入局部
    // token () {
    //   return store.getters['user/token']
    // }
  },
  mutations: {
    // 更新页面切换方向
  },
  actions: {

  },
  modules
})
