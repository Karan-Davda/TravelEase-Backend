import { DataTypes } from 'sequelize';

const TourGuide = (sequelize) => {
  return sequelize.define('TourGuide', {
    TourGuideID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LanguageSpoken: {
      type: DataTypes.STRING(100)
    },
    Specialization: {
      type: DataTypes.STRING(100)
    },
    YearsOfExperience: {
      type: DataTypes.INTEGER
    },
    Address: {
      type: DataTypes.STRING(200)
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false
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
    tableName: 'TourGuide',
    timestamps: false
  });
};

export default TourGuide;