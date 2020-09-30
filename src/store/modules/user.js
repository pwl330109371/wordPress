/* eslint-disable prefer-promise-reject-errors */
import { getUserInfo } from '@/api/user'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
// import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: getCookie('token') || '',
    userInfo: getCookie('userInfo') ? JSON.parse(getCookie('userInfo')) : ''
  },
  mutations: {
    SetUserData (state, data) {
      state.userInfo = data
      setCookie('userInfo', data) // 将用户信息储存在cookie里面
    }
  },
  actions: {
    // get user info
    getInfo ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getUserInfo(userId).then(response => {
          const data = response.data
          commit('SetUserData', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SetUserData', '')
        removeCookie('token')
        resolve()
      })
    }
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
