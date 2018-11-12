'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class VideoSettingController extends Controller {
  async index() {
    const {
      ctx,
      app,
    } = this;
    const {
      Op,
    } = app.Sequelize;
    const query = {
      where: {
        name: {
          [Op.like]: ctx.query.name ? `%${ctx.query.name}%` : '%%',
        },
      },
      order: [
        [ 'id', 'desc' ],
      ],
      offset: toInt(ctx.query.offset) || 0,
      limit: toInt(ctx.query.limit) || 10,
    };
    ctx.body = {
      code: 200,
      data: await ctx.model.VideoType.findAll(query),
      message: '类型查询成功',
    };
  }

  async create() { // post posts
    const ctx = this.ctx;
    const {
      name,
    } = ctx.request.body;
    const created_at = new Date();
    const updated_at = created_at;
    const type = await ctx.model.VideoType.create({
      name,
      created_at,
      updated_at,
    });
    ctx.body = {
      code: 200,
      data: type || {},
      message: '类型创建成功！',
    };
  }

  async update() { // put posts/:id
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const type = await ctx.model.VideoType.findById(id);
    if (!type) {
      ctx.status = {
        code: 404,
        data: type,
        message: '未找到需要编辑数据的用户！',
      };
      return;
    }

    const {
      name,
    } = ctx.request.body;
    const updated_at = new Date();
    await type.update({
      name,
      updated_at,
    });
    ctx.body = {
      code: 201,
      data: type || {},
      message: '类型编辑成功！',
    };
  }
}

module.exports = VideoSettingController;
