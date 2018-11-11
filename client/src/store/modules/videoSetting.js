import { getSetting } from '@/api/video/setting'

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
    GetSetting: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getSetting()
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
