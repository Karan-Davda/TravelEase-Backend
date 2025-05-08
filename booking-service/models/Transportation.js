import { DataTypes } from 'sequelize';

const Transportation = (sequelize) => {
  return sequelize.define('Transportation', {
    TransportationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TransportationName: { type: DataTypes.STRING(100), allowNull: false },
    Seats: { type: DataTypes.INTEGER, allowNull: false },
    Status: { type: DataTypes.STRING(20), allowNull: false }, // Changed to STRING if you are storing 'Active', etc.
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
    TransportationTypeID: { type: DataTypes.INTEGER, allowNull: false },
    FromCityID: { type: DataTypes.INTEGER, allowNull: false },
    ToCityID: { type: DataTypes.INTEGER, allowNull: false },
    DepartureTime: { type: DataTypes.DATE, allowNull: false },
    ArrivalTime: { type: DataTypes.DATE, allowNull: false },
    Duration: { type: DataTypes.STRING(50), allowNull: false },
    Price: { type: DataTypes.FLOAT, allowNull: false },
  }, {
    tableName: 'Transportation',
    timestamps: false,
  });
};

export default Transportation;