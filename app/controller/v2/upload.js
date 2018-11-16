'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadAvator() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const filePath = await ctx.helper.save(this.config.upload.baseDir, this.config.upload.avatorDir, 'avator', stream);
    ctx.body = filePath;
  }
  async uploadPic() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const filePath = await ctx.helper.save(this.config.upload.baseDir, this.config.upload.picDir, 'pic', stream);
    ctx.body = filePath;
  }
  async uploadVideo() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const filePath = await ctx.helper.save(this.config.upload.baseDir, this.config.upload.videoDir, 'video', stream);
    ctx.body = filePath;
  }
}

module.exports = UploadController;
