'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;

  const checktoken = app.middleware.checktoken();
  const checksign = app.middleware.checksign();
  router.get('/xxxc/b/:lllc', controller.home.index);
  router.get('/rsa', controller.home.rsa);
  router.get('/crossdomain.xml', controller.home.video.crossdomain);

  router.resources('user', '/api/v2/user', checktoken, checksign, controller.v2.user.user);
  router.get(
    'user',
    '/api/v2/userauth',
    checktoken,
    checksign,
    controller.v2.user.user.auth
  );
  router.post('login', '/api/v2/user/login', checksign, controller.v2.user.user.login);

  router.resources(
    'user-role',
    '/api/v2/user/role',
    checktoken,
    checksign,
    controller.v2.user.role
  );
  router.resources(
    'user-group',
    '/api/v2/user/group',
    checktoken,
    checksign,
    controller.v2.user.group
  );
  router.resources(
    'user-auth',
    '/api/v2/user/auth',
    checktoken,
    checksign,
    controller.v2.user.auth
  );
  router.resources(
    'user-menu',
    '/api/v2/user/menu',
    checktoken,
    checksign,
    controller.v2.user.menu
  );

  router.resources(
    'video-setting',
    '/api/v2/video/setting',
    checktoken,
    checksign,
    controller.v2.video.setting
  );
  router.resources(
    'video-type',
    '/api/v2/video/type',
    checktoken,
    checksign,
    controller.v2.video.type
  );
  router.resources(
    'video-list',
    '/api/v2/video/list',
    checktoken,
    checksign,
    controller.v2.video.list
  );
  router.post(
    '/api/v2/video/list/transcode',
    checktoken,
    checksign,
    controller.v2.video.list.transcode
  );
  router.post(
    '/api/v2/upload/uploadAvator',
    checktoken,
    controller.v2.upload.uploadAvator
  );
  router.post(
    '/api/v2/upload/uploadPic',
    checktoken,
    controller.v2.upload.uploadPic
  );
  router.post(
    '/api/v2/upload/uploadVideo',
    checktoken,
    controller.v2.upload.uploadVideo
  );

  router.get('/video/play/:dirname/:filename', controller.home.video.play);
  router.get('/video/link/:dirname/:filename.m3u8', controller.home.video.link);
  router.get('/video/link/:dirname/:filename.ts', controller.home.video.ts);
  router.get('/video/link/:dirname/ts.key', controller.home.video.key);
  router.get('/video/share/:id', controller.home.video.share);
  // http://localhost:9528/video/play/26fe23d0ec9211e8a46e97b69cfa585a/03c7c0ace395d80182db07ae2c30f034/ts.key
  // http://localhost:9528/video/link/26fe23d0ec9211e8a46e97b69cfa585a/03c7c0ace395d80182db07ae2c30f034/ts.key
};
