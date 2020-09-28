import serve from '@/utils/http'

// 获取详情页的评论列表
export function getCommentList (articleId) {
  return serve({
    url: '/api/comment/list?articleId=' + articleId,
    method: 'GET'
  })
}

// 发布评论
export function addComment (data) {
  return serve({
    url: '/api/comment/add',
    method: 'POST',
    data
  })
}
