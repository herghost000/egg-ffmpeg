import {
  querySetting,
  createSetting,
  updateSetting
} from '@/api/video/setting'

const app = {
  state: {
    data: {}
  },
  mutations: {
    SET_VIDEOSETTING_DATA: (state, data) => {
      state.data = data
    }
  },
  actions: {
    QuerySetting: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        querySetting()
          .then(response => {
            commit('SET_VIDEOSETTING_DATA', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateSetting: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createSetting(playload)
          .then(response => {
            commit('SET_VIDEOSETTING_DATA', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateSetting: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateSetting(playload.id, playload)
          .then(response => {
            commit('SET_VIDEOSETTING_DATA', response.data)
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
