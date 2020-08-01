import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index/')
      },
      {
        path: '/myCloud',
        name: 'myCloud',
        meta: {
          title: '云空间'
        },
        component: () => import('@/views/myCloud/')
      },
      {
        path: '/myProject',
        name: 'myProject',
        meta: {
          title: '项目'
        },
        component: () => import('@/views/myProject/')
      },
      {
        path: '/addArticle',
        name: 'addArticle',
        meta: {
          title: '写文章'
        },
        component: () => import('@/views/addArticle/')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/')
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0 // 每次跳转页面重置滚动高度
  }),
  base: process.env.BASE_URL,
  routes
})

/**
 * 解决重复点击同一个路由报错的问题
*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
