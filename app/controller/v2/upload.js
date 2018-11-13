'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadAvator() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const filePath = await ctx.helper.save(this.config.upload.picDir, 'avator', stream);
    ctx.body = filePath;
  }
}

module.exports = UploadController;
