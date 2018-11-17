'use strict';
const Service = require('egg').Service;

class VideoListService extends Service {
  async findAndCountAll(playload) {

    const {
      ctx,
      app,
    } = this;

    const {
      name,
      type_id,
      offset,
      limit,
    } = playload;

    const {
      Op,
    } = app.Sequelize;

    const query = {
      include: [{
        model: ctx.model.VideoType,
        where: type_id ? {
          id: type_id,
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
          [Op.like]: name ? `%${name}%` : '%%',
        },
      },
      order: [
        [ 'id', 'desc' ],
      ],
      offset: ctx.helper.toInt(offset) || 0,
      limit: ctx.helper.toInt(limit) || 10,
    };
    return {
      code: 200,
      data: await ctx.model.VideoList.findAndCountAll(query),
      message: '视频列表查询成功',
    };
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
    const list = await ctx.model.VideoList.create({
      name,
      surface_plot,
      video_url,
      dsc,
      created_at,
      updated_at,
    });
    return {
      code: 200,
      data: list,
      message: '视频创建成功！',
    };
  }

  async update(playload) {}

  async destory(id) {}
}

module.exports = VideoListService;
