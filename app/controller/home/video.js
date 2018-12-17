'use strict';
const Controller = require('egg').Controller;
const path = require('path');
const jwt = require('jsonwebtoken');
const url = require('url');
const fs = require('fs');

async function atWhitList(ctx) {
  const referer = ctx.get('Referer');
  const { host } = url.parse(referer);
  const setting = await ctx.service.video.setting.find();
  const { antiwhite } = setting.data;

  const whitList = antiwhite.replace(/\s/gim, '').split('|');
  return whitList.some(value => {
    if (value.indexOf(host) !== -1) {
      return true;
    }
    return false;
  });
}

class VideoController extends Controller {
  async play() {
    const ctx = this.ctx;
    const { dirname, filename } = ctx.params;
    // if (!atWhitList()) {
    //   ctx.status = 204;
    //   return void 0;
    // }
    const realname = `${filename}.m3u8`;
    const filePath = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    this.service.download.range(filePath);
  }
  async link() {
    const ctx = this.ctx;
    const { dirname, filename } = ctx.params;
    const { token } = ctx.query;
    const setting = await ctx.service.video.setting.find();
    const { antikey } = setting.data;
    if (!atWhitList()) {
      const { access } = await new Promise(resolve => {
        jwt.verify(token, antikey, function(err, decoded) {
          if (err) {
            return resolve(false);
          }
          resolve(decoded);
        });
      });

      if (access !== 'view') {
        ctx.body = null;
        return void 0;
      }
    }
    const realname = `${filename}.m3u8`;
    const filePath = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    this.service.download.range(filePath);
  }
  async ts() {
    const ctx = this.ctx;
    const { dirname, filename } = ctx.params;
    const realname = `${filename}.ts`;
    const filePath = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    this.service.download.range(filePath);
  }
  async key() {
    const ctx = this.ctx;
    const { dirname } = ctx.params;
    const realname = 'ts.key';
    const filePath = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    this.service.download.range(filePath);
  }
  async crossdomain() {
    this.service.download.online(
      `${this.config.upload.baseDir}js/crossdomain.xml`,
      'application/xml'
    );
  }
  async share() {
    const ctx = this.ctx;
    let { id } = ctx.params;
    id = ctx.helper.rsaDecrypt(ctx.helper.aesDecrypt(id, 'id'));
    const video = await ctx.service.video.list.find(ctx.helper.toInt(id));
    if (!video.data) {
      ctx.body = {
        code: 404,
        data: false,
        message: '视频未找到',
      };
      return void 0;
    }
    const {
      name,
      surface_plot,
      dsc,
      video_decode: { status_id, chunk_path },
    } = video.data;
    const sp = chunk_path.split('/');
    const filename = sp.pop();
    const dirname = sp.pop();
    if (status_id !== 5) {
      ctx.body = {
        code: 404,
        data: false,
        message: '视频未转切',
      };
      return void 0;
    }
    const setting = await ctx.service.video.setting.find();
    const { antikey, host } = setting.data;
    const token = jwt.sign(
      {
        access: 'view',
      },
      antikey,
      {
        expiresIn: '24h',
      }
    );
    return ctx.render('share.tpl', {
      video_url: `${host}/video/link/${dirname}/${filename}?token=${token}`,
      name,
      surface_plot,
      dsc,
    });
  }
  async thumb() {
    const ctx = this.ctx;
    let { id } = ctx.params;
    id = ctx.helper.rsaDecrypt(ctx.helper.aesDecrypt(id, 'id'));
    const video = await ctx.service.video.list.find(ctx.helper.toInt(id));
    if (!video.data) {
      ctx.body = {
        code: 404,
        data: false,
        message: '图片未找到',
      };
      return void 0;
    }
    const {
      video_decode: { thumb_path },
    } = video.data;
    ctx.set('Content-Type', 'image/webp');
    ctx.body = fs.createReadStream(thumb_path);
  }
}
//
module.exports = VideoController;
