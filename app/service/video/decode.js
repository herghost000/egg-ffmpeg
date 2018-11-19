'use strict';
const Service = require('egg').Service;

class VideoDecodeService extends Service {
  async findAndCountAll(playload) {}

  async create(name) {
    const { ctx } = this;
    const created_at = new Date();
    const updated_at = created_at;
    const status_id = 1;
    const trans_path = `${this.config.transcode.baseDir}${
      this.config.transcode.sourceDir
    }${name}.mp4`;
    const chunk_path = `${this.config.transcode.baseDir}${
      this.config.transcode.targetDir
    }${name}.m3u8`;
    const decode = await ctx.model.VideoDecode.create({
      trans_path,
      chunk_path,
      status_id,
      created_at,
      updated_at,
    });
    return {
      code: 200,
      data: decode,
      message: '转切信息创建成功！',
    };
  }

  async update(playload) {}

  async destory(id) {}
}

module.exports = VideoDecodeService;
