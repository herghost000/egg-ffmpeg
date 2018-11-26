'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const {
      id,
    } = ctx.params;

    const user = await this.ctx.model.User.findOne({
      include: [{
        model: ctx.model.UserRole,
      },
      {
        model: ctx.model.UserGroup,
      },
      {
        model: ctx.model.UserAuth,
      },
      ],
      where: {
        id: null,
      },
    });
    ctx.body = {
      code: 200,
      data: user || {},
      message: '用户创建成功！',
    };
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
