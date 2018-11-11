import request from '@/utils/request'

export function getSetting() {
  return request({
    url: '/api/v2/video/setting'
  })
}
