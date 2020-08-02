import serve from '@/utils/http'

export function uploadImgs (data) {
  return serve({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}
