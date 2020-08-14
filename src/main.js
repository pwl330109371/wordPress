import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import './style/element-variables.scss'  // 主题颜色设置
import 'element-ui/lib/theme-chalk/index.css'
import './style/reset.css'// 样式重置表
import './style/media.scss' // 媒体查询
import './utils/permission' // permission control
import './style/prism.css'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
