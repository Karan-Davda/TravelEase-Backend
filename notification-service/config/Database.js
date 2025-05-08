import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import createNotificationModel from '../models/Notification.js';
import createNotificationTemplateModel from '../models/NotificationTemplate.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
});

const Notification = createNotificationModel(sequelize);
const NotificationTemplate = createNotificationTemplateModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  models: {
    Notification,
    NotificationTemplate
  }
};

export default db;