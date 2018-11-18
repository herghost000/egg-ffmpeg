'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadAvator() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    ctx.body = await ctx.helper.save(
      this.config.upload.baseDir,
      this.config.upload.avatorDir,
      'avator',
      stream
    );
  }
  async uploadPic() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    ctx.body = await ctx.helper.save(
      this.config.upload.baseDir,
      this.config.upload.picDir,
      'pic',
      stream
    );
  }
  async uploadVideo() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    ctx.body = await ctx.helper.chunkSave(
      this.config.upload.baseDir,
      this.config.upload.videoDir,
      stream
    );
  }
}

module.exports = UploadController;
