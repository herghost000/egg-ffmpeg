'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const config = ctx.app.config;
    const curTime = +new Date();
    const {
      lastTime = 0, username,
    } = ctx.session;
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
    ctx.logger.info('token::', token);
    if (token) {
      let decoded = null;
      // 解码token
      try {
        decoded = jwt.verify(token, config.login.sign);
        ctx.logger.info('decoded::', decoded);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          ctx.logger.info('时间到期', jwt.decode(token));
          decoded = jwt.decode(token);
          ctx.session.username = decoded.username;
          ctx.session.id = decoded.id;
          // 重新发放令牌
          token = jwt.sign({
            id: decoded.id,
            username: decoded.username,
          }, config.login.sign, {
            expiresIn: config.login.tokenExpiresIn,
          });
          // 重置cookie时间
          ctx.cookies.set('X-Token', token, {
            // maxAge: config.login.activeTime,
            expires: null,
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
