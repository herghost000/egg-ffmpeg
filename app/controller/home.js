'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    this.ctx.service.video.transcode.trans();
    ctx.body = 666;
  }
}
module.exports = HomeController;
