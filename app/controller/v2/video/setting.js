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
    ctx.body = {
      code: 200,
      data: (await ctx.model.VideoSetting.findOne()) || {},
    };
  }

  async create() {
    // post posts
    const ctx = this.ctx;
    const one = await ctx.model.VideoSetting.count();
    console.log(one);
    if (one) {
      ctx.body = {
        code: 202,
        data: (await ctx.model.VideoSetting.findOne()) || {},
        message: '转码设置已创建！',
      };
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
    ctx.body = {
      code: 200,
      data: user || {},
      message: '转码设置创建成功！',
    };
  }

  async update() {
    // put posts/:id
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.VideoSetting.findById(id);
    if (!user) {
      ctx.status = {
        code: 404,
        data: user,
        message: '未找到需要保存数据的用户！',
      };
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
    ctx.body = {
      code: 201,
      data: user || {},
      message: '转码设置保存成功！',
    };
  }
}

module.exports = VideoSettingController;
