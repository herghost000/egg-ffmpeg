'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class VideoSettingController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.VideoSetting.findOne();
  }

  async create() {
    const ctx = this.ctx;
    const one = ctx.model.VideoSetting.count();
    if (one) {
      ctx.status = 204;
      return void 0;
    }
    const {
      host,
      ratio,
      miaoqie,
      antiwhite,
      antiurl,
      antikey,
      screenshots,
      tsencry,
      openapi,
      watermark,
    } = ctx.request.body;
    const created_at = new Date();
    const updated_at = created_at;
    const user = await ctx.model.VideoSetting.create({
      host,
      ratio,
      miaoqie,
      antiwhite,
      antiurl,
      antikey,
      screenshots,
      tsencry,
      openapi,
      watermark,
      created_at,
      updated_at,
    });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.VideoSetting.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const {
      host,
      ratio,
      miaoqie,
      antiwhite,
      antiurl,
      antikey,
      screenshots,
      tsencry,
      openapi,
      watermark,
    } = ctx.request.body;
    const updated_at = new Date();
    await user.update({
      host,
      ratio,
      miaoqie,
      antiwhite,
      antiurl,
      antikey,
      screenshots,
      tsencry,
      openapi,
      watermark,
      updated_at,
    });
    ctx.body = user;
  }
}

module.exports = VideoSettingController;
