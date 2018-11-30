import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import {
  queryUser,
  queryUserSelfAuth,
  createUser,
  updateUser,
  destoryUser,
  editUser
} from '@/api/user/user'

function asyncComponent(path) {
  return () => import('@/' + path + '.vue')
}

const user = {
  state: {
    token: getToken(),
    id: null,
    name: '',
    avatar: '',
    roles: [],
    routers: [],
    isPullRouters: true,
    auth: {
      user_menus: []
    },
    code: 200,
    rows: [],
    msg: '查询成功'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USER_ID: (state, id) => {
      state.id = id
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHMENUS: (state, user_menus) => {
      state.auth.user_menus = user_menus
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    },
    SET_IS_PULLROUTERS: (state, isPullRouters) => {
      state.isPullRouters = isPullRouters
    },
    SET_USER_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_USER_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_USER_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_USER_QUERY_RES(state, res) {
      this.commit('SET_USER_MSG', res.message)
      this.commit('SET_USER_CODE', res.code)
      this.commit('SET_USER_ROWS', res.data.rows)
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GenerateRoutes({
      commit
    }, menus) {
      return new Promise(resolve => {
        const pmenus = menus.filter(_ => !_.pid)
        const routers = pmenus.map(pmenu => {
          pmenu = {
            ...pmenu
          }
          const cmenus = menus.filter(menu => pmenu.id === menu.pid)
          pmenu.children = cmenus.map(cmenu => {
            cmenu = {
              ...cmenu
            }
            return {
              path: cmenu.url,
              component: asyncComponent(cmenu.component),
              name: cmenu.name,
              meta: {
                title: cmenu.title,
                icon: cmenu.icon
              }
            }
          })
          return {
            path: pmenu.url,
            component: asyncComponent(pmenu.component),
            redirect: pmenu.redirect,
            name: pmenu.name,
            meta: {
              title: pmenu.title,
              icon: pmenu.icon
            },
            children: pmenu.children
          }
        })
        commit('SET_ROUTERS', routers)
        commit('SET_IS_PULLROUTERS', false)
        resolve(!!routers.length)
      })
    },
    QueryUserSelfAuth({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        queryUserSelfAuth()
          .then(response => {
            const data = response.data
            const {
              user_auths,
              user_groups,
              user_roles
            } = data

            function parseUserAuths2Menu(user_auths = []) {
              const menus = []
              for (const i in user_auths) {
                const auth = user_auths[i]
                const {
                  user_menu,
                  user_menus
                } = auth
                if (Array.isArray(user_menus)) {
                  for (const ii in user_menus) {
                    menus.push(user_menus[ii])
                  }
                } else if (Object.isNotEmpty(user_menu)) {
                  menus.push(user_menu)
                }
              }
              menus.sort(function (b, a) {
                if (a.sort > b.sort) {
                  return -1
                } else if (a.sort === b.sort) {
                  return 0
                }
                return 1
              })
              return menus
            }

            commit('SET_AUTHMENUS', parseUserAuths2Menu(user_auths))
            commit('SET_USER_ID', data.id)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    QueryUser: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryUser(playload)
          .then(response => {
            const {
              code
            } = response
            if (code === 200) {
              commit('UNPACK_USER_QUERY_RES', response)
            } else {
              commit('SET_USER_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateUser: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createUser(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateUser: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateUser(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    EditUser: ({
      getters,
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        const user =
          getters.userRows.filter(item => {
            return item.id === +playload.id
          })[0] || {}
        console.log(user, 'user')
        if (Object.isNotEmpty(user)) {
          return resolve({
            code: 200,
            data: user,
            message: '用户编辑信息获取成功！'
          })
        }
        editUser(playload.id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryUser: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        destoryUser(playload.id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
