import serve from '@/utils/http'

// 登录
export function login (data) {
  return serve({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}

// 注册
export function register (data) {
  return serve({
    url: '/api/users/register',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getUserInfo () {
  return serve({
    url: '/api/users/current',
    method: 'GET'
  })
}
