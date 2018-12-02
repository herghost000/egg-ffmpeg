'use strict';

// aesEncrypt,
//   aesDecrypt,
module.exports = () => {
  return async function(ctx, next) {
    await next();
    ctx.set('X-Powered-By', 'PHP/5.2.11');
  };
};
