import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const Notification = sequelize.define('Notification', {
  NotificationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NotificationName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  IsEmail: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  IsSMS: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  IsWhatsAppNotification: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING(50),
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
  tableName: 'Notification',
  timestamps: false
});

export default Notification;