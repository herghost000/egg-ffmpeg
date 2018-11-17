'use strict';
const Service = require('egg').Service;

class VideoSettingService extends Service {
  async find() {
    const {
      ctx,
    } = this;
    return {
      code: 200,
      data: await ctx.model.VideoSetting.findOne(),
      message: '转码设置查询成功',
    };
  }

  async create(playload) {
    const {
      ctx,
    } = this;
    const created_at = new Date();
    const updated_at = created_at;
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
    } = playload;

    const one = await ctx.model.VideoSetting.count();
    if (one) {
      return {
        code: 202,
        data: (await ctx.model.VideoSetting.findOne()),
        message: '转码设置已创建！',
      };
    }

    const setting = await ctx.model.VideoSetting.create({
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
    return {
      code: 200,
      data: setting,
      message: '转码设置创建成功！',
    };
  }

  async update(playload) {
    // put posts/:id
    const ctx = this.ctx;
    const id = ctx.helper.toInt(playload.id);
    let setting = await ctx.model.VideoSetting.findById(id);
    if (!setting) {
      return {
        code: 404,
        data: setting,
        message: '未找到转码设置！',
      };
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
    } = playload;
    const updated_at = new Date();
    setting = await setting.update({
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
    return {
      code: 201,
      data: setting,
      message: '转码设置保存成功！',
    };
  }
}

module.exports = VideoSettingService;
