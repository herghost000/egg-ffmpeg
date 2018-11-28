'use strict';
const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      app,
    } = this;
    // set
    // await app.redis.set('foo', 'bar');
    // await app.redis.set('user.herghost.token', 6666);
    // app.redis.expire('user.herghost.token', 10);
    // console.log(await app.redis.ttl('user.herghost.token'));
    // get
    // ctx.body = await app.redis.get('foo');
    ctx.body = {
      data: {
        xf: ctx.request.get('x-forwarded-for'),
        ip: ctx.request.ip,
        ips: ctx.request.ips,
      },
    };
  }
  async rsa() {
    const newkey = new NodeRSA({
      b: 1024,
    });
    newkey.setOptions({
      encryptionScheme: 'pkcs1',
    });
    const public_key = newkey.exportKey('pkcs8-public'),
      private_key = newkey.exportKey('pkcs8-private');

    return this.ctx.render('rsa.tpl', {
      public: public_key,
      private: private_key,
    });
  }
}
module.exports = HomeController;
// INSERT INTO `users` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,'kkk','2018-11-26 05:31:37','2018-11-26 05:31:37');
// SELECT `created_at`, `updated_at`, `user_id`, `user_group_id` FROM `user_group_refs` AS `user_group_refs` WHERE
// `user_group_refs`.`user_id` = 8;
// INSERT INTO `user_group_refs` (`created_at`,`updated_at`,`user_id`,`user_group_id`) VALUES ('2018-11-26 05:31:37','2018-11-26 05:31:37',8,1);

// INSERT INTO `users` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,'kkk','2018-11-26 05:34:42','2018-11-26 05:34:42');
// SELECT `created_at`, `updated_at`, `user_id`, `user_group_id` FROM `user_group_refs` AS `user_group_refs` WHERE
// `user_group_refs`.`user_id` = 10 AND `user_group_refs`.`user_group_id` IN (1);
// INSERT INTO `user_group_refs` (`created_at`,`updated_at`,`user_id`,`user_group_id`) VALUES ('2018-11-26 05:34:42','2018-11-26 05:34:42',10,1);
// dataValues
// _previousDataValues
// _changed
// _modelOptions
// _options
// __eagerlyLoadedAssociations
// isNewRecord
// _customGetters
// _customSetters
// validators
// _hasCustomGetters
// _hasCustomSetters
// rawAttributes
// attributes
// _isAttribute
// pathName
// fullPath
// getUser_roles
// countUser_roles
// hasUser_role
// hasUser_roles
// setUser_roles
// addUser_role
// addUser_roles
// removeUser_role
// removeUser_roles
// createUser_role
// getUser_groups
// countUser_groups
// hasUser_group
// hasUser_groups
// setUser_groups
// addUser_group
// addUser_groups
// removeUser_group
// removeUser_groups
// createUser_group
// getUser_auths
// countUser_auths
// hasUser_auth
// hasUser_auths
// setUser_auths
// addUser_auth
// addUser_auths
// removeUser_auth
// removeUser_auths
// createUser_auth
// updateAttributes
// _setupHooks
// runHooks
// hook
// addHook
// removeHook
// hasHook
// hasHooks
