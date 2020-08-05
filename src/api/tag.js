import serve from '@/utils/http'

// 获取一级标签
export function getTagist () {
  return serve({
    url: '/api/tag/list',
    method: 'POST'
  })
}

// 根据一级标签获取二级标签
export function getTagChildList (personId) {
  return serve({
    url: '/api/tag/getTagChildList?personId=' + personId,
    method: 'GET'
  })
}
