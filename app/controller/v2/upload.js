'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadAvator() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const data = await ctx.helper.save(
      this.config.upload.baseDir,
      this.config.upload.avatorDir,
      stream
    );
    const {
      filename,
      dirname,
    } = data;

    ctx.body = {
      code: 200,
      data: {
        url: `${this.config.upload.staticDir}${this.config.upload.avatorDir}${dirname}${filename}`,
      },
      message: '头像上传成功',
    };

  }
  async uploadPic() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const data = await ctx.helper.save(
      this.config.upload.baseDir,
      this.config.upload.picDir,
      stream
    );
    const {
      filename,
      dirname,
    } = data;

    ctx.body = {
      code: 200,
      data: {
        url: `${this.config.upload.staticDir}${this.config.upload.picDir}${dirname}${filename}`,
      },
      message: '图片上传成功',
    };
  }
  async uploadVideo() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const data = await ctx.helper.chunkSave(
      this.config.upload.baseDir,
      this.config.upload.videoDir,
      stream
    );
    const {
      key,
      complate,
      filename,
      dirname,
      path,
    } = data;

    if (complate) {
      ctx.body = {
        code: 200,
        data: {
          key,
          complate,
          url: `${this.config.upload.staticDir}${this.config.upload.videoDir}${dirname}${filename}`,
          path,
        },
        message: '文件碎片合并成功',
      };
    } else {
      ctx.body = {
        code: 206,
        data: {
          key,
          complate,
        },
        message: '文件碎片上传成功',
      };
    }
  }
}

module.exports = UploadController;
