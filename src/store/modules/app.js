/*
 * @文件描述: 文件描述
 * @作者: L
 * @Date: 2020-09-25
 * @LastEditors: L
 * @LastEditTime: 2020-10-16
 * @Description: 1
 * @Author: L
 */
/* eslint-disable prefer-promise-reject-errors */
// import router from '@/router'
export default {
  namespaced: true,
  state: {
    path: 'localhost:3000/',
    searchVal: '', // 搜索
    type: 1, // 1登录 2注册
    dialogVisible: false // 全局显示登录注册页面
  },
  mutations: {
    showModal (state, data) {
      console.log(1123123)
      state.dialogVisible = true
      state.type = data
    },
    hideModal (state) {
      state.dialogVisible = false
    },
    setSearchVal (state, val) {
      console.log(val)
      state.searchVal = val
    }
    // SetUserData (state, data) {
    //   state.userInfo = data
    //   setCookie('userInfo', data) // 将用户信息储存在cookie里面
    // }
  },
  actions: {
    showModal ({ commit }, state) {
      commit('showModal', state)
    },
    searchHand ({ commit }, val) {
      commit('setSearchVal', val)
    }
    // ...
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    }
  }
}
