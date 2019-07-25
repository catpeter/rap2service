var sequelize = require('../../config/settings');
var Sequelize = require('sequelize');

var organizations = sequelize.define('organizations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "",
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "",
      field: 'name'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "",
      field: 'description'
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "",
      field: 'logo'
    },
    // true:public, false:private
    visibility: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '1',
      comment: "true:public, false:private",
      field: 'visibility'
    },
    creatorId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "",
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'creatorId'
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "",
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'ownerId'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "",
      field: 'createdAt'
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: "",
      field: 'updatedAt'
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      comment: "",
      field: 'deletedAt'
    }
  }, {
    freezeTableName: true,
    tableName: 'organizations',
    timestamps: false
  });


module.exports = organizations