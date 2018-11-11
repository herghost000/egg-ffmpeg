'use strict';
const Controller = require('egg').Controller;

class SettingController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.model.VideoSetting.findAll();
    // this.ctx.helper.urlFor('video-settings');
  }
  async new() {}
  async create() {}
  async show() {}
  async edit() {}
  async update() {}
  async destroy() {}
}

module.exports = SettingController;
