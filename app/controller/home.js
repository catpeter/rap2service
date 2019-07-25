'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    // await ctx.service.user.addAll();
    await ctx.service.module.addAll();
    await ctx.service.interface.addAll();
    await ctx.service.property.addAll();
    ctx.body = 'input success!';
  }
}

module.exports = HomeController;
