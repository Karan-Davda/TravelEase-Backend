import { DataTypes } from 'sequelize';

const Bookings_Tran = (sequelize) => {
  return sequelize.define('Bookings_Tran', {
    BookingTranID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FromCityID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ToCityID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IsAccommodation: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    IsTransportation: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    TransportationTranID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AccommodationTranID: {
      type: DataTypes.INTEGER,
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
    tableName: 'Bookings_Tran',
    timestamps: false
  });
};

export default Bookings_Tran;