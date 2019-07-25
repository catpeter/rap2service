let sequelize = require('../../config/settings');
let Sequelize = require('sequelize');

let users = sequelize.define('users', {
  // id
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: 'id',
    autoIncrement: true,
    field: 'id',
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'fullname',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    field: 'password',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'createdAt',
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'updatedAt',
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: 'deletedAt',
  },
}, {
  freezeTableName: true,
  tableName: 'users',
  timestamps: false,
});


module.exports = users;
