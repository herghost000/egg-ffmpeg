import { queryList, createList, updateList } from '@/api/video/list'

const app = {
  state: {
    list: {}
  },
  mutations: {
    SET_VIDEO_LIST: (state, list) => {
      state.list = list
    }
  },
  actions: {
    QueryVideoList: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        queryList(playload)
          .then(response => {
            commit('SET_VIDEO_LIST', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CreateVideoList: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        createList(playload)
          .then(response => {
            commit('SET_VIDEO_LIST', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateVideoList: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        updateList(playload.id, playload)
          .then(response => {
            commit('SET_VIDEO_LIST', response.data)
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
