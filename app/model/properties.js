let sequelize = require('../../config/settings');
let Sequelize = require('sequelize');

let properties = sequelize.define(
  'properties', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: '',
      autoIncrement: true,
      field: 'id',
    },
    // property owner
    scope: {
      type: Sequelize.ENUM('request', 'response'),
      allowNull: false,
      defaultValue: 'response',
      comment: 'property owner',
      field: 'scope',
    },
    // property type
    type: {
      type: Sequelize.ENUM('String', 'Number', 'Boolean', 'Object', 'Array', 'Function', 'RegExp'),
      allowNull: false,
      comment: 'property type',
      field: 'type',
    },
    pos: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '2',
      comment: '',
      field: 'pos',
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '',
      field: 'name',
    },
    // property generation rules
    rule: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'property generation rules',
      field: 'rule',
    },
    // value of this property
    value: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'value of this property',
      field: 'value',
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: '',
      field: 'description',
    },
    // parent property ID
    parentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: '-1',
      comment: 'parent property ID',
      field: 'parentId',
    },
    priority: {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: '1',
      comment: '',
      field: 'priority',
    },
    interfaceId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: '',
      references: {
        model: 'interfaces',
        key: 'id',
      },
      field: 'interfaceId',
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
    required: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: '',
      field: 'required',
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
    tableName: 'properties',
    timestamps: false,
  }
);

module.exports = properties;
