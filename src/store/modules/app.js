/* eslint-disable prefer-promise-reject-errors */
// import router from '@/router'
export default {
  namespaced: true,
  state: {
    path: 'localhost:3000/'
  },
  mutations: {
    // SetUserData (state, data) {
    //   state.userInfo = data
    //   setCookie('userInfo', data) // 将用户信息储存在cookie里面
    // }
  },
  actions: {
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
