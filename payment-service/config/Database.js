import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Model imports
import createPaymentModel from '../models/Payments.js';
import createPaymentTypeModel from '../models/PaymentType.js';

// Setup Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
});

// Initialize models
const Payments = createPaymentModel(sequelize);
const PaymentType = createPaymentTypeModel(sequelize);

// Define associations
Payments.belongsTo(PaymentType, { foreignKey: 'PaymentTypeID' });
PaymentType.hasMany(Payments, { foreignKey: 'PaymentTypeID' });

// Build and export db object
const db = {
  sequelize,
  Sequelize,
  models: {
    Payments,
    PaymentType,
  },
};

export default db;