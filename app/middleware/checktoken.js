'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    if (ctx.request.header.authorization) {
      let token = ctx.request.header.authorization.split(' ')[1];
      let decoded = null;
      // 解码token
      try {
        decoded = jwt.verify(token, 'sinner77');
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.log('时间到期');
          // 重新发放令牌
          token = jwt.sign({
            user_id: 1,
            user_name: 'herghost',
          }, 'sinner77', {
            expiresIn: '60s', // 过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
          });
          ctx.cookies.set('token', token, {
            maxAge: 60 * 1000,
            httpOnly: false,
            overwrite: true,
            signed: false,
          });
        } else {
          ctx.status = 401;
          ctx.body = {
            message: 'token失效',
          };
          return;
        }
      }
      // 重置cookie时间
      ctx.cookies.set('token', token, {
        maxAge: 60 * 1000,
        httpOnly: false,
        overwrite: true,
        signed: false,
      });
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  };
};
