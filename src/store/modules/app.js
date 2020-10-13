/*
 * @文件描述: 文件描述
 * @作者: pwl
 * @Date: 2020-09-25
 * @LastEditors: Su Yunzheng
 * @LastEditTime: 2020-10-13
 * @Description: 1
 * @Author: pwl
 */
/* eslint-disable prefer-promise-reject-errors */
// import router from '@/router'
export default {
  namespaced: true,
  state: {
    path: 'localhost:3000/',
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
    }
    // SetUserData (state, data) {
    //   state.userInfo = data
    //   setCookie('userInfo', data) // 将用户信息储存在cookie里面
    // }
  },
  actions: {
    showModal ({ commit }, state) {
      commit('showModal', state)
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
