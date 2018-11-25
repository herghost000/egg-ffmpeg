import {
  queryUserAuth,
  createUserAuth,
  updateUserAuth,
  destoryUserAuth
} from '@/api/user/auth'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_USERAUTH_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_USERAUTH_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_USERAUTH_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_USERAUTH_QUERY_RES(state, res) {
      this.commit('SET_USERAUTH_MSG', res.message)
      this.commit('SET_USERAUTH_CODE', res.code)
      this.commit('SET_USERAUTH_ROWS', res.rows)
    }
  },
  actions: {
    QueryUserAuth: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryUserAuth(playload)
          .then(response => {
            const {
              code
            } = response
            if (code === 200) {
              commit('UNPACK_USERAUTH_QUERY_RES', response)
            } else {
              commit('SET_USERAUTH_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateUserAuth: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createUserAuth(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateUserAuth: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateUserAuth(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryUserAuth: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        destoryUserAuth(playload.id)
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
