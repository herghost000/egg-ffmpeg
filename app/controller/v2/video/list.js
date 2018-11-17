'use strict';
const Controller = require('egg').Controller;

class VideoListController extends Controller {
  async index() {
    const {
      ctx,
    } = this;

    ctx.body = {
      code: 200,
      data: await this.ctx.service.video.list.findAndCountAll(ctx.query),
      message: '视频列表查询成功',
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    ctx.body = {
      code: 200,
      data: await this.ctx.service.video.list.create(ctx.request.body) || {},
      message: '视频创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const type = await this.ctx.service.video.list.update({
      id: ctx.params.id,
      ...ctx.request.body,
    });
    if (!type) {
      ctx.status = {
        code: 404,
        data: type,
        message: '未找到需要编辑的视频！',
      };
      return;
    }
    ctx.body = {
      code: 201,
      data: type || {},
      message: '视频编辑成功！',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const list = await this.ctx.service.video.list.destory(ctx.params.id);
    if (!list) {
      ctx.body = {
        code: 404,
        data: {},
        message: '未找到需要删除的数据！',
      };
      return;
    }
    ctx.body = {
      code: 200,
      data: list,
      message: '删除成功！',
    };
  }
}

module.exports = VideoListController;
