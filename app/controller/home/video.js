'use strict';
const Controller = require('egg').Controller;

class VideoController extends Controller {
  async play() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
  async link() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
  async key() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
  async share() {
    const ctx = this.ctx;

    ctx.body = ctx.params;
  }
}
module.exports = VideoController;
