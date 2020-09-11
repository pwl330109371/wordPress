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
