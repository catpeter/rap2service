var sequelize = require('../../config/settings');
var Sequelize = require('sequelize');

var repositories = sequelize.define('repositories', {
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
    organizationId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "",
      references: {
        model: 'organizations',
        key: 'id'
      },
      field: 'organizationId'
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
    lockerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: "",
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'lockerId'
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
    tableName: 'repositories',
    timestamps: false
  });


module.exports = repositories