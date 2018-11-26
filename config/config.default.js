'use strict';
const Sequelize = require('sequelize');
const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541178168304_2532';
  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
  };
  // add your config here
  config.middleware = [];
  config.view = {
    mapping: {
      '.tpl': 'nunjucks',
    },
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
    password: 'luotian520',
    // password: 'root',
    operatorsAliases: Sequelize.Op,
    benchmark: false,
  };

  config.rsa = {
    private: `-----BEGIN RSA PRIVATE KEY-----
    MIICXAIBAAKBgQDSVPyozh34XlAFuvDZlgy4KOCJ0KwvI8Dtsjzc8UMwsv8Zv17M
    6pX6ZT9dB2DKgUeSBK1m7a2Jv1prcUJbiRRcpwm4klEheCeiANPiRcOwjUI2abDk
    6EbA2RJlyu796vSanbgK5Jt2hDpuiCLDApqBZivGFu4W9wkXD68Ow0Pd5wIDAQAB
    AoGAYaUU2uU9oqVeLxrXX5w6cXCAtVpL5WKK2Y7KlKPo1n3y0ig2wZkSYXmJjg2z
    0K9t44sKWWN0EiPkvUaKUOZ1ranbi8wLUQy5PH2uETSgfZkrPkBAGT7U0+dqn72o
    UMBD8tCGA9FSzs4VPjW3ysXEKqhJkp7IcDua51hwLdmfBWkCQQD5GgKrVGV7CoAS
    ON5wSDfBVHkVRCyIc0H3VCxpvKZntD7m3Q9a2c5DFIdoj4XXBWLwteVmSk7x4Rt8
    EXiSo5YlAkEA2CgfLvGm8dP6b9M469daMFgh++E8Jg3ZkTlJtYoZCpHsl+BBX2Cs
    w+/bPAgfu5/isH35DejyA8RGkaRqobRoGwJAXpnzM4/srkqxkroIOAolKoXjKiFm
    7DchcUWFTG65n57DWLfRUgZvn+gW+K2w/ZTtG09pHGzSCGgeIQMdkEsSBQJBAJo2
    Zaj0NoqpFS7anu2DQpDjD7vHwUXU87esC249DAiCey0PjRQiwJ85bEuz8A/Hzc7k
    0N6fpqoRSdd2WazsLKkCQHm7Cby2jrkexvBzGO0L4Oq5q+dl0ybBYyS/gmdP+hsL
    Ck6PkOtrw61qmzN9O/Is+bLxs6L8g4BX/xme+y7CBnM=
    -----END RSA PRIVATE KEY-----
    `,
    public: `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSVPyozh34XlAFuvDZlgy4KOCJ
    0KwvI8Dtsjzc8UMwsv8Zv17M6pX6ZT9dB2DKgUeSBK1m7a2Jv1prcUJbiRRcpwm4
    klEheCeiANPiRcOwjUI2abDk6EbA2RJlyu796vSanbgK5Jt2hDpuiCLDApqBZivG
    Fu4W9wkXD68Ow0Pd5wIDAQAB
    -----END PUBLIC KEY-----
    `,
  };

  return config;
};
