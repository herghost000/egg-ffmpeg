import {
  queryAuthRole,
  createAuthRole,
  updateAuthRole,
  destoryAuthRole
} from '@/api/auth/role'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_AUTHROLE_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_AUTHROLE_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_AUTHROLE_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_AUTHROLE_QUERY_RES(state, res) {
      this.commit('SET_AUTHROLE_MSG', res.message)
      this.commit('SET_AUTHROLE_CODE', res.code)
      this.commit('SET_AUTHROLE_ROWS', res.rows)
    }
  },
  actions: {
    QueryAuthRole: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        queryAuthRole(playload)
          .then(response => {
            const { code } = response
            if (code === 200) {
              commit('UNPACK_AUTHROLE_QUERY_RES', response)
            } else {
              commit('SET_AUTHROLE_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateAuthRole: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        createAuthRole(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateAuthRole: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        updateAuthRole(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryAuthRole: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        destoryAuthRole(playload.id)
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
