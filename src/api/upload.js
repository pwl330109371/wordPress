import serve from '@/utils/http'
// 图片上传
export function uploadImgs (params) {
  return serve({
    url: '/api/file/uploadImg',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
