import { User } from './User.js';
import { Role } from './Role.js';

// Define associations here
User.belongsTo(Role, { foreignKey: 'RoleID' });
Role.hasMany(User, { foreignKey: 'RoleID' });

export {
  User,
  Role
};