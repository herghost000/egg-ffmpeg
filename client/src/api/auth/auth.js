import request from '@/utils/request'

export function queryAuthAuth(params) {
  return request({
    url: '/api/v2/auth/auth',
    params
  })
}

export function createAuthAuth(data) {
  return request({
    url: '/api/v2/auth/auth',
    method: 'POST',
    data
  })
}

export function updateAuthAuth(id, data) {
  return request({
    url: `/api/v2/auth/auth/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryAuthAuth(id) {
  return request({
    url: `/api/v2/auth/auth/${id}`,
    method: 'DELETE'
  })
}
