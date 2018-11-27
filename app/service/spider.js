'use strict';
const Service = require('egg').Service;
let val = 0;
class SpiderService extends Service {
  async run() {
    this.ctx.logger.info(val++, 'oooooo');
  }
}

module.exports = SpiderService;
