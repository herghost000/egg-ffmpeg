'use strict';
const Subscription = require('egg').Subscription;

const data = {
  interval: '5s', // 1 分钟间隔
  type: 'all', // 指定所有的 worker 都需要执行
  immediate: false,
  disable: true,
};

const scheduleobjs = {
  start() {
    data.disable = false;
  },
  close() {
    data.disable = true;
  },
};

class Spider extends Subscription {
  static get schedule() {
    return data;
  }
  async subscribe() {
    this.ctx.service.spider.run();
    return scheduleobjs;
  }
}

module.exports = Spider;
