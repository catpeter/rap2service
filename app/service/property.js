'use strict';
const Service = require('egg').Service;
const properties = require('../model/properties');
const proportyList = require('../../rap-proportyList');
const sequelize = require('../../config/settings');
class propertyService extends Service {
  async findAll() {
    const result = await properties.findAll({
      raw: true,
    });
    return result;
  }
  async addAll() {
    const ctx = this.ctx;
    // const moduleList = await ctx.service.module.findAll({
    //   where: {
    //     deletedAt: null,
    //   },
    // });
    // 获取全部接口信息
    const interfaceList = await ctx.service.interface.findAll({
      where: {
        deletedAt: null,
      },
    });
    for (const item of proportyList) {
    //     for (const m of moduleList) {
    //       if (m.name === item.moduleName) {
    //         item.moduleId = m.id;
    //         delete item.moduleName;
    //       }
    //     }
      // item.moduleId = 166;
      // item.creatorId = 100000002;
      // item.repositoryId = 1;
      for (const i of interfaceList) {
        if (item.interfaceUrl === i.url && item.interfaceMethod === i.method) {
          item.interfaceId = i.id;
          item.moduleId = i.moduleId;
          delete item.interfaceUrl;
          delete item.interfaceMethod;
        }
      }
      // 查询是否已经存在该属性
      const exist = await properties.findOne({
        where: {
          interfaceId: item.interfaceId,
          scope: item.scope,
          name: item.name,
          pos: item.pos,
          // type: item.type,
        },
      });
      if (exist) {
        await properties.update({
          value: item.value,
          rule: item.rule < -1 ? item.rule : exist.rule,
        }, {
          where: {
            id: exist.id,
          },
        });
      } else {
        // 为了做属性关联
        if (item.parentId >= 1000000) {
          const parent = await properties.findOne({
            where: {
              rule: -Number(item.parentId) + '',
            },
          });
          item.parentId = parent.id;
        }
        if (item.rule > 0) {
          delete item.rule;
        }
        // 没有integer属性改为number
        if (item.type.indexOf('integer') !== -1) {
          item.type = 'number';
        }
        await properties.create(item);
      }
    }
    // 删除重复属性;
    const data = 'DELETE FROM properties WHERE (scope, type, pos, NAME, parentId, interfaceId) IN(SELECT scope, type, pos, NAME, parentId, interfaceId FROM(SELECT scope, type, pos, NAME, parentId, interfaceId FROM properties GROUP BY scope, type, pos, NAME, parentId, interfaceId HAVING COUNT( * ) > 1) a) AND id NOT IN(SELECT MIN(id) FROM(SELECT MIN(id) AS id FROM properties GROUP BY scope, type, pos, NAME, parentId, interfaceId HAVING COUNT( * ) > 1) b);';
    await sequelize.query(data);
    // 更新rule值;
    const data2 = 'UPDATE properties set  rule = NULL where rule < 0 ';
    await sequelize.query(data2);
  }
}

module.exports = propertyService;
