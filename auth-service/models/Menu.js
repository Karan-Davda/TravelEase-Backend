import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Menu = sequelize.define('Menu', {
  MenuID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  MenuName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  URL: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  ParentMenuID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Sequence: {
    type: DataTypes.INTEGER
  },
  Created: DataTypes.DATE,
  Modified: DataTypes.DATE,
  ModifiedBy: DataTypes.INTEGER
}, {
  tableName: 'Menu',
  timestamps: false
});

export default Menu;