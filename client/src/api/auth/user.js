import request from '@/utils/request'

export function queryAuthUser(params) {
  return request({
    url: '/api/v2/auth/user',
    params
  })
}

export function createAuthUser(data) {
  return request({
    url: '/api/v2/auth/user',
    method: 'POST',
    data
  })
}

export function updateAuthUser(id, data) {
  return request({
    url: `/api/v2/auth/user/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryAuthUser(id) {
  return request({
    url: `/api/v2/auth/user/${id}`,
    method: 'DELETE'
  })
}
