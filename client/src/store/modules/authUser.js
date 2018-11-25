import {
  queryAuthUser,
  createAuthUser,
  updateAuthUser,
  destoryAuthUser
} from '@/api/auth/user'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_AUTHUSER_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_AUTHUSER_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_AUTHUSER_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_AUTHUSER_QUERY_RES(state, res) {
      this.commit('SET_AUTHUSER_MSG', res.message)
      this.commit('SET_AUTHUSER_CODE', res.code)
      this.commit('SET_AUTHUSER_ROWS', res.rows)
    }
  },
  actions: {
    QueryAuthUser: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        queryAuthUser(playload)
          .then(response => {
            const { code } = response
            if (code === 200) {
              commit('UNPACK_AUTHUSER_QUERY_RES', response)
            } else {
              commit('SET_AUTHUSER_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateAuthUser: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        createAuthUser(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateAuthUser: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        updateAuthUser(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryAuthUser: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        destoryAuthUser(playload.id)
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
