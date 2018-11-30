import {
  queryUserMenu,
  createUserMenu,
  updateUserMenu,
  destoryUserMenu
} from '@/api/user/menu'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_USERMENU_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_USERMENU_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_USERMENU_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_USERMENU_QUERY_RES(state, res) {
      this.commit('SET_USERMENU_MSG', res.message)
      this.commit('SET_USERMENU_CODE', res.code)
      this.commit('SET_USERMENU_ROWS', res.data.rows)
    }
  },
  actions: {
    QueryUserMenu: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryUserMenu(playload)
          .then(response => {
            const {
              code
            } = response
            if (code === 200) {
              commit('UNPACK_USERMENU_QUERY_RES', response)
            } else {
              commit('SET_USERMENU_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateUserMenu: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createUserMenu(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateUserMenu: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateUserMenu(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryUserMenu: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        destoryUserMenu(playload.id)
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

export default app
