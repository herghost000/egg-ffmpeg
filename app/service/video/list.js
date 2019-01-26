'use strict';
const Service = require('egg').Service;
const path = require('path');

class VideoListService extends Service {
  async findAndCountAll(playload) {
    const { ctx, app } = this;

    const { name, type_id, offset, limit } = playload;

    const { Op } = app.Sequelize;

    const query = {
      include: [
        {
          model: ctx.model.VideoType,
          where: type_id
            ? {
              id: type_id,
            }
            : null,
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
      order: [[ 'id', 'desc' ]],
      offset: ctx.helper.toInt(offset),
      limit: ctx.helper.toInt(limit),
    };
    return {
      code: 200,
      data: await ctx.model.VideoList.findAndCountAll(query),
      message: '视频列表查询成功',
    };
  }

  async find(id) {
    const ctx = this.ctx;
    const { Op } = this.app.Sequelize;
    id = ctx.helper.toInt(id);
    if (!id) {
      return {
        code: 400,
        data: null,
        message: '视频列表查询id不能为空',
      };
    }
    return {
      code: 200,
      data: await ctx.model.VideoList.findOne({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
        include: [
          {
            model: ctx.model.VideoType,
          },
          {
            model: ctx.model.VideoDecode,
            include: {
              model: ctx.model.VideoDecodeStatus,
            },
          },
        ],
      }),
      message: '视频条目查询成功',
    };
  }

  async create(playload) {
    const { ctx } = this;
    const created_at = new Date();
    const updated_at = created_at;
    const {
      name,
      surface_plot,
      video_url,
      video_path,
      dsc,
      type_id,
    } = playload;
    const filename = path.parse(video_path).name;
    const dirname = path.parse(path.dirname(video_path)).name;
    const decodeName = `${dirname}/${filename}`;
    const decode_res = await ctx.service.video.decode.create(decodeName);
    const decode = decode_res.data;
    const list = await ctx.model.VideoList.create({
      name,
      surface_plot,
      video_url,
      video_path,
      type_id,
      decode_id: decode.id,
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

  async destroy(id) {
    const ctx = this.ctx;
    id = ctx.helper.toInt(id);
    const list = await ctx.model.VideoList.findById(id);
    if (!list) {
      return {
        code: 404,
        data: {},
        message: '未找到该条数据！',
      };
    }

    await list.destroy();
    return {
      code: 200,
      data: list,
      message: '删除成功！',
    };
  }
}

module.exports = VideoListService;
