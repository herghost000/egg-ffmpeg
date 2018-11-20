'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // const checktoken = app.middleware.checktoken();
  router.get('/', controller.home.index);
  router.resources(
    'video-setting',
    '/api/v2/video/setting',
    controller.v2.video.setting
  );
  router.resources(
    'video-type',
    '/api/v2/video/type',
    controller.v2.video.type
  );
  router.resources(
    'video-list',
    '/api/v2/video/list',
    controller.v2.video.list
  );
  router.post(
    '/api/v2/video/list/transcode',
    controller.v2.video.list.transcode
  );
  router.post('/api/v2/upload/uploadAvator', controller.v2.upload.uploadAvator);
  router.post('/api/v2/upload/uploadPic', controller.v2.upload.uploadPic);
  router.post('/api/v2/upload/uploadVideo', controller.v2.upload.uploadVideo);

  router.get('/video/play/:dirname/:filename', controller.home.video.play);
  router.get('/video/link/:dirname/:filename.m3u8', controller.home.video.link);
  router.get('/video/link/:dirname/:filename.ts', controller.home.video.ts);
  router.get('/video/link/:dirname/ts.key', controller.home.video.key);
  router.get('/video/share/:dirname/:filename', controller.home.video.share);
  // http://localhost:9528/video/play/26fe23d0ec9211e8a46e97b69cfa585a/03c7c0ace395d80182db07ae2c30f034/ts.key
  // http://localhost:9528/video/link/26fe23d0ec9211e8a46e97b69cfa585a/03c7c0ace395d80182db07ae2c30f034/ts.key
};
