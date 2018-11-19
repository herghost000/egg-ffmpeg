'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    ctx.body = 'hello world';
  }
}
module.exports = HomeController;
