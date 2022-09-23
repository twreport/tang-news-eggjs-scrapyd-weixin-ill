'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async testv() {
    const { ctx } = this;
    const res = await ctx.service.weixin.weixinDriver();
    ctx.body = res;
  }
}

module.exports = HomeController;
