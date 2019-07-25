'use strict';

const Controller = require('egg').Controller;
const prefix = 'User';
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userInfo = await ctx.service.base.find(prefix);
    ctx.body = userInfo;
  }
  async create() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.add(prefix, ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.update(prefix, ctx.params, ctx.request.body);
  }
}
module.exports = UserController;

