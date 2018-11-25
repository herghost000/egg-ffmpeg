import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import videoSetting from './modules/videoSetting'
import videoType from './modules/videoType'
import videoList from './modules/videoList'
import authUser from './modules/authUser'
import authRole from './modules/authRole'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    videoSetting,
    videoType,
    videoList,
    authUser,
    authRole
  },
  getters
})

export default store
