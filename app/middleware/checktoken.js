'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const redis = ctx.app.redis;
    const config = ctx.app.config;

    const token = ctx.get('X-Token');
    if (token) {
      let decoded = null;
      try {
        decoded = jwt.verify(token, config.login.sign);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          ctx.body = {
            code: 401,
            message: 'token已过期',
          };
          return void 0;
        }
        ctx.body = {
          code: 401,
          message: '无效的token',
        };
        return void 0;
      }
      const redisToken = await redis.get(`user.${decoded.username}.token`);
      if (token !== redisToken || !redisToken) {
        if (!redisToken) {
          ctx.body = {
            code: 401,
            message: '为了您的安全起见，请重新登陆验证',
          };
          return void 0;
        }
        ctx.body = {
          code: 401,
          message: '您的账号在别处被登陆，请重新验证',
        };
        return void 0;
      }
      await next();
    } else {
      ctx.body = {
        code: 401,
        message: 'token不存在',
      };
      return void 0;
    }
  };
};
