import { querySetting, createSetting, updateSetting } from '@/api/video/setting'

const app = {
  state: {
    data: {},
    res: {}
  },
  mutations: {
    SET_VIDEOSETTING_RES: (state, res) => {
      state.res = res
      state.data = res.data
    },
    SET_VIDEOSETTING_DATA: (state, data) => {
      state.data = data
    }
  },
  actions: {
    QuerySetting: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        if (Object.isNotEmpty(state.data)) {
          return resolve({
            data: state.data
          })
        }
        querySetting()
          .then(response => {
            if (Object.isNotEmpty(response.data)) {
              commit('SET_VIDEOSETTING_RES', response)
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
            commit('SET_VIDEOSETTING_RES', response)
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
            commit('SET_VIDEOSETTING_RES', response)
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
