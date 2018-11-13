'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    await ctx.render('home.tpl');
    // ctx.body = this.config;
    // ctx.body = ctx.helper.urlFor();
    // ctx.helper.urlFor();
    // await ctx.model.VideoSetting.findAll(query);
  }
}

module.exports = HomeController;
