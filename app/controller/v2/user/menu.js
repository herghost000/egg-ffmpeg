'use strict';
const Controller = require('egg').Controller;

class UserMenuController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const query = {
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
      data: await ctx.model.UserMenu.findAndCountAll(query),
      message: '用户组列表查询成功',
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    const {
      name,
      url,
      component,
      redirect,
      title,
      icon,
      pid,
      sort,
    } = ctx.request.body;
    const type = await ctx.model.UserMenu.create({
      name,
      url,
      component,
      redirect,
      title,
      icon,
      pid,
      sort,
    });
    ctx.body = {
      code: 200,
      data: type || {},
      message: '菜单创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const menu = await ctx.model.UserMenu.findById(id);
    if (!menu) {
      ctx.status = {
        code: 404,
        data: menu,
        message: '未找到需要编辑的用户！',
      };
      return;
    }

    const {
      name,
      url,
      component,
      redirect,
      title,
      icon,
      pid = null,
      sort,
    } = ctx.request.body;
    await menu.update({
      name,
      url,
      component,
      redirect,
      title,
      icon,
      pid,
      sort,
    });
    ctx.body = {
      code: 201,
      data: menu || {},
      message: '菜单编辑成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    let type = await ctx.model.UserMenu.findById(id);
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

module.exports = UserMenuController;
