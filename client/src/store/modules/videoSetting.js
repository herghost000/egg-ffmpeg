import { querySetting, createSetting, updateSetting } from '@/api/video/setting'

const app = {
  state: {
    code: 200,
    data: {},
    msg: '查询成功'
  },
  mutations: {
    SET_VIDEOSETTING_DATA: (state, data) => {
      state.data = data || {}
    },
    SET_VIDEOSETTING_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_VIDEOSETTING_CODE: (state, code) => {
      state.code = code
    },
    UNPACK_VIDEOSETTING_QUERY_RES(state, res) {
      this.commit('SET_VIDEOSETTING_MSG', res.message)
      this.commit('SET_VIDEOSETTING_CODE', res.code)
      this.commit('SET_VIDEOSETTING_DATA', res.data)
    }
  },
  actions: {
    QuerySetting: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        if (Object.isNotEmpty(state.data)) {
          return resolve({
            code: state.code,
            data: state.data,
            message: state.message
          })
        }
        querySetting()
          .then(response => {
            const { code } = response
            if (code === 200) {
              commit('UNPACK_VIDEOSETTING_QUERY_RES', response)
            } else {
              commit('SET_VIDEOSETTING_DATA')
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateSetting: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        createSetting(playload)
          .then(response => {
            const { data } = response
            if (Object.isNotEmpty(data)) {
              commit('SET_VIDEOSETTING_DATA', data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateSetting: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        updateSetting(playload.id, playload)
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
