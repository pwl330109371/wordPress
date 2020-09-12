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

// 获取我的文章
export function getMyArticle (params) {
  return serve({
    url: '/api/article/myArticle',
    method: 'GET',
    params
  })
}

// 获取我的收藏
export function getMyFavorite () {
  return serve({
    url: '/api/favorite/myFavorite',
    method: 'GET'
  })
}

// 获取我的点赞
export function getMyPraise () {
  return serve({
    url: '/api/praise/myPraise',
    method: 'GET'
  })
}

// 获取我的关注列表
export function getMyFollow () {
  return serve({
    url: '/api/follow/myFollow',
    method: 'GET'
  })
}
