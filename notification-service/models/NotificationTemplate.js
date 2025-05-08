import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const NotificationTemplate = sequelize.define('NotificationTemplate', {
  NotificationTemplateID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NotificationTemplateName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Template: {
    type: DataTypes.STRING(5000),
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
  tableName: 'NotificationTemplates',
  timestamps: false
});

export default NotificationTemplate;