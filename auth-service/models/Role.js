import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  RoleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleName: DataTypes.STRING(20),
  Status: DataTypes.STRING(20),
  Created: DataTypes.DATE,
  Modified: DataTypes.DATE,
  ModifiedBy: DataTypes.INTEGER
}, {
  tableName: 'Role',
  timestamps: false
});

export { Role };