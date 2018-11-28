'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const redis = ctx.app.redis;
    const config = ctx.app.config;
    const curTime = +new Date();
    const { lastTime = 0, username } = ctx.session;
    const time = curTime - lastTime;

    if (username && time >= config.login.activeTime) {
      ctx.status = 401;
      ctx.body = {
        message: '长时间未活动',
      };
      return;
    }
    ctx.session.lastTime = +new Date();

    let token = ctx.get('X-Token');
    if (token) {
      let decoded = null;
      try {
        decoded = jwt.verify(token, config.login.sign);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          decoded = jwt.decode(token);
          const redisToken = await redis.get(`user.${decoded.username}.token`);
          if (token !== redisToken || !redisToken) {
            ctx.status = 401;
            ctx.body = {
              message: 'token失效',
            };
            return void 0;
          }
          const ttl = await redis.ttl(`user.${decoded.username}.token`);
          ctx.session.username = decoded.username;
          ctx.session.id = decoded.id;

          token = jwt.sign(
            {
              id: decoded.id,
              username: decoded.username,
            },
            config.login.sign,
            {
              expiresIn: config.login.tokenExpiresIn,
            }
          );
          await redis.set(`user.${decoded.username}.token`, token);
          redis.expire(`user.${username}.token`, ttl);

          const expires = new Date();
          expires.setDate(expires.getDate() + config.login.tokenClientExpire);

          ctx.cookies.set('X-Token', token, {
            expires,
            httpOnly: false,
            overwrite: true,
            signed: false,
          });
        } else {
          ctx.status = 401;
          ctx.body = {
            message: '无效的token',
          };
          return;
        }
      }
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
