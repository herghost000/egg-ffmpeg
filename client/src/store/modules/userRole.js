import {
  queryUserRole,
  createUserRole,
  updateUserRole,
  destoryUserRole
} from '@/api/user/role'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_USERROLE_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_USERROLE_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_USERROLE_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_USERROLE_QUERY_RES(state, res) {
      this.commit('SET_USERROLE_MSG', res.message)
      this.commit('SET_USERROLE_CODE', res.code)
      this.commit('SET_USERROLE_ROWS', res.rows)
    }
  },
  actions: {
    QueryUserRole: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryUserRole(playload)
          .then(response => {
            const {
              code
            } = response
            if (code === 200) {
              commit('UNPACK_USERROLE_QUERY_RES', response)
            } else {
              commit('SET_USERROLE_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateUserRole: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createUserRole(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateUserRole: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateUserRole(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryUserRole: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        destoryUserRole(playload.id)
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
