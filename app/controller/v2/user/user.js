'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async logout() {
    const ctx = this.ctx;
    const redis = this.app.redis;
    const { username } = ctx.session;
    redis.del(`user.${username}.token`);
    ctx.cookies.set('X-Token', '');
    ctx.session = null;
    ctx.body = {
      code: 200,
      message: '登出成功',
    };
  }
  async login() {
    const ctx = this.ctx;
    const redis = this.app.redis;
    let { username, password } = ctx.request.body;

    password = ctx.helper.rsaDecrypt(password);

    if (password !== 'admin') {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '用户认证失败',
      };
      return void 0;
    }
    if (username !== 'admin') {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '用户认证失败',
      };
      return void 0;
    }
    const token = jwt.sign(
      {
        id: 1,
        username,
      },
      this.config.login.sign,
      {
        expiresIn: this.config.login.tokenExpiresIn,
      }
    );
    await redis.set(`user.${username}.token`, token);
    redis.expire(`user.${username}.token`, this.config.login.tokenMaxAge);

    const expires = new Date();
    expires.setDate(expires.getDate() + this.config.login.tokenClientExpire);

    ctx.cookies.set('X-Token', token, {
      expires,
      httpOnly: false,
      overwrite: true,
      signed: false,
    });

    ctx.session.lastTime = +new Date();
    ctx.session.username = username;
    ctx.session.id = 1;

    ctx.body = {
      code: 200,
      data: {
        token,
      },
    };
  }
  async auth() {
    const { ctx } = this;
    const id = ctx.session.id;
    // jwt.decode(ctx.get('X-Token')).id ||
    if (!id) {
      ctx.body = {
        code: 404,
        message: '获取用户权限失败',
      };
      return void 0;
    }
    const query = {
      attributes: [ 'id', 'name', 'avatar' ],
      include: [
        {
          model: ctx.model.UserRole,
        },
        {
          model: ctx.model.UserGroup,
        },
        {
          model: ctx.model.UserAuth,
          include: [
            {
              model: ctx.model.UserMenu,
            },
          ],
        },
      ],
      where: {
        id,
      },
    };
    const user = await ctx.model.User.findOne(query);
    ctx.body = {
      code: 200,
      data: user,
      message: '获取用户权限成功',
    };
  }
  async index() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const query = {
      attributes: [ 'id', 'name', 'avatar' ],
      include: [
        {
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
        name: {
          [Op.like]: ctx.query.name ? `%${ctx.query.name}%` : '%%',
        },
      },
      order: [[ 'id', 'desc' ]],
      offset: ctx.helper.toInt(ctx.query.offset),
      limit: ctx.helper.toInt(ctx.query.limit),
    };
    ctx.body = {
      code: 200,
      data: await ctx.model.User.findAndCountAll(query),
      message: '用户查询成功',
    };
  }

  async create() {
    const ctx = this.ctx;
    const {
      name,
      age,
      user_auths = [],
      user_groups = [],
      user_roles = [],
    } = ctx.request.body;
    const created_at = new Date();
    const user = await ctx.model.User.create({
      name,
      age,
      created_at,
    });

    if (user_auths && user_groups && user_roles) {
      user.addUser_auths(user_auths);
      user.addUser_groups(user_groups);
      user.addUser_roles(user_roles);
    }

    ctx.body = {
      code: 200,
      data: user || {},
      message: '用户创建成功！',
    };
  }

  async edit() {
    const ctx = this.ctx;
    const { id } = ctx.params;

    const user = await this.ctx.model.User.findOne({
      include: [
        {
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
        id,
      },
    });
    ctx.body = {
      code: 200,
      data: user || {},
      message: '用户编辑信息获取成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = {
        code: 404,
        data: user,
        message: '未找到需要更新的用户！',
      };
      return;
    }

    const {
      name,
      age,
      user_auths = [],
      user_groups = [],
      user_roles = [],
    } = ctx.request.body;
    const updated_at = new Date();
    user = await user.update({
      name,
      age,
      updated_at,
    });

    const allUserAuths = await user.getUser_auths();
    const allUserGroups = await user.getUser_groups();
    const allUserRoles = await user.getUser_roles();

    const allUserAuthsIds = allUserAuths.map(item => item.id);
    const allUserGroupsIds = allUserGroups.map(item => item.id);
    const allUserRolesIds = allUserRoles.map(item => item.id);

    const allUserAuthsDupObjs = ctx.helper.duplicates(
      allUserAuthsIds.concat(user_auths)
    );
    const allUserAuthsAdds = ctx.helper.duplicates(
      user_auths.concat(allUserAuthsDupObjs.same)
    ).diff;
    const allUserAuthsDels = ctx.helper.duplicates(
      allUserAuthsIds.concat(allUserAuthsDupObjs.same)
    ).diff;

    const allUserGroupsDupObjs = ctx.helper.duplicates(
      allUserGroupsIds.concat(user_groups)
    );
    const allUserGroupsAdds = ctx.helper.duplicates(
      user_groups.concat(allUserGroupsDupObjs.same)
    ).diff;
    const allUserGroupsDels = ctx.helper.duplicates(
      allUserGroupsIds.concat(allUserGroupsDupObjs.same)
    ).diff;

    const allUserRolesDupObjs = ctx.helper.duplicates(
      allUserRolesIds.concat(user_roles)
    );
    const allUserRolesAdds = ctx.helper.duplicates(
      user_roles.concat(allUserRolesDupObjs.same)
    ).diff;
    const allUserRolesDels = ctx.helper.duplicates(
      allUserRolesIds.concat(allUserRolesDupObjs.same)
    ).diff;

    if (user_auths && user_groups && user_roles) {
      !user_auths.length && user.removeUser_auths(allUserAuths);
      !user_groups.length && user.removeUser_groups(allUserGroups);
      !user_roles.length && user.removeUser_roles(allUserRoles);
    }
    user.addUser_auths(allUserAuthsAdds);
    user.addUser_groups(allUserGroupsAdds);
    user.addUser_roles(allUserRolesAdds);

    user.removeUser_auths(allUserAuthsDels);
    user.removeUser_groups(allUserGroupsDels);
    user.removeUser_roles(allUserRolesDels);

    ctx.body = {
      code: 201,
      data: user || {},
      message: '用户信息更新成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let type = await ctx.model.User.findById(id);
    if (!type) {
      ctx.body = {
        code: 404,
        data: {},
        message: '未找到该条数据！',
      };
      return;
    }

    type = await type.destroy();
    ctx.body = {
      code: 200,
      data: type,
      message: '删除成功！',
    };
  }
}

module.exports = UserController;
