import {
  queryType,
  createType,
  updateType
} from '@/api/video/type'

const app = {
  state: {
    type: {}
  },
  mutations: {
    SET_TYPE: (state, type) => {
      state.type = type
    }
  },
  actions: {
    QueryType: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        queryType(playload)
          .then(response => {
            commit('SET_TYPE', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateType: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        createType(playload)
          .then(response => {
            commit('SET_TYPE', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateType: ({
      commit
    }, playload) => {
      return new Promise((resolve, reject) => {
        updateType(playload.id, playload)
          .then(response => {
            commit('SET_TYPE', response.data)
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
