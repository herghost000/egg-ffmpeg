'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    ctx.body = await this.ctx.service.video.transcode.trans(1);
  }
}
module.exports = HomeController;
