import request from '@/utils/request'

export function login(username, password) {
  request({
    url: '/api/v2/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
  return new Promise((resolve, reject) => {
    resolve({
      code: 20000,
      data: {
        token: 'admin'
      }
    })
  })
}

export function getInfo(token) {
  return new Promise(resolve => {
    resolve({
      code: 20000,
      data: {
        roles: ['admin'],
        name: 'admin',
        avatar:
          'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
    })
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: {
  //     token
  //   }
  // })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
