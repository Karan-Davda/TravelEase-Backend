import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import createUserModel from '../models/User.js';
import createRoleModel from '../models/Role.js';
import createTravelAgencyModel from '../models/TravelAgency.js';
import createTourGuideModel from '../models/TourGuide.js';
import createTourGuideTranModel from '../models/TourGuideTran.js';
import createMenuModel from '../models/Menu.js';
import createRoleWiseMenuModel from '../models/RoleWiseMenu.js';


// Setup Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

// Initialize models
const User = createUserModel(sequelize);
const Role = createRoleModel(sequelize);
const TravelAgency = createTravelAgencyModel(sequelize);
const TourGuide = createTourGuideModel(sequelize);
const TourGuideTran = createTourGuideTranModel(sequelize);
const Menu = createMenuModel(sequelize); // ← this must be initialized
const RoleWiseMenu = createRoleWiseMenuModel(sequelize); // ← this must be initialized

// Setup associations
User.belongsTo(Role, { foreignKey: 'RoleID' });
Role.hasMany(User, { foreignKey: 'RoleID' });

TravelAgency.belongsTo(User, { foreignKey: 'UserID' });
User.hasOne(TravelAgency, { foreignKey: 'UserID' });

RoleWiseMenu.belongsTo(Menu, { foreignKey: 'MenuID' });
Menu.hasMany(RoleWiseMenu, { foreignKey: 'MenuID' });

// Build db object
const db = {
  sequelize,
  Sequelize,
  models: {
    User,
    Role,
    TravelAgency,
    TourGuide,
    TourGuideTran,
    Menu,
    RoleWiseMenu
  }
};

export default db;