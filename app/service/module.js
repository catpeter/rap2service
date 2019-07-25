'use strict';
const Service = require('egg').Service;
const modules = require('../model/modules');
const moduleList = require('../../rap-moduleList');
class moduleService extends Service {
  async addAll() {
    // 已经存在的模块信息
    const existList = await this.findAll();
    for (const item of moduleList) {
      let set = true;
      for (const exist of existList) {
        if (exist.name === item.name) {
          set = false;
        }
      }
      if (set) {
        // item.creatorId = 100000002;
        // item.repositoryId = 1;
        await modules.create(item);
      }
    }
    return 111;
  }
  async findAll() {
    const result = await modules.findAll({
      raw: true,
    });
    return result;
  }
}

module.exports = moduleService;
