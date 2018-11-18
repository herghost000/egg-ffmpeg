import request from '@/utils/request'

export function uploadVideo(data) {
  return request({
    url: '/api/v2/upload/uploadVideo',
    method: 'POST',
    data
  })
}
