'use strict';
const Service = require('egg').Service;
const user = require('../model/users');
class userService extends Service {
  async findAll() {
    const result = await user.findAll({
      raw: true,
    });
    return result;
  }

  async addAll() {
    // const result = await user.bulkCreate([{
    //   fullname: '小怕',
    //   email: '787727837283',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   fullname: '小李',
    //   email: '787727837283',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }]);
    const result = await user.create({
      fullname: '小张1',
      email: '787727837281',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }
}

module.exports = userService;
