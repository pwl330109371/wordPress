import serve from '@/utils/http'

// 关注
export function addFollow (data) {
  return serve({
    url: '/api/follow/addFollow',
    method: 'POST',
    data
  })
}

// 取消关注
export function canclFollow (data) {
  return serve({
    url: '/api/follow/canclFollow',
    method: 'POST',
    data
  })
}

// 取消关注
export function isFollow (authorId) {
  return serve({
    url: '/api/follow/isFollow?authorId=' + authorId,
    method: 'GET'
  })
}
