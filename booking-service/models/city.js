import { DataTypes } from 'sequelize';

const City = (sequelize) => {
  return sequelize.define('City', {
    CityID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CityName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    StateID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true // or false if you want it required
    },
    PhotoURL: { 
      type: DataTypes.STRING, 
      allowNull: true 
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
    tableName: 'City',
    timestamps: false
  });
}

export default City;