// eslint-disable-next-line strict
const sequelize = require('../../config/settings');
const Sequelize = require('sequelize');

const interfaces = sequelize.define('interfaces', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: '',
    autoIncrement: true,
    field: 'id',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '',
    field: 'name',
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '',
    field: 'url',
  },
  // API method
  method: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: 'API method',
    field: 'method',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    comment: '',
    field: 'description',
  },
  priority: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: '1',
    comment: '',
    field: 'priority',
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: '200',
    comment: '',
    field: 'status',
  },
  creatorId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '',
    defaultValue: 100000002,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'creatorId',
  },
  lockerId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '',
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'lockerId',
  },
  moduleId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '',
    references: {
      model: 'modules',
      key: 'id',
    },
    field: 'moduleId',
  },
  repositoryId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '',
    defaultValue: 1,
    references: {
      model: 'repositories',
      key: 'id',
    },
    field: 'repositoryId',
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '',
    field: 'createdAt',
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date(),
    comment: '',
    field: 'updatedAt',
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    comment: '',
    field: 'deletedAt',
  },
}, {
  freezeTableName: true,
  tableName: 'interfaces',
  timestamps: false,
});


module.exports = interfaces
;