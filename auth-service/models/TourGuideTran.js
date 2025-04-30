import { DataTypes } from 'sequelize';

const TourGuideTran = (sequelize) => {
  return sequelize.define('TourGuideTran', {
    TourGuideTranID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TourGuideID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CityID: {
      type: DataTypes.INTEGER,
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
    tableName: 'TourGuideTran',
    timestamps: false
  });
};

export default TourGuideTran;