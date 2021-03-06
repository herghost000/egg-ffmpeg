const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  userid: state => state.user.id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  authMenus: state => state.user.auth.user_menus,
  auth: state => state.user.auth,
  routers: state => state.user.routers,
  isPullRouters: state => state.user.isPullRouters,

  videoSetting: state => state.videoSetting,
  videoSettingData: state => state.videoSetting.data,
  videoType: state => state.videoType,
  videoList: state => state.videoList,

  user: state => state.user,
  userRows: state => state.user.rows,
  userRole: state => state.userRole,
  userMenu: state => state.userMenu,
  userMenuRows: state => state.userMenu.rows,
  userGroup: state => state.userGroup,
  userAuth: state => state.userAuth
}
export default getters
