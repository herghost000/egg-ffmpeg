'use strict';
const Service = require('egg').Service;

class VideoListService extends Service {
  async findAndCountAll(obj = {
    name: null,
    type_id: null,
    offset: null,
    limit: null,
  }) {

    const {
      ctx,
      app,
    } = this;

    const {
      Op,
    } = app.Sequelize;

    const query = {
      include: [{
        model: ctx.model.VideoType,
        where: obj.type_id ? {
          id: obj.type_id,
        } : null,
      },
      {
        model: ctx.model.VideoDecode,
        include: {
          model: ctx.model.VideoDecodeStatus,
        },
      },
      ],
      where: {
        name: {
          [Op.like]: obj.name ? `%${obj.name}%` : '%%',
        },
      },
      order: [
        [ 'id', 'desc' ],
      ],
      offset: ctx.helper.toInt(obj.offset) || 0,
      limit: ctx.helper.toInt(obj.limit) || 10,
    };
    return await ctx.model.VideoList.findAndCountAll(query);
  }

  async create(playload) {
    const {
      ctx,
    } = this;
    const created_at = new Date();
    const updated_at = created_at;
    const {
      name,
      surface_plot,
      video_url,
      dsc,
    } = playload;
    return await ctx.model.VideoList.create({
      name,
      surface_plot,
      video_url,
      dsc,
      created_at,
      updated_at,
    });
  }

  async update(playload) {
    const {
      ctx,
    } = this;
    let {
      id,
      name,
    } = playload;
    id = ctx.helper.toInt(id);
    const type = await ctx.model.VideoList.findById(id);
    if (!type) {
      return type;
    }

    const updated_at = new Date();
    return await type.update({
      name,
      updated_at,
    });
  }

  async destory(id) {
    const {
      ctx,
    } = this.ctx;
    id = ctx.helper.toInt(id);
    const list = await ctx.model.VideoList.findById(id);
    if (!list) {
      return list;
    }

    return await list.destroy();
  }
}

module.exports = VideoListService;
