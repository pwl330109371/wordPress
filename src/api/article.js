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

// 获取文章详情
export function getArticleDetail (id) {
  return serve({
    url: '/api/article/detail?id=' + id,
    method: 'GET'
  })
}

export function isPraise (articleId) {
  return serve({
    url: '/api/praise/isPraise?articleId=' + articleId,
    method: 'GET'
  })
}

export function addPraise (data) {
  return serve({
    url: '/api/praise/addPraise',
    method: 'POST',
    data
  })
}

export function canclPraise (data) {
  return serve({
    url: '/api/praise/canclPraise',
    method: 'POST',
    data
  })
}

export function addFavorite (data) {
  return serve({
    url: '/api/favorite/addFavorite',
    method: 'POST',
    data
  })
}

export function canclFavorite (data) {
  return serve({
    url: '/api/favorite/canclFavorite',
    method: 'POST',
    data
  })
}

export function isFavorite (params) {
  return serve({
    url: '/api/favorite/isFavorite',
    method: 'GET',
    params
  })
}
