import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import createRoleModel from '../models/Role.js';
import createUserModel from '../models/User.js';
import createTravelAgencyModel from '../models/TravelAgency.js';
import createTourGuideModel from '../models/TourGuide.js';
import createTourGuideTranModel from '../models/TourGuideTran.js';


// Setup Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

// Initialize models
const Role = createRoleModel(sequelize);
const User = createUserModel(sequelize);
const TravelAgency = createTravelAgencyModel(sequelize);
const TourGuide = createTourGuideModel(sequelize);
const TourGuideTran = createTourGuideTranModel(sequelize);

// Setup associations
User.belongsTo(Role, { foreignKey: 'RoleID' });
Role.hasMany(User, { foreignKey: 'RoleID' });

TravelAgency.belongsTo(User, { foreignKey: 'UserID' });
User.hasOne(TravelAgency, { foreignKey: 'UserID' });

// Build db object
const db = {
  sequelize,
  Sequelize,
  models: {
    User,
    Role,
    TravelAgency,
    TourGuide,
    TourGuideTran
  }
};

export default db;