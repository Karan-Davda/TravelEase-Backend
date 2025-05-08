import { DataTypes } from 'sequelize';

const Accommodation = (sequelize) => {
  return sequelize.define('Accommodation', {
    AccommodationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    AccommodationName: { type: DataTypes.STRING(100), allowNull: false },
    Address: { type: DataTypes.STRING(255), allowNull: false },
    Email: { type: DataTypes.STRING(100), allowNull: true },
    Phone: { type: DataTypes.STRING(20), allowNull: true },
    Rooms: { type: DataTypes.INTEGER, allowNull: false },
    Status: { type: DataTypes.BOOLEAN, allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false },
    AccommodationTypeID: { type: DataTypes.INTEGER, allowNull: false },
    CityID: { type: DataTypes.INTEGER, allowNull: false },
    Rating: { type: DataTypes.FLOAT, allowNull: true },
    PricePerNight: { type: DataTypes.FLOAT, allowNull: false },
    Description: { type: DataTypes.TEXT, allowNull: true },
  }, {
    tableName: 'Accommodation',
    timestamps: false
  });
};

export default Accommodation;