import request from '@/utils/request'

export function querySetting() {
  return request({
    url: '/api/v2/video/setting'
  })
}

export function createSetting(data) {
  return request({
    url: '/api/v2/video/setting',
    method: 'POST',
    data
  })
}

export function updateSetting(id, data) {
  return request({
    url: `/api/v2/video/setting/${id}`,
    method: 'PUT',
    data
  })
}
