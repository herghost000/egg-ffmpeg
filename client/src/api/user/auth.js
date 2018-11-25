import request from '@/utils/request'

export function queryUserAuth(params) {
  return request({
    url: '/api/v2/user/auth',
    params
  })
}

export function createUserAuth(data) {
  return request({
    url: '/api/v2/user/auth',
    method: 'POST',
    data
  })
}

export function updateUserAuth(id, data) {
  return request({
    url: `/api/v2/user/auth/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryUserAuth(id) {
  return request({
    url: `/api/v2/user/auth/${id}`,
    method: 'DELETE'
  })
}
