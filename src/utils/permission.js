import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  setTimeout(() => {
    NProgress.done()
  }, 300)
})

router.afterEach(() => {
  NProgress.done()
})
