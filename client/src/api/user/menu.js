import request from '@/utils/request'

export function queryUserMenu(params) {
  return request({
    url: '/api/v2/user/menu',
    params
  })
}

export function createUserMenu(data) {
  return request({
    url: '/api/v2/user/menu',
    method: 'POST',
    data,
    encrypt: true
  })
}

export function updateUserMenu(id, data) {
  return request({
    url: `/api/v2/user/menu/${id}`,
    method: 'PUT',
    data,
    encrypt: true
  })
}

export function destoryUserMenu(id) {
  return request({
    url: `/api/v2/user/menu/${id}`,
    method: 'DELETE',
    encrypt: true
  })
}
