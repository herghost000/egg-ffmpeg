'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.Setting.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Setting.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const {
      host,
      ratio,
    } = ctx.request.body;
    const user = await ctx.model.Setting.create({
      host,
      ratio,
    });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.Setting.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const {
      host,
      ratio,
    } = ctx.request.body;
    await user.update({
      host,
      ratio,
    });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.Setting.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = HomeController;
