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
  router.get('/', controller.home.index);
  router.resources('video-setting', '/api/v2/video/setting', controller.v2.video.setting);
  router.resources('video-type', '/api/v2/video/type', controller.v2.video.type);
};
