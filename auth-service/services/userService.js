import db from '../config/database.js';
const { User, Role } = db.models;
import { Op } from 'sequelize';

export const getUserByIdentifier = async (identifier) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { Email: identifier },
          { Mobile: identifier }
        ]
      },
      include: {
        model: Role,
        attributes: ['RoleName']
      }
    });

    return user;
  } catch (err) {
    console.error('Sequelize getUserByIdentifier error:', err);
    throw err;
  }
};


export const getRoleIdByName = async (roleName) => {
  try {
    const role = await db.models.Role.findOne({
      where: { RoleName: roleName }
    });

    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }

    return role.RoleID;
  } catch (err) {
    console.error('Error in getRoleIdByName:', err);
    throw err;
  }
};