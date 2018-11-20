'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const filePath = path.join(
      this.config.transcode.baseDir,
      this.config.transcode.targetDir,
      '806ff890ec0a11e8977025a7dfbf82ef',
      'ts.key'
    );
    this.ctx.attachment('ts.key');
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(filePath);
  }
}
module.exports = HomeController;
