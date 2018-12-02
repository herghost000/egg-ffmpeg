'use strict';

const md5 = require('md5');
// aesEncrypt,
//   aesDecrypt,
module.exports = () => {
  return async function(ctx, next) {
    const method = ctx.request.method.toLowerCase();
    const sign = ctx.get('X-Sign');
    const key = ctx.get('X-Key');
    let decryptKey;
    if (!sign) {
      ctx.body = {
        code: 404,
        message: '签名不能为空',
      };
      return void 0;
    }
    try {
      const decryptSign = ctx.helper.rsaDecrypt(sign);
      const [ params2Md5, t ] = decryptSign.split('.');
      const curtime = +new Date();
      const activeTime = (curtime - +t) / 1000;
      if (activeTime > ctx.app.config.api.signActiveTime) {
        ctx.body = {
          code: 404,
          message: '签名已过期',
        };
        return void 0;
      }

      let params = {};
      if (method === 'get') {
        params = ctx.query || {};
      } else {
        params = ctx.request.body || {};
        if (key) {
          try {
            decryptKey = ctx.helper.rsaDecrypt(key);
            ctx.request.body = JSON.parse(
              ctx.helper.aesDecrypt(params.body, decryptKey)
            );
          } catch (e) {
            ctx.body = {
              code: 404,
              message: '解签异常',
            };
            return void 0;
          }
        }
      }
      const serverParams2Md5 = md5(
        JSON.stringify({
          ...params,
          t,
        })
      );
      if (serverParams2Md5 !== params2Md5) {
        ctx.body = {
          code: 404,
          message: '签名被篡改，已记录你的ip',
        };
        return void 0;
      }
    } catch (error) {
      ctx.body = {
        code: 404,
        message: '签名异常',
      };
      return void 0;
    }
    await next();
    if (key) {
      ctx.body = {
        body: ctx.helper.aesEncrypt(JSON.stringify(ctx.body), decryptKey),
      };
    }
  };
};
