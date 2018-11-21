'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    this.ctx.body = 666;
  }
}
module.exports = HomeController;
