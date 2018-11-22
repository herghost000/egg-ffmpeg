'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

function getRange(range) {
  const match = /bytes=([0-9]*)-([0-9]*)/.exec(range);
  const requestRange = {};
  if (match) {
    if (match[1]) requestRange.start = Number(match[1]);
    if (match[2]) requestRange.end = Number(match[2]);
  }
  return requestRange;
}

class DownLoadService extends Service {

  async normal(filePath) {
    const ctx = this.ctx;
    ctx.attachment(path.parse(filePath).base);
    ctx.body = fs.createReadStream(filePath);
  }

  async range(path) {
    const {
      ctx,
    } = this;
    const method = ctx.request.method;
    if (!fs.existsSync(path)) {
      ctx.status = 404;
      return void 0;
    }
    const {
      size,
    } = fs.statSync(path);
    ctx.attachment(path);
    // 2、响应head请求，返回文件大小
    if (method === 'HEAD') {
      ctx.set('Content-Length', size);
      ctx.body = fs.createReadStream(path);
      return void 0;
    }
    const range = ctx.headers.range;
    // 3、通知浏览器可以进行分部分请求
    if (!range) {
      ctx.set('Accept-Ranges', 'bytes');
      ctx.body = fs.createReadStream(path);
      return void 0;
    }
    const {
      start,
      end,
    } = getRange(range);
    // 4、检查请求范围
    if (start >= size || end >= size) {
      ctx.status = 416;
      ctx.set('Content-Range', `bytes */${size}`);
      ctx.body = fs.createReadStream(path);
      return void 0;
    }
    // 5、206分部分响应
    ctx.status = 206;
    ctx.set('Accept-Ranges', 'bytes');
    ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
    ctx.body = fs.createReadStream(path, {
      start,
      end,
    });
  }
}

module.exports = DownLoadService;
