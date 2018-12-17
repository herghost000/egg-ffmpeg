import request from '@/utils/request'

export function queryUserRole(params) {
  return request({
    url: '/api/v2/user/role',
    params
  })
}

export function createUserRole(data) {
  return request({
    url: '/api/v2/user/role',
    method: 'POST',
    data,
    encrypt: true
  })
}

export function updateUserRole(id, data) {
  return request({
    url: `/api/v2/user/role/${id}`,
    method: 'PUT',
    data,
    encrypt: true
  })
}

export function destoryUserRole(id) {
  return request({
    url: `/api/v2/user/role/${id}`,
    method: 'DELETE',
    encrypt: true
  })
}
