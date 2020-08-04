import serve from '@/utils/http'

export function uploadImgs (data) {
  return serve({
    url: '/api/file/upload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
