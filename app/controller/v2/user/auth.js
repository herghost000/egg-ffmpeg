'use strict';
const Controller = require('egg').Controller;

class UserAuthController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const query = {
      include: [
        {
          model: ctx.model.UserMenu,
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
      data: await ctx.model.UserAuth.findAndCountAll(query),
      message: '权限列表查询成功',
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    const { name, menu_id } = ctx.request.body;
    const auth = await ctx.model.UserAuth.create({
      name,
    });
    for (const i in auth) {
      console.log(i);
    }
    auth.setUser_menu(menu_id);
    ctx.body = {
      code: 200,
      data: auth || {},
      message: '用户创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const auth = await ctx.model.UserAuth.findById(id);
    if (!auth) {
      ctx.status = {
        code: 404,
        data: auth,
        message: '未找到需要编辑的用户！',
      };
      return;
    }

    const { name, menu_id } = ctx.request.body;
    await auth.update({
      name,
    });
    auth.setUser_menu(menu_id);
    ctx.body = {
      code: 201,
      data: auth || {},
      message: '用户信息编辑成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let type = await ctx.model.UserAuth.findById(id);
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

module.exports = UserAuthController;
