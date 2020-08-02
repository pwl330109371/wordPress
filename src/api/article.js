import serve from '@/utils/http'

export function addArticle (data) {
  return serve({
    url: '/api/article/add',
    method: 'POST',
    data
  })
}

export function getArticleList () {
  return serve({
    url: '/api/article/list',
    method: 'GET'
  })
}
