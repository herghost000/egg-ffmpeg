'use strict';
const Controller = require('egg').Controller;

class UserRoleController extends Controller {
  async index() {
    const {
      ctx,
      app,
    } = this;
    const {
      Op,
    } = app.Sequelize;
    const query = {
      include: [{
        model: ctx.model.UserAuth,
      }],
      where: {
        name: {
          [Op.like]: ctx.query.name ? `%${ctx.query.name}%` : '%%',
        },
      },
      order: [
        [ 'id', 'desc' ],
      ],
      offset: ctx.helper.toInt(ctx.query.offset),
      limit: ctx.helper.toInt(ctx.query.limit),
    };
    ctx.body = {
      code: 200,
      data: await ctx.model.UserRole.findAndCountAll(query),
      message: '角色列表查询成功',
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    const {
      name,
      authids = [],
    } = ctx.request.body;
    const role = await ctx.model.UserRole.create({
      name,
    });
    role.setUser_auths(authids);
    ctx.body = {
      code: 200,
      data: role || {},
      message: '用户创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const role = await ctx.model.UserRole.findById(id);
    if (!role) {
      ctx.status = {
        code: 404,
        data: role,
        message: '未找到需要编辑的用户！',
      };
      return;
    }

    const {
      name,
      authids = [],
    } = ctx.request.body;
    await role.update({
      name,
    });
    role.setUser_auths(authids);
    ctx.body = {
      code: 201,
      data: role || {},
      message: '用户信息编辑成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let type = await ctx.model.UserRole.findById(id);
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

module.exports = UserRoleController;
