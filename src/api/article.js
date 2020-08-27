import serve from '@/utils/http'

export function addArticle (data) {
  return serve({
    url: '/api/article/add',
    method: 'POST',
    data
  })
}

export function getArticleList (data) {
  return serve({
    url: '/api/article/list',
    method: 'POST',
    data
  })
}

export function getArticleDetail (id) {
  return serve({
    url: '/api/article/detail?id=' + id,
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
