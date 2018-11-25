import request from '@/utils/request'

export function queryAuthRole(params) {
  return request({
    url: '/api/v2/auth/role',
    params
  })
}

export function createAuthRole(data) {
  return request({
    url: '/api/v2/auth/role',
    method: 'POST',
    data
  })
}

export function updateAuthRole(id, data) {
  return request({
    url: `/api/v2/auth/role/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryAuthRole(id) {
  return request({
    url: `/api/v2/auth/role/${id}`,
    method: 'DELETE'
  })
}
