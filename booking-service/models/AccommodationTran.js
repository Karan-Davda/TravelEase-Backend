// models/AccommodationTran.js
import { DataTypes } from 'sequelize';

const AccommodationTran = (sequelize) => {
  return sequelize.define('Accommodation_Tran', {
    Accommodation_TranID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    AccommodationID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RoomType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    RoomNumber: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Bathroom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Floor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    Modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Accommodation_Tran',
    timestamps: false
  });
};

export default AccommodationTran;