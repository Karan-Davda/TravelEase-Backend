import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PackageTran = (sequelize) => {
  return sequelize.define('PackageTran', {
    PackageTranID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PackageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AccommodationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TransportationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    IsAccommodation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    IsTransportation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    FromDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ToDate: {
      type: DataTypes.DATE,
      allowNull: true
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
    FromCityID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ToCityID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    IsTourGuideRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'PackageTran',
    timestamps: false,
  });
};

export default PackageTran;