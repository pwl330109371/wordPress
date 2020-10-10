import serve from '@/utils/http'

// 发布文章
export function addArticle (data) {
  return serve({
    url: '/api/article/add',
    method: 'POST',
    data
  })
}

// 获取文章列表
export function getArticleList (data) {
  return serve({
    url: '/api/article/list',
    method: 'POST',
    data
  })
}

// 获取文章详情 登录状态
export function getArticleDetail (id) {
  return serve({
    url: '/api/article/detail?id=' + id,
    method: 'GET'
  })
}

// 获取文章详情 未登录状态
export function getArticle (id) {
  return serve({
    url: '/api/article/getDetail?id=' + id,
    method: 'GET'
  })
}

// 是否点赞
export function isPraise (articleId) {
  return serve({
    url: '/api/praise/isPraise?articleId=' + articleId,
    method: 'GET'
  })
}

// 点赞
export function addPraise (data) {
  return serve({
    url: '/api/praise/addPraise',
    method: 'POST',
    data
  })
}

// 取消点赞
export function canclPraise (data) {
  return serve({
    url: '/api/praise/canclPraise',
    method: 'POST',
    data
  })
}

// 收藏
export function addFavorite (data) {
  return serve({
    url: '/api/favorite/addFavorite',
    method: 'POST',
    data
  })
}

// 取消收藏
export function canclFavorite (data) {
  return serve({
    url: '/api/favorite/canclFavorite',
    method: 'POST',
    data
  })
}

// 是否收藏
export function isFavorite (params) {
  return serve({
    url: '/api/favorite/isFavorite',
    method: 'GET',
    params
  })
}
