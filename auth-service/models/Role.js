import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = (sequelize) => {
  return sequelize.define('Role', {
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RoleName: {
      type: DataTypes.STRING(20),
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
      allowNull: true
    }
  }, {
    tableName: 'Role',
    timestamps: false
  });
};

export default Role;