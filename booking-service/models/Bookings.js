import { DataTypes } from 'sequelize';

const Bookings = (sequelize) => {
  return sequelize.define('Bookings', {
    BookingID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: DataTypes.INTEGER, allowNull: false },
    TransportationID: { type: DataTypes.INTEGER, allowNull: true },
    AccommodationID: { type: DataTypes.INTEGER, allowNull: true },
    BookingDate: { type: DataTypes.DATEONLY, allowNull: false },
    Status: { type: DataTypes.STRING(50), allowNull: false },
    Created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    Modified: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Bookings',
    timestamps: false
  });
};

export default Bookings;