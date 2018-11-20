'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const { read } = require('await-stream-ready');

function getRange(range) {
  const match = /bytes=([0-9]*)-([0-9]*)/.exec(range);
  const requestRange = {};
  if (match) {
    if (match[1]) requestRange.start = Number(match[1]);
    if (match[2]) requestRange.end = Number(match[2]);
  }
  return requestRange;
}

class VideoController extends Controller {
  async play() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
  async link() {
    const ctx = this.ctx;
    const { dirname, filename } = ctx.params;
    const realname = `${filename}.m3u8`;
    const file = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    const method = ctx.request.method;
    const { size } = fs.statSync(file);
    // 2、响应head请求，返回文件大小
    if (method === 'HEAD') {
      ctx.set('Content-Length', size);
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    const range = ctx.headers.range;
    // 3、通知浏览器可以进行分部分请求
    if (!range) {
      ctx.set('Accept-Ranges', 'bytes');
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    const { start, end } = getRange(range);
    // 4、检查请求范围
    if (start >= size || end >= size) {
      ctx.status = 416;
      ctx.set('Content-Range', `bytes */${size}`);
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    // 5、206分部分响应
    ctx.status = 206;
    ctx.set('Accept-Ranges', 'bytes');
    ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
    ctx.body = fs.createReadStream(file, { start, end });
  }
  async ts() {
    const ctx = this.ctx;
    const { dirname, filename } = ctx.params;
    const realname = `${filename}.ts`;
    const file = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      dirname,
      realname
    );
    const method = ctx.request.method;
    const { size } = fs.statSync(file);
    // 2、响应head请求，返回文件大小
    if (method === 'HEAD') {
      ctx.set('Content-Length', size);
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    const range = ctx.headers.range;
    // 3、通知浏览器可以进行分部分请求
    if (!range) {
      ctx.set('Accept-Ranges', 'bytes');
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    const { start, end } = getRange(range);
    // 4、检查请求范围
    if (start >= size || end >= size) {
      ctx.status = 416;
      ctx.set('Content-Range', `bytes */${size}`);
      ctx.body = fs.createReadStream(file);
      return void 0;
    }
    // 5、206分部分响应
    ctx.status = 206;
    ctx.set('Accept-Ranges', 'bytes');
    ctx.set('Content-Range', `bytes ${start}-${end ? end : size - 1}/${size}`);
    ctx.body = fs.createReadStream(file, { start, end });
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
    this.ctx.attachment(realname);
    // this.ctx.set('Content-Type', 'application/octet-stream');

    this.ctx.body = fs.createReadStream(filePath);
    // ctx.body = fs.readFileSync(filePath);
  }
  async share() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
}
// http://localhost:7001/video/link/806ff890ec0a11e8977025a7dfbf82ef/1679091c5a880faf6fb5e6087eb1b2dc.m3u8
module.exports = VideoController;
