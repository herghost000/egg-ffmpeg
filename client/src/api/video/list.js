import request from '@/utils/request'

export function queryList(params) {
  console.log(params, 'params')
  return request({
    url: '/api/v2/video/list',
    params
  })
}

export function createList(data) {
  return request({
    url: '/api/v2/video/list',
    method: 'POST',
    data
  })
}

export function updateList(id, data) {
  return request({
    url: `/api/v2/video/list/${id}`,
    method: 'PUT',
    data
  })
}
