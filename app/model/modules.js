/* eslint-disable strict */
const sequelize = require('../../config/settings');
const Sequelize = require('sequelize');

const modules = sequelize.define('modules', {
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
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
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
    comment: '',
    field: 'updatedAt',
    defaultValue: new Date(),
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    comment: '',
    field: 'deletedAt',
  },
}, {
  freezeTableName: true,
  tableName: 'modules',
  timestamps: false,
});


module.exports = modules;
