'use strict';
const Controller = require('egg').Controller;

class UserGroupController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const query = {
      include: [
        {
          model: ctx.model.UserRole,
          required: false,
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
      data: await ctx.model.UserGroup.findAndCountAll(query),
      message: '用户组列表查询成功',
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    const { name, roleids = [] } = ctx.request.body;
    const group = await ctx.model.UserGroup.create({
      name,
    });
    group.setUser_roles(roleids);
    ctx.body = {
      code: 200,
      data: group || {},
      message: '用户组创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const group = await ctx.model.UserGroup.findById(id);
    if (!group) {
      ctx.status = {
        code: 404,
        data: group,
        message: '未找到需要编辑的用户组！',
      };
      return;
    }
    const { name, roleids = [] } = ctx.request.body;

    await group.update({
      name,
    });
    group.setUser_roles(roleids);
    ctx.body = {
      code: 201,
      data: group || {},
      message: '用户组信息编辑成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let type = await ctx.model.UserGroup.findById(id);
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

module.exports = UserGroupController;
