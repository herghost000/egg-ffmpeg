const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  videoSetting: state => state.videoSetting,
  videoSettingData: state => state.videoSetting.data,
  videoType: state => state.videoType,
  videoList: state => state.videoList,
  user: state => state.user,
  userRole: state => state.userRole,
  userMenu: state => state.userMenu,
  userGroup: state => state.userGroup,
  userAuth: state => state.userAuth
}
export default getters
