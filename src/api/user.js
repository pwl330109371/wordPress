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
export function getUserInfo (userId) {
  return serve({
    url: '/api/users/current?userId=' + userId,
    method: 'GET'
  })
}

// 获取用户文章
export function getMyArticle (userId) {
  return serve({
    url: '/api/article/myArticle?userId=' + userId,
    method: 'GET'
  })
}

// 获取用户收藏
export function getMyFavorite (userId) {
  return serve({
    url: '/api/favorite/myFavorite?userId=' + userId,
    method: 'GET'
  })
}

// 获取用户点赞
export function getMyPraise (userId) {
  return serve({
    url: '/api/praise/myPraise?userId=' + userId,
    method: 'GET'
  })
}

// 获取用户关注列表
export function getMyFollow (userId) {
  return serve({
    url: '/api/follow/myFollow?userId=' + userId,
    method: 'GET'
  })
}

// 获取用户粉丝列表
export function getMyFens (userId) {
  return serve({
    url: '/api/follow/myFens?userId=' + userId,
    method: 'GET'
  })
}
