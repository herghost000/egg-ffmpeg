'use strict';
const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      app,
    } = this;
    return ctx.render('share.tpl', {
      video_url: 'blob:http://v.youku.com/51dae59b-8baf-436a-9c1e-701557a1732f',
    });
  }

  async rsa() {
    const newkey = new NodeRSA({
      b: 1024,
    });
    newkey.setOptions({
      encryptionScheme: 'pkcs1',
    });
    const public_key = newkey.exportKey('pkcs8-public'),
      private_key = newkey.exportKey('pkcs8-private');

    return this.ctx.render('rsa.tpl', {
      public: public_key,
      private: private_key,
    });
  }

}
module.exports = HomeController;
