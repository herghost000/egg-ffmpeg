import {
  queryUserGroup,
  createUserGroup,
  updateUserGroup,
  destoryUserGroup
} from '@/api/user/group'

const app = {
  state: {
    code: 200,
    rows: {},
    msg: '查询成功'
  },
  mutations: {
    SET_USERGROUP_ROWS: (state, rows) => {
      state.rows = rows || []
    },
    SET_USERGROUP_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_USERGROUP_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_USERGROUP_QUERY_RES(state, res) {
      this.commit('SET_USERGROUP_MSG', res.message)
      this.commit('SET_USERGROUP_CODE', res.code)
      this.commit('SET_USERGROUP_ROWS', res.rows)
    }
  },
  actions: {
    QueryUserGroup: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryUserGroup(playload)
          .then(response => {
            const {
              code
            } = response
            if (code === 200) {
              commit('UNPACK_USERGROUP_QUERY_RES', response)
            } else {
              commit('SET_USERGROUP_ROWS')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateUserGroup: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createUserGroup(playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateUserGroup: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateUserGroup(playload.id, playload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    DestoryUserGroup: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        destoryUserGroup(playload.id)
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
