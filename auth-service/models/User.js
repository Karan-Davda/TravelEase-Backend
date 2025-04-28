import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FirstName: DataTypes.STRING(20),
  LastName: DataTypes.STRING(20),
  Email: DataTypes.STRING(20),
  Mobile: DataTypes.STRING(20),
  Password: DataTypes.STRING(60),
  DateOfBirth: DataTypes.DATE,
  Address: DataTypes.STRING(200),
  IsPartner: DataTypes.BOOLEAN,
  IsEmail: DataTypes.BOOLEAN,
  IsSMS: DataTypes.BOOLEAN,
  IsWhatsapp: DataTypes.BOOLEAN,
  Status: DataTypes.STRING(20),
  Created: DataTypes.DATE,
  Modified: DataTypes.DATE,
  ModifiedBy: DataTypes.INTEGER
}, {
  tableName: 'User',
  timestamps: false
});

export { User };