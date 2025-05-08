import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RoleWiseMenu = (sequelize) => {
  return sequelize.define('RoleWiseMenu', {
    RoleWiseMenuID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MenuID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IsLandingPage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },    
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'RoleWiseMenu',
    timestamps: false
  });
}
export default RoleWiseMenu;