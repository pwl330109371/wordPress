/*
 * @文件描述: 请求配置
 * @作者: L
 */
import axios from 'axios'
import qs from 'qs'
import { getCookie } from '@/utils/auth'
// 设置axios请求默认配置
const serve = axios.create({
  baseURL: '', // api的base_url前缀
  // baseURL: 'localhost:3000/api/', // api的base_url前缀
  timeout: 1000 * 16 // 请求超时
})

// request拦截器 请求前的拦截器
serve.interceptors.request.use(
  config => {
    if (getCookie('token')) {
      config.headers.Authorization = getCookie()
    }
    console.log(config.method.toLowerCase())
    // 这里可以自定义一些config 配置
    if (config.method.toLowerCase() === 'post' && !config.headers['Content-Type']) {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      config.headers['Content-Type'] = 'application/json'
    }

    if (/application\/x-www-form-urlencoded/.test(config.headers['Content-Type']) && typeof config.data === 'object') {
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// axios响应拦截
serve.interceptors.response.use(
  response => {
    const res = response
    if (res.status === 200) {
      return res
    } else {
      return Promise.reject(res.msg || 'Error')
    }
  },
  error => {
    Promise.reject(error)
  }
)

export default serve
