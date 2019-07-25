'use strict';
const Service = require('egg').Service;
const interfaces = require('../model/interfaces');
const interfaceList = require('../../rap-interfaceList');
const sequelize = require('../../config/settings');
class interfaceService extends Service {
  async findAll() {
    const result = await interfaces.findAll({
      raw: true,
    });
    return result;
  }
  async addAll() {
    const ctx = this.ctx;
    // 查询模块信息
    const moduleList = await ctx.service.module.findAll({
      where: {
        deletedAt: null,
      },
    });
    // 查询已经存在的接口
    const existList = await this.findAll();
    for (const item of interfaceList) {
      let set = true;
      for (const exist of existList) {
        if (exist.url === item.url && exist.method === item.method) {
          set = false;
        }
      }
      if (set) {
        // 设置模块id
        for (const m of moduleList) {
          if (m.name === item.moduleName) {
            item.moduleId = m.id;
            delete item.moduleName;
          }
        }
        // item.creatorId = 100000002;
        // item.repositoryId = 1;
        await interfaces.create(item);
      }
    }
    // 删除重复接口
    const data = 'DELETE FROM interfaces WHERE(moduleId, url, method, name) IN(SELECT moduleId, url, method, name FROM(SELECT moduleId, url, method, name FROM interfaces GROUP BY moduleId, url, method, name HAVING COUNT( * ) > 1) a) AND id NOT IN(SELECT MIN(id) FROM(SELECT MIN(id) AS id FROM interfaces GROUP BY moduleId, url, method, name HAVING COUNT( * ) > 1) b)';
    await sequelize.query(data);
  }
}

module.exports = interfaceService;
