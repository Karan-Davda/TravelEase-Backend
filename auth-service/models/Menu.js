import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Menu = (sequelize) => {
  return sequelize.define('Menu', {
    MenuID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MenuName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    DisplayName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    IsLogginRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    IsInternalScreen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    URL: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    ParentMenuID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Menu',
    timestamps: false
  });
}
export default Menu;