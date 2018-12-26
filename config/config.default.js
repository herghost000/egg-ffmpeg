'use strict';
const Sequelize = require('sequelize');
const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541178148304_2532';
  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
  };
  config.session = {
    key: 'PHPSESSID',
    httpOnly: true,
    encrypt: true,
  };
  config.middleware = [ 'changeheaders' ];

  config.multipart = {
    fileExtensions: [ '.mov' ],
  };

  config.view = {
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.rsa = {
    private: '-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKhFLE+oMvGx1sz1DgPiy6NYEocIARwwcPX1+RGKAxtUxE4Ku+4RNIIET1h5/P5vC7T0a3yAgze4DvxlmljU/S6CStlQ200t5c9KMN3gcJpKJCw/Z2FQ+SEuk7TJWH4clPZ25x9UmlNT5xOTf1NA6lIQDJCirQvtmGprYP+5Mqj7AgMBAAECgYBZ9lGQbN5/tZKflUxe63vv4oBVTQQ66/MYrN7yb5TlodYp2zdKOkyWTnOVW/LUnM3net2UfKiqu27XpgJ1B7orqXSe0xRSlR4dqlKDSr4Q/Cq5ftmgKzdA13TlwyDJyO1B9Ru7VIvjhk9PBsb3gb4fLh13A8xUvgVwQlZpoOt3AQJBAO1PYp0pjwHfMAJRTw7OjzBFD8oPE2n/Jw8vpUFmWviDja3tDk+7MlY6tRfqbXkor3GS9rxRuf2EhUpVSK8Ko0ECQQC1hdCSgB7eS7hPIm2uxZGfud2n9IV0H/R91a4fX5CuCJdlnNlMesSuVbh3l6hFLhHC9U3YmKkG5sTZ67pgUck7AkEAzeig1190/5nJzWkBoQZnxelWrutv2/wRxyJ/UITgkFuNdomHbnUuUxWzhmHZxVQhDvoG7xY2vJvdD8d6Pq+LQQJADMedBZNrmO7vzPJ5kmJqfDpTtq1qb+CIEAvpNGBACWCleAvw6IeELVnvoMvWlvhFW9p1Xphw3gGFPmpwNrPLXQJAE6Vy+BkepP6KfSD/rwbsQcTMrPOP6jGtp+6VBuUca6s/mbKWabgd7/GxveTpNnIUwv6kh2O7kZV5c8+4AGRNBQ==-----END PRIVATE KEY-----',
    public: '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoRSxPqDLxsdbM9Q4D4sujWBKHCAEcMHD19fkRigMbVMROCrvuETSCBE9Yefz+bwu09Gt8gIM3uA78ZZpY1P0ugkrZUNtNLeXPSjDd4HCaSiQsP2dhUPkhLpO0yVh+HJT2ducfVJpTU+cTk39TQOpSEAyQoq0L7Zhqa2D/uTKo+wIDAQAB-----END PUBLIC KEY-----',
  };

  config.api = {
    signActiveTime: 10, // api请求签名(X-Sign)生效时长(默认10秒)
  };

  config.login = {
    sign: 'signner666',
    tokenExpiresIn: `${60 * 60 * 24}s`, // token过期时间
    tokenMaxAge: 60 * 60 * 24 * 7, // redis中token最大存活时间
  };

  const uploadStaticPrefix = 'app';
  const uploadStaticDir = '/public/';
  config.upload = {
    staticPrefix: uploadStaticPrefix,
    staticDir: uploadStaticDir,
    baseDir: `${uploadStaticPrefix}${uploadStaticDir}`,
    avatorDir: 'upload/avator/',
    picDir: 'upload/pic/',
    videoDir: 'upload/video/',
  };
  config.transcode = {
    baseDir: 'transcode/',
    sourceDir: 'source/',
    targetDir: 'target/',
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'database_development',
    username: 'root',
    // password: 'luotian520',
    password: 'root',
    operatorsAliases: Sequelize.Op,
    benchmark: false,
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      family: 'ooo',
      password: 'root',
      db: '0',
    },
  };
  // config.redis = {
  //   client: {
  //     cluster: true,
  //     nodes: [{
  //       host: '127.0.0.1',
  //       port: '7000',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     {
  //       host: '127.0.0.1',
  //       port: '7001',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     {
  //       host: '127.0.0.1',
  //       port: '7002',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     {
  //       host: '127.0.0.1',
  //       port: '7003',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     {
  //       host: '127.0.0.1',
  //       port: '7004',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     {
  //       host: '127.0.0.1',
  //       port: '7005',
  //       password: 'root',
  //       db: 'db',
  //     },
  //     ],
  //   },
  // };
  return config;
};
