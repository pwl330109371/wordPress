/*
 * @文件描述: 文件描述
 * @作者: pwl
 * @Date: 2020-09-25
 * @LastEditors: Su Yunzheng
 * @LastEditTime: 2020-10-11
 * @Description: 图片上传
 * @Author: Su Yunzheng
 */
import serve from '@/utils/http'
// 图片上传
export function uploadImgs (params) {
  return serve({
    url: '/api/file/upload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
