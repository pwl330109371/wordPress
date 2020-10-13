/*
 * @文件描述: 文件描述
 * @作者: pwl
 * @Date: 2020-09-25
 * @LastEditors: Su Yunzheng
 * @LastEditTime: 2020-10-13
 * @Description: roter
 * @Author: Su Yunzheng
 */
import router from '../router'
import store from '../store'
import { getCookie } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 需要登录才能进去的页面
const roleMenu = ['/addArticle', '/userInfo']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // roleMenu页面是需要登录才能放行
  if (roleMenu.includes(to.path)) {
    if (getCookie('token')) {
      next()
    } else {
      next('/')
      store.dispatch('app/showModal', 1)
    }
  } else {
    next()
  }
  setTimeout(() => {
    NProgress.done()
  }, 300)
})

router.afterEach(() => {
  NProgress.done()
})
