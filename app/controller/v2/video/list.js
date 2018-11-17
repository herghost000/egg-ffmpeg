'use strict';
const Controller = require('egg').Controller;

class VideoListController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = await this.ctx.service.video.list.findAndCountAll(ctx.query);
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    ctx.body = await this.ctx.service.video.list.create(ctx.request.body);
  }

  async update() {}

  async destroy() {}
}

module.exports = VideoListController;
