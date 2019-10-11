var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'your databasename', // 数据库名
    'your username',   // 用户名
    'your password',   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': 'your host', // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
        'logging': true,  // 日志信息
        // 连接池配置
        pool:     {
            maxConnections: 5,
            maxIdleTime:   3000
        },
        //如果不添加时区设置，sequelize查询结果，默认数据库中存储的时间是格林威治时间，
        // eg.数据库中存储：2016-08-25 00:00:00，
        //这里存储的时间按照真实的意图，应该是北京时间2016-08-25 00:00:00
        // 但是，因为没哟设置时区，用sequelize搜索出来显示的结果为：2016-08-25T00:00:00.000Z，用这样的结果再去转换格式，
        // 由于NodeJS服务器的时间是北京时间，转换结果为：2016-08-25 08:00:00，是不对的
        //为了保证，转换后的结果仍是数据库存储的数据，必须将这里的时区设置为与mysql数据库一样的时区即可。
        timezone:'+08:00'
    }
);

module.exports =  sequelize ;

