import request from '@/utils/request'

export function queryType(params) {
  return request({
    url: '/api/v2/video/type',
    params
  })
}

export function createType(data) {
  return request({
    url: '/api/v2/video/type',
    method: 'POST',
    data,
    encrypt: true
  })
}

export function updateType(id, data) {
  return request({
    url: `/api/v2/video/type/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryType(id) {
  return request({
    url: `/api/v2/video/type/${id}`,
    method: 'DELETE'
  })
}
