import { DataTypes } from 'sequelize';

const TravelAgency = (sequelize) => {
  return sequelize.define('TravelAgency', {
    TravelAgencyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BusinessLicenseNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    TaxIdentificationNo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PrimaryContactPersonName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    PrimaryContactPersonDesignation: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    LogoImgPath: {
      type: DataTypes.STRING(300)
    },
    TaxDocument: {
      type: DataTypes.STRING(300)
    },
    LicenseDocument: {
      type: DataTypes.STRING(300)
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ModifiedBy: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'TravelAgency',
    timestamps: false
  });
};

export default TravelAgency;