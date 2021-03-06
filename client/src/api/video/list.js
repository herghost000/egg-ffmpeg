import request from '@/utils/request'

export function queryList(params) {
  return request({
    url: '/api/v2/video/list',
    params
  })
}

export function createList(data) {
  return request({
    url: '/api/v2/video/list',
    method: 'POST',
    data,
    encrypt: true
  })
}

export function updateList(id, data) {
  return request({
    url: `/api/v2/video/list/${id}`,
    method: 'PUT',
    data,
    encrypt: true
  })
}
export function transcode(data) {
  return request({
    url: '/api/v2/video/list/transcode',
    method: 'POST',
    data,
    encrypt: true
  })
}
export function destroy(id) {
  return request({
    url: `/api/v2/video/list/${id}`,
    method: 'DELETE'
  })
}
