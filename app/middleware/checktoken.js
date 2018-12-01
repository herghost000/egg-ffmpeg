'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const redis = ctx.app.redis;
    const config = ctx.app.config;
    const curTime = +new Date();
    const { lastTime = 0, username } = ctx.session;
    // const time = curTime - lastTime;

    // if (!username) {
    //   ctx.status = 200;
    //   ctx.body = {
    //     code: 401,
    //     message: 'session已失效',
    //   };
    //   return;
    // }

    // if (username && time >= config.login.activeTime) {
    //   ctx.session = {};
    //   ctx.cookies.set('X-Token', '');
    //   ctx.status = 200;
    //   ctx.body = {
    //     code: 401,
    //     message: '长时间未活动',
    //   };
    //   return;
    // }
    // ctx.session.lastTime = +new Date();

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
            if (!redisToken) {
              ctx.body = {
                code: 401,
                message: '为了您的安全起见，请重新登陆验证',
              };
              return void 0;
            }
            ctx.status = 200;
            ctx.body = {
              code: 401,
              message: '您的账号在别处被登陆，请重新验证',
            };
            return void 0;
          }

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
          const ttl = await redis.ttl(`user.${decoded.username}.token`);
          await redis.set(`user.${decoded.username}.token`, token);
          await redis.expire(`user.${decoded.usernam}.token`, ttl);

          const expires = new Date();
          expires.setDate(expires.getDate() + config.login.tokenClientExpire);

          ctx.cookies.set('X-Token', token, {
            expires,
            httpOnly: false,
            overwrite: true,
            signed: false,
          });
        } else {
          ctx.status = 200;
          ctx.body = {
            code: 401,
            message: '无效的token',
          };
          return;
        }
      }
      decoded = jwt.decode(token);
      ctx.session.username = decoded.username;
      ctx.session.id = decoded.id;
      const redisToken = await redis.get(`user.${decoded.username}.token`);
      if (token !== redisToken || !redisToken) {
        if (!redisToken) {
          ctx.body = {
            code: 401,
            message: '为了您的安全起见，请重新登陆验证',
          };
          return void 0;
        }
        ctx.status = 200;
        ctx.body = {
          code: 401,
          message: '您的账号在别处被登陆，请重新验证',
        };
        return void 0;
      }
      await next();
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        message: 'token不存在',
      };
      return void 0;
    }
  };
};
