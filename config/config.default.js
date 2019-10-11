'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546494164363_1588';

  // add your config here
  config.middleware = [];
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'your host',
      // 端口号
      port: 'your port',
      // 用户名
      user: 'your user',
      // 密码
      password: 'your password',
      // 数据库名
      database: 'your database ',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };


  return config;
};
