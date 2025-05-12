import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Package = (sequelize) => {
  return sequelize.define('Package', {
    PackageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PackageName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    SourceCityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DestinationCityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    RegistrationCap: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Registered: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    FromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ToDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IsTourGuide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    PhotoURL: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  }, {
    tableName: 'Package',
    timestamps: false,
  });
};

export default Package;