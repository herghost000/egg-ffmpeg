import request from '@/utils/request'

export function queryUserGroup(params) {
  return request({
    url: '/api/v2/user/group',
    params
  })
}

export function createUserGroup(data) {
  return request({
    url: '/api/v2/user/group',
    method: 'POST',
    data
  })
}

export function updateUserGroup(id, data) {
  return request({
    url: `/api/v2/user/group/${id}`,
    method: 'PUT',
    data
  })
}

export function destoryUserGroup(id) {
  return request({
    url: `/api/v2/user/group/${id}`,
    method: 'DELETE'
  })
}
