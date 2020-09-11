import serve from '@/utils/http'
// 图片上传
export function uploadImgs (params) {
  return serve({
    url: '/wb/poi/v1/uploadImg',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
