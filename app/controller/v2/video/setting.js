'use strict';
const Controller = require('egg').Controller;

class VideoSettingController extends Controller {
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.service.video.setting.find();
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    ctx.body = await ctx.service.video.setting.create(ctx.request.body);
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    ctx.body = await ctx.service.video.setting.update({
      ...ctx.params,
      ...ctx.request.body,
    });
  }
}

module.exports = VideoSettingController;
