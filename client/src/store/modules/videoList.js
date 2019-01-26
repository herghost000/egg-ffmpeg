import {
  queryList,
  createList,
  updateList,
  transcode,
  destroy
} from '@/api/video/list'

const app = {
  state: {
    rows: {}
  },
  mutations: {
    SET_VIDEOLIST_ROWS: (state, rows) => {
      state.rows = rows
    }
  },
  actions: {
    QueryVideoList: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        queryList(playload)
          .then(response => {
            commit('SET_VIDEOLIST_ROWS', response.data)
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
            commit('SET_VIDEOLIST_ROWS', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Transcode: ({ commit }, playload) => {
      return new Promise((resolve, reject) => {
        transcode(playload)
          .then(response => {
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
            commit('SET_VIDEOLIST_ROWS', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async destroy({ commit }, id) {
      const res = await destroy(id)
      return res
    }
  }
}

export default app
