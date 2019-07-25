'use strict';
const Controller = require('egg').Controller;
const prefix = 'Record';
class RecordController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.find(prefix, ctx.query);
  }
  async create() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.add(prefix, ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.update(prefix, ctx.params, ctx.request.body);
  }
  async destroy() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.update(prefix, ctx.params, {
      deleted: true,
    });
  }
  async show() {
    const {
      ctx,
    } = this;
    await ctx.service.base.findOne(prefix, ctx.params._id);
  }
}
module.exports = RecordController;
