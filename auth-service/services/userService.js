import { User, Role } from '../models/index.js';
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