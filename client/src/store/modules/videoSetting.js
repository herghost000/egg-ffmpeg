import {
  querySetting,
  createSetting,
  updateSetting
} from '@/api/video/setting'

const app = {
  state: {
    setting: {}
  },
  mutations: {
    SET_SETTING: (state, setting) => {
      state.setting = setting
    }
  },
  actions: {
    QuerySetting: ({
      commit
    }) => {
      return new Promise((resolve, reject) => {
        querySetting()
          .then(response => {
            commit('SET_SETTING', response.data)
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
            commit('SET_SETTING', response.data)
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
            commit('SET_SETTING', response.data)
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
